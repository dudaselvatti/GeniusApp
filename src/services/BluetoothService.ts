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
        connectorType: 'rfcomm', // Padrão para HC-05
        DELIMITER: '\n', // Importantíssimo! Diz à biblioteca para ler até a quebra de linha
        DEVICE_CHARSET: 'utf-8',
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
    // Adiciona o pedaço recebido ao buffer
    this.dataBuffer += data;

    // O HC-05 pode mandar os dados "picotados". 
    // Nós só processamos quando encontramos a quebra de linha (\n)
    if (this.dataBuffer.includes('\n')) {
      // Divide o buffer pelas quebras de linha (pode ter vindo mais de um comando rápido)
      const commands = this.dataBuffer.split('\n');
      
      // O último elemento da array geralmente é vazio ou incompleto (sem \n), 
      // então nós o guardamos no buffer para a próxima leitura.
      this.dataBuffer = commands.pop() || '';

      // Processa os comandos completos
      commands.forEach(command => {
        const cleanCmd = command.trim();
        if (cleanCmd) {
          this.parseProtocol(cleanCmd);
        }
      });
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
        const dificuldadePlaca = parts[1];
        const statusPlaca = parts[2] as 'VITORIA' | 'DERROTA';
        
        // Pega o nome digitado no input do app. Se estiver vazio, salva como 'Visitante'
        const nomeAtual = store.playerName.trim() !== '' ? store.playerName : 'Visitante';
        const roundAtual = store.currentRound.toString();

        // Envia para o banco de dados (Firebase)
        StorageService.saveResult({
          playerName: nomeAtual,
          difficulty: dificuldadePlaca,
          round: roundAtual,
          status: statusPlaca,
        });

        console.log('Partida salva na nuvem via Bluetooth!');
      }
    }
    // Regra: $ERRO:MOTIVO
    else if (command.startsWith('$ERRO:')) {
      console.log('Erro recebido da placa:', command);
    }
  }
}

// Exportamos uma única instância para ser usada em todo o app (Singleton)
export const btService = new BluetoothService();