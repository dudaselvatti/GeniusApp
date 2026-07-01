import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useGameStore } from '../../store/gameStore';
// IMPORTANTE: Adicione esta linha abaixo para corrigir o erro
import { btService } from '../../services/BluetoothService'; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export function useDashboard() {
  const navigation = useNavigation<NavigationProp>();
  const { currentRound, isMuted, toggleMute, playerName, setPlayerName } = useGameStore();

  const handleToggleMute = async () => {
    // 1. Alterna o estado local (UI)
    toggleMute(); 
    
    // 2. Prepara o comando
    const newMuteState = !isMuted; 
    const command = `$MUTE:${newMuteState ? '1' : '0'}`;
    
    // 3. Envia com segurança (try/catch)
    try {
      await btService.sendData(command);
    } catch (error) {
      console.log('Falha ao enviar comando Bluetooth:', error);
    }
  };

  return {
    currentRound,
    isMuted,
    playerName,
    setPlayerName,
    handleToggleMute,
    goToHost: () => navigation.navigate('Host'),
    goToRanking: () => navigation.navigate('Ranking'),
    goToBluetooth: () => navigation.navigate('Bluetooth'),
  };
}