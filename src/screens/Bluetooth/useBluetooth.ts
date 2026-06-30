import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { btService } from '../../services/BluetoothService';
import { useGameStore } from '../../store/gameStore';

export function useBluetooth() {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const isConnected = useGameStore((state) => state.isConnected);

  const scanDevices = async () => {
    setIsScanning(true);
    const enabled = await btService.checkBluetoothEnabled();
    if (!enabled) {
      Alert.alert('Erro', 'Por favor, ative o Bluetooth do celular.');
      setIsScanning(false);
      return;
    }

    // Busca os dispositivos pareados (o HC-05 deve estar pareado nas configs do Android)
    const paired = await btService.getPairedDevices();
    setDevices(paired);
    setIsScanning(false);
  };

  // Escaneia automaticamente quando a tela abre
  useFocusEffect(
    useCallback(() => {
      scanDevices();
    }, [])
  );

  const handleConnect = async (device: BluetoothDevice) => {
    const success = await btService.connectToDevice(device);
    if (success) {
      Alert.alert('Conectado!', `Conectado ao módulo ${device.name}`);
    } else {
      Alert.alert('Erro', `Não foi possível conectar a ${device.name}`);
    }
  };

  const handleDisconnect = async () => {
    await btService.disconnect();
    Alert.alert('Desconectado', 'A conexão com a placa foi encerrada.');
  };

  return {
    devices,
    isScanning,
    isConnected,
    scanDevices,
    handleConnect,
    handleDisconnect,
  };
}