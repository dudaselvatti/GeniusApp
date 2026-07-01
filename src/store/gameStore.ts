import { create } from 'zustand';

interface GameState {
  playerName: string;
  currentRound: number;
  isMuted: boolean;
  isConnected: boolean;
  gameActive: boolean; // true enquanto uma sequência foi enviada e o jogo não terminou
  setPlayerName: (name: string) => void;
  setCurrentRound: (round: number) => void;
  toggleMute: () => void;
  setConnectionStatus: (status: boolean) => void;
  setGameActive: (active: boolean) => void;
  setIsMuted: (muted: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerName: '',
  currentRound: 0,
  isMuted: false,
  isConnected: false,
  gameActive: false,
  setPlayerName: (name) => set({ playerName: name }),
  setCurrentRound: (round) => set({ currentRound: round }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setConnectionStatus: (status) => set({ isConnected: status }),
  setGameActive: (active) => set({ gameActive: active }),
  setIsMuted: (muted) => set({ isMuted: muted }),
}));