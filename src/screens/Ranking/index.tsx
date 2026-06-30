import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// IMPORTANTE: Importamos o SafeAreaView para proteger os botões da barra do Android
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { styles } from './styles';
import { useRanking } from './useRanking';
import { GameResult } from '../../utils/types';

export function RankingScreen() {
  const { results, handleClear, simulateAddResult } = useRanking();

  const renderItem = ({ item }: { item: GameResult }) => {
    const isWin = item.status === 'VITORIA';
    const borderStyle = isWin ? styles.winBorder : styles.loseBorder;
    const statusColor = isWin ? '#00E676' : '#FF1744';

    return (
      <View style={[styles.card, borderStyle]}>
        <View style={styles.headerRow}>
          <Text style={styles.playerName}>{item.playerName || 'Visitante'}</Text>
          <Text style={styles.timeText}>{item.timestamp}</Text>
        </View>
        
        <View style={styles.detailsRow}>
          <Text style={styles.detailItem}>Dificuldade: {item.difficulty}</Text>
          <Text style={styles.detailItem}>Round: {item.round}</Text>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {isWin ? 'VENCEU' : 'PERDEU'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    // O SafeAreaView com o estilo 'container' empurra o conteúdo para cima da barra do Android
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.title}>Histórico de Partidas</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent} // Garante respiro no fim da lista
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma partida registrada ainda.</Text>
        }
      />

      {/* Agrupamos os botões nesta View */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={[styles.btnClear, { backgroundColor: '#00E676' }]} onPress={simulateAddResult}>
          <Text style={[styles.btnClearText, { color: '#000' }]}>Simular Partida (Salvar no Storage)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnClear} onPress={handleClear}>
          <Text style={styles.btnClearText}>Limpar Histórico</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}