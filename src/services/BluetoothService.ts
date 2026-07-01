import { PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';
import { useGameStore } from '../store/gameStore';
import { StorageService } from './storage'; // Importante: Adicionamos o serviço de Storage aqui!

class BluetoothService {
  private connectedDevice: BluetoothDevice | null = null;
  private readSubscription: BluetoothEventSubscription | null = null;
  private dataBuffer: string = ''; // Buffer para acumular os dados recebidos

  async requestBluetoothPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      // Se for Android 12 ou superior
      if (Platform.Version >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } 
      // Se for Android 11 ou inferior (exige permissão de localização para o Bluetooth)
      else {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  }

  // 1. Verificar se o Bluetooth está ativado no celular
  async checkBluetoothEnabled(): Promise<boolean> {
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        // Tenta pedir pro usuário ligar (funciona melhor no Android)
        return await RNBluetoothClassic.requestBluetoothEnabled();
      }
      return true;
    } catch (error) {
      console.error('Erro ao verificar Bluetooth:', error);
      return false;
    }
  }

  // 2. Listar os dispositivos que já estão pareados no celular
  async getPairedDevices(): Promise<BluetoothDevice[]> {
    try {
      return await RNBluetoothClassic.getBondedDevices();
    } catch (error) {
      console.error('Erro ao buscar dispositivos pareados:', error);
      return [];
    }
  }

  // 3. Conectar a um dispositivo específico (HC-05)
  async connectToDevice(device: BluetoothDevice): Promise<boolean> {
    try {
      // Se já houver um conectado, desconecta primeiro
      if (this.connectedDevice) {
        await this.disconnect();
      }

      console.log(`Tentando conectar a: ${device.name}...`);
      const isConnected = await device.connect({
        connectorType: 'rfcomm',
        DEVICE_CHARSET: 'utf-8',
        secure: false,
        // Sem DELIMITER: o app faz o split por \n manualmente no handleIncomingData.
        // Com DELIMITER a biblioteca remove o \n e o handler nunca processa os dados.
      });

      if (isConnected) {
        this.connectedDevice = device;
        // Atualiza a loja global para o app saber que está conectado
        useGameStore.getState().setConnectionStatus(true);
        // Inicia a escuta de dados chegando da STM32
        this.startReadingData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Falha na conexão:', error);
      return false;
    }
  }

  // 4. Desconectar
  async disconnect() {
    if (this.connectedDevice) {
      try {
        await this.connectedDevice.disconnect();
        this.connectedDevice = null;
        useGameStore.getState().setConnectionStatus(false);
        this.stopReadingData();
      } catch (error) {
        console.error('Erro ao desconectar:', error);
      }
    }
  }

  // 5. Enviar Dados (App -> STM32)
  async sendData(data: string): Promise<boolean> {
    if (!this.connectedDevice) {
      console.warn('Nenhum dispositivo conectado para enviar dados.');
      return false;
    }

    try {
      // Garante que o comando termina com \n para a STM32 saber que acabou
      const message = data.endsWith('\n') ? data : `${data}\n`;
      await this.connectedDevice.write(message);
      return true;
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      return false;
    }
  }

  // 6. Começar a escutar os dados recebidos (STM32 -> App)
  private startReadingData() {
    if (!this.connectedDevice) return;

    // Remove qualquer escuta anterior por segurança
    this.stopReadingData();

    this.readSubscription = this.connectedDevice.onDataReceived((event) => {
      // O dado chega na propriedade event.data
      this.handleIncomingData(event.data);
    });
  }

  private stopReadingData() {
    if (this.readSubscription) {
      this.readSubscription.remove();
      this.readSubscription = null;
    }
  }

  // 7. O "Coração" do Protocolo - Interpretando o que a STM32 fala
  private handleIncomingData(data: string) {
    this.dataBuffer += data;

    // Divide por \n — funciona tanto quando a biblioteca entrega com \n
    // quanto quando o STM32 envia \n explicitamente.
    const lines = this.dataBuffer.split('\n');

    // O último elemento é o fragmento incompleto (sem \n ainda) — guarda no buffer.
    this.dataBuffer = lines.pop() ?? '';

    // Processa todas as linhas completas
    lines.forEach(line => {
      const cmd = line.trim();
      if (cmd) this.parseProtocol(cmd);
    });

    // Se o buffer acumulou um comando completo mas sem \n
    // (acontece quando DELIMITER strippou o \n antes de entregar)
    const buffered = this.dataBuffer.trim();
    if (buffered.startsWith('$')) {
      this.dataBuffer = '';
      this.parseProtocol(buffered);
    }
  }

  // 8. O Parser Oficial do seu Protocolo
  private parseProtocol(command: string) {
    console.log(`[STM32 -> APP] Recebeu: ${command}`);

    const store = useGameStore.getState();

    // Regra: $ROUND:X
    if (command.startsWith('$ROUND:')) {
      const parts = command.split(':');
      if (parts.length > 1) {
        const round = parseInt(parts[1], 10);
        if (!isNaN(round)) {
          store.setCurrentRound(round);
        }
      }
    }
    // Regra: $RESULTADO:NIVEL:STATUS (O nome agora é o app quem define)
    else if (command.startsWith('$RESULTADO:')) {
      // Exemplo de como a placa deve enviar: $RESULTADO:DIFICIL:VITORIA
      const parts = command.split(':');
      if (parts.length === 3) {
        let dificuldadePlaca = parts[1];
        const statusPlaca = parts[2] as 'VITORIA' | 'DERROTA';

        // Se houver uma partida Host em andamento, forçamos a dificuldade
        if (store.gameActive) {
          dificuldadePlaca = 'PERSONALIZADA';
        }

        const nomeAtual = store.playerName.trim() !== '' ? store.playerName : 'Visitante';
        const roundAtual = store.currentRound.toString();

        // Libera o modo host para nova sequência
        store.setGameActive(false);

        // Salva o resultado no Firebase
        StorageService.saveResult({
          playerName: nomeAtual,
          difficulty: dificuldadePlaca,
          round: roundAtual,
          status: statusPlaca,
        });

        console.log('Partida finalizada. Host liberado para nova sequência.');
      }
    }
    // Regra: $ERRO:MOTIVO
    else if (command.startsWith('$ERRO:')) {
      console.log('Erro recebido da placa:', command);
    }
    // Regra: $MUTE:STATUS
    else if (command.startsWith('$MUTE:')) {
      const status = command.split(':')[1];
      if (status === '1') {
        store.setIsMuted(true);
      } else {
        store.setIsMuted(false);
      }
    }
  }
}

// Exportamos uma única instância para ser usada em todo o app (Singleton)
export const btService = new BluetoothService();