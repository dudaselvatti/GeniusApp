import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StorageService } from '../../services/storage';
import { GameResult } from '../../utils/types';

export function useRanking() {
  const [results, setResults] = useState<GameResult[]>([]);

  const loadRanking = async () => {
    const data = await StorageService.getResults();
    setResults(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadRanking();
    }, [])
  );

  const handleClear = async () => {
    await StorageService.clearResults();
    setResults([]);
  };

  // --- FUNÇÃO SIMULADA DE TESTE ---
  // Quando sua placa estiver pronta, você chamará isso após um comando $RESULTADO
  const simulateAddResult = async () => {
    await StorageService.saveResult({
      playerName: 'Ana',
      difficulty: 'DIFICIL',
      round: '4/5',
      status: 'VITORIA',
    });
    await loadRanking();
  };

  return {
    results,
    handleClear,
    simulateAddResult,
  };
}