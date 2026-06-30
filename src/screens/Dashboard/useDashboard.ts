import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useGameStore } from '../../store/gameStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export function useDashboard() {
  const navigation = useNavigation<NavigationProp>();
  const { currentRound, isMuted, toggleMute, playerName } = useGameStore();

  const handleToggleMute = () => {
    toggleMute();
    // Aqui no futuro enviaremos via Bluetooth: sendData(`$MUTE:${isMuted ? '0' : '1'}`);
  };

  return {
    currentRound,
    isMuted,
    playerName: playerName || 'Visitante',
    handleToggleMute,
    goToHost: () => navigation.navigate('Host'),
    goToRanking: () => navigation.navigate('Ranking'),
    goToBluetooth: () => navigation.navigate('Bluetooth')
  };
}