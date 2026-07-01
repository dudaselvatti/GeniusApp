import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useRanking } from './useRanking';
import { EditNameModal } from './EditNameModal';
import { GameResult } from '../../utils/types';

export function RankingScreen() {
  const {
    results,
    isClearing,
    isLoading,
    editingItem,
    handleEditName,
    handleConfirmEdit,
    handleCancelEdit,
    handleSeedExamples,
    handleClear,
  } = useRanking();

  const renderItem = ({ item }: { item: GameResult }) => {
    const isWin = item.status === 'VITORIA';
    const borderStyle = isWin ? styles.winBorder : styles.loseBorder;
    const statusColor = isWin ? '#00C853' : '#FF1744';

    return (
      <View style={[styles.card, borderStyle]}>
        {/* Cabeçalho: nome clicável + data/hora */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.nameButton}
            onPress={() => handleEditName(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.playerName}>{item.playerName || 'Visitante'}</Text>
            <Text style={styles.editHint}>✎ editar</Text>
          </TouchableOpacity>
          <Text style={styles.timeText}>{item.timestamp}</Text>
        </View>

        {/* Detalhes: dificuldade, round, resultado */}
        <View style={styles.detailsRow}>
          <Text style={styles.detailItem}>{item.difficulty}</Text>
          <Text style={styles.detailItem}>Round {item.round}</Text>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {isWin ? '✓ VENCEU' : '✕ PERDEU'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.title}>HISTÓRICO</Text>
      <Text style={styles.subtitle}>PARTIDAS REGISTRADAS</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma partida registrada.</Text>
            <TouchableOpacity
              style={[styles.btnSeed, isLoading && { opacity: 0.4 }]}
              onPress={handleSeedExamples}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#4488FF" />
              ) : (
                <Text style={styles.btnSeedText}>Criar 3 exemplos de teste</Text>
              )}
            </TouchableOpacity>
          </View>
        }
      />

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.btnClear, isClearing && styles.btnDisabled]}
          onPress={handleClear}
          disabled={isClearing || results.length === 0}
        >
          {isClearing ? (
            <ActivityIndicator size="small" color="#FF1744" />
          ) : (
            <Text style={[styles.btnClearText, results.length === 0 && { color: '#222' }]}>
              LIMPAR HISTÓRICO
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal de edição de nome */}
      <EditNameModal
        visible={editingItem !== null}
        currentName={editingItem?.playerName ?? ''}
        onConfirm={handleConfirmEdit}
        onCancel={handleCancelEdit}
      />
    </SafeAreaView>
  );
}