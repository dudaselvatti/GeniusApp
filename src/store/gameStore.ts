import { create } from 'zustand';

interface GameState {
  playerName: string;
  currentRound: number;
  isMuted: boolean;
  isConnected: boolean;
  setPlayerName: (name: string) => void;
  setCurrentRound: (round: number) => void;
  toggleMute: () => void;
  setConnectionStatus: (status: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerName: '',
  currentRound: 0,
  isMuted: false,
  isConnected: false,
  setPlayerName: (name) => set({ playerName: name }),
  setCurrentRound: (round) => set({ currentRound: round }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setConnectionStatus: (status) => set({ isConnected: status }),
}));