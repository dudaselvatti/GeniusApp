import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useGameStore } from '../../store/gameStore';
import { btService } from '../../services/BluetoothService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export function useDashboard() {
  const navigation = useNavigation<NavigationProp>();
  const { isMuted, isConnected, toggleMute } = useGameStore();
  const [isMuteLoading, setIsMuteLoading] = useState(false);

  const handleToggleMute = async () => {
    if (isMuteLoading) return;
    setIsMuteLoading(true);

    const newMuteState = !isMuted;
    const command = `$MUTE:${newMuteState ? '1' : '0'}`;

    try {
      await btService.sendData(command);
      toggleMute();
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar o comando de som. Verifique a conexão Bluetooth.');
    } finally {
      setIsMuteLoading(false);
    }
  };

  return {
    isMuted,
    isMuteLoading,
    isConnected,
    handleToggleMute,
    goToHost: () => navigation.navigate('Host'),
    goToRanking: () => navigation.navigate('Ranking'),
    goToBluetooth: () => navigation.navigate('Bluetooth'),
  };
}