import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StorageService } from '../../services/storage';
import { GameResult } from '../../utils/types';

export function useRanking() {
  const [results, setResults] = useState<GameResult[]>([]);
  const [isClearing, setIsClearing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estado do modal de edição
  const [editingItem, setEditingItem] = useState<GameResult | null>(null);

  const loadRanking = async () => {
    try {
      const data = await StorageService.getResults();
      setResults(data);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar o histórico.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRanking();
       
    }, [])
  );

  // Abre o modal de edição
  const handleEditName = (item: GameResult) => {
    setEditingItem(item);
  };

  // Confirma a edição do nome
  const handleConfirmEdit = async (newName: string) => {
    if (!editingItem) return;
    const id = editingItem.id;
    setEditingItem(null); // fecha o modal imediatamente (UX responsiva)

    try {
      await StorageService.updatePlayerName(id, newName);
      setResults(prev =>
        prev.map(r => r.id === id ? { ...r, playerName: newName } : r)
      );
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o nome. Verifique sua conexão.');
    }
  };

  // Cancela a edição
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // Popular com 3 exemplos de teste
  const handleSeedExamples = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await StorageService.seedExamples();
      await loadRanking();
    } catch {
      Alert.alert('Erro', 'Não foi possível criar os exemplos.');
    } finally {
      setIsLoading(false);
    }
  };

  // Limpar histórico com confirmação
  const handleClear = () => {
    if (isClearing) return;

    Alert.alert(
      'Apagar Histórico',
      'Isso vai apagar todas as partidas registradas. Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar Tudo',
          style: 'destructive',
          onPress: async () => {
            setIsClearing(true);
            try {
              await StorageService.clearResults();
              setResults([]);
            } catch {
              Alert.alert('Erro', 'Não foi possível limpar o histórico.');
            } finally {
              setIsClearing(false);
            }
          },
        },
      ]
    );
  };

  return {
    results,
    isClearing,
    isLoading,
    editingItem,
    handleEditName,
    handleConfirmEdit,
    handleCancelEdit,
    handleSeedExamples,
    handleClear,
  };
}