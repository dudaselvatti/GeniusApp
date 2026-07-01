export interface GameResult {
  id: string;
  playerName: string;
  timestamp: string; // Data e hora: "01/07 14:32"
  difficulty: string;
  round: string;
  status: 'VITORIA' | 'DERROTA';
}