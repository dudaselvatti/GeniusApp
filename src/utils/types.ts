export interface GameResult {
  id: string; // Para garantir unicidade (ex: timestamp)
  playerName: string;
  timestamp: string; // Hora exata em que o resultado foi gerado
  difficulty: string;
  round: string; // Ex: "3/5"
  status: 'VITORIA' | 'DERROTA';
}