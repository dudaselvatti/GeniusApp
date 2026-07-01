import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { btService } from '../../services/BluetoothService';
import { useGameStore } from '../../store/gameStore';

// Nomes conhecidos do módulo STM32 para filtrar automaticamente
const STM32_NAMES = ['HC-05', 'HC05', 'STM32', 'GENIUS', 'Genius'];

function findTargetDevice(devices: BluetoothDevice[]): BluetoothDevice | null {
  // Tenta achar o dispositivo STM32 pelo nome
  const found = devices.find(d =>
    STM32_NAMES.some(name => d.name?.toUpperCase().includes(name.toUpperCase()))
  );
  // Fallback: retorna o primeiro dispositivo pareado (se houver apenas um)
  return found ?? (devices.length === 1 ? devices[0] : null);
}

export function useBluetooth() {
  const [targetDevice, setTargetDevice] = useState<BluetoothDevice | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const isConnected = useGameStore((state) => state.isConnected);
  const isScanningRef = useRef(false);

  const scanDevices = async () => {
    if (isScanningRef.current) return;
    isScanningRef.current = true;
    setIsScanning(true);

    try {
      const hasPermission = await btService.requestBluetoothPermissions();
      if (!hasPermission) {
        Alert.alert('Permissão Negada', 'O aplicativo precisa de permissão para buscar dispositivos.');
        return;
      }

      const enabled = await btService.checkBluetoothEnabled();
      if (!enabled) {
        Alert.alert('Bluetooth Desativado', 'Por favor, ative o Bluetooth do celular e tente novamente.');
        return;
      }

      const paired = await btService.getPairedDevices();
      const device = findTargetDevice(paired);
      setTargetDevice(device);

      if (!device) {
        Alert.alert(
          'Dispositivo Não Encontrado',
          'Nenhum módulo STM32/HC-05 encontrado entre os dispositivos pareados. Pareie o módulo nas configurações do celular primeiro.'
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao buscar dispositivos Bluetooth.');
    } finally {
      isScanningRef.current = false;
      setIsScanning(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      scanDevices();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const handleConnect = async () => {
    if (!targetDevice || isConnecting || isConnected) return;
    setIsConnecting(true);

    try {
      const success = await btService.connectToDevice(targetDevice);
      if (success) {
        Alert.alert('✓ Conectado!', `Conexão com ${targetDevice.name} estabelecida com sucesso.`);
      } else {
        Alert.alert(
          'Falha na Conexão',
          `Não foi possível conectar a ${targetDevice.name}. Verifique se o dispositivo está ligado e próximo.`
        );
      }
    } catch (error) {
      Alert.alert('Erro', `Erro inesperado ao conectar a ${targetDevice.name}.`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (isDisconnecting) return;
    setIsDisconnecting(true);

    try {
      await btService.disconnect();
      Alert.alert('Desconectado', 'A conexão com a placa foi encerrada.');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao encerrar a conexão.');
    } finally {
      setIsDisconnecting(false);
    }
  };

  return {
    targetDevice,
    isScanning,
    isConnecting,
    isDisconnecting,
    isConnected,
    scanDevices,
    handleConnect,
    handleDisconnect,
  };
}