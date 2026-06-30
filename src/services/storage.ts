import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameResult } from '../utils/types';

const RANKING_KEY = '@genius_ranking';

export const StorageService = {
  // Salvar um novo resultado
  async saveResult(result: Omit<GameResult, 'id' | 'timestamp'>): Promise<void> {
    try {
      // Cria o registro completo com o momento exato do término da partida
      const newResult: GameResult = {
        ...result,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      // Pega o ranking atual
      const existing = await this.getResults();
      const updated = [newResult, ...existing]; // Adiciona o mais recente no topo

      await AsyncStorage.setItem(RANKING_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Erro ao salvar resultado no storage:', error);
    }
  },

  // Obter todos os resultados salvos
  async getResults(): Promise<GameResult[]> {
    try {
      const data = await AsyncStorage.getItem(RANKING_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao ler resultados do storage:', error);
      return [];
    }
  },

  // Limpar histórico
  async clearResults(): Promise<void> {
    try {
      await AsyncStorage.removeItem(RANKING_KEY);
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
    }
  }
};