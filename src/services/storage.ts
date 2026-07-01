import firestore from '@react-native-firebase/firestore';
import { GameResult } from '../utils/types';

const rankingCollection = firestore().collection('RankingGlobal');

function formatTimestamp(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${day}/${month} ${hour}:${min}`;
}

export const StorageService = {
  // 1. Salvar resultado na nuvem
  async saveResult(result: Omit<GameResult, 'id' | 'timestamp'>): Promise<void> {
    try {
      const newId = Date.now().toString();
      const newResult: GameResult = {
        ...result,
        id: newId,
        timestamp: formatTimestamp(),
      };
      await rankingCollection.doc(newId).set(newResult);
    } catch (error) {
      console.error('Erro ao salvar no Firebase:', error);
      throw error; // propaga para o hook tratar
    }
  },

  // 2. Buscar resultados da nuvem (mais recentes primeiro)
  async getResults(): Promise<GameResult[]> {
    try {
      const snapshot = await rankingCollection.orderBy('id', 'desc').get();
      const results: GameResult[] = [];
      snapshot.forEach(doc => {
        results.push(doc.data() as GameResult);
      });
      return results;
    } catch (error) {
      console.error('Erro ao buscar do Firebase:', error);
      throw error;
    }
  },

  // 3. Atualizar o nome do jogador de uma partida
  async updatePlayerName(id: string, playerName: string): Promise<void> {
    try {
      await rankingCollection.doc(id).update({ playerName });
    } catch (error) {
      console.error('Erro ao atualizar nome:', error);
      throw error;
    }
  },

  // 4. Limpar histórico
  async clearResults(): Promise<void> {
    try {
      const snapshot = await rankingCollection.get();
      const batch = firestore().batch();
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (error) {
      console.error('Erro ao limpar Firebase:', error);
      throw error;
    }
  },

  // 5. Popular com dados de exemplo (para testes)
  async seedExamples(): Promise<void> {
    const examples: Omit<GameResult, 'id'>[] = [
      {
        playerName: 'Ana',
        timestamp: '01/07 14:22',
        difficulty: 'FÁCIL',
        round: '5/5',
        status: 'VITORIA',
      },
      {
        playerName: 'Carlos',
        timestamp: '01/07 14:10',
        difficulty: 'MÉDIO',
        round: '3/5',
        status: 'DERROTA',
      },
      {
        playerName: 'Visitante',
        timestamp: '01/07 13:55',
        difficulty: 'DIFÍCIL',
        round: '4/5',
        status: 'VITORIA',
      },
    ];

    const batch = firestore().batch();
    examples.forEach((ex, i) => {
      // IDs escalonados para ficarem ordenados corretamente (mais antigo = ID menor)
      const id = (Date.now() - (examples.length - i) * 60000).toString();
      const doc = rankingCollection.doc(id);
      batch.set(doc, { ...ex, id });
    });
    await batch.commit();
  },
};