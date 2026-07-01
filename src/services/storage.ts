import firestore from '@react-native-firebase/firestore';
import { GameResult } from '../utils/types';

// Referência direta à coleção que você criou no painel do Firebase
const rankingCollection = firestore().collection('RankingGlobal');

export const StorageService = {
  // 1. Salvar resultado na Nuvem
  async saveResult(result: Omit<GameResult, 'id' | 'timestamp'>): Promise<void> {
    try {
      const newId = Date.now().toString();
      const newResult: GameResult = {
        ...result,
        id: newId,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      // Grava no Firebase usando o ID gerado como nome do documento
      await rankingCollection.doc(newId).set(newResult);
      console.log('Resultado salvo na nuvem com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar no Firebase:', error);
    }
  },

  // 2. Buscar resultados da Nuvem
  async getResults(): Promise<GameResult[]> {
    try {
      // Busca os dados ordenados pelo ID (que é um Timestamp), do maior para o menor (desc)
      const snapshot = await rankingCollection.orderBy('id', 'desc').get();
      
      const results: GameResult[] = [];
      snapshot.forEach(doc => {
        results.push(doc.data() as GameResult);
      });
      
      return results;
    } catch (error) {
      console.error('Erro ao buscar do Firebase:', error);
      return [];
    }
  },

  // 3. Limpar histórico (Apenas para fins de teste)
  async clearResults(): Promise<void> {
    try {
      const snapshot = await rankingCollection.get();
      // O Firebase exige deletar um documento por vez
      const batch = firestore().batch();
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log('Banco de dados limpo com sucesso.');
    } catch (error) {
      console.error('Erro ao limpar Firebase:', error);
    }
  }
};