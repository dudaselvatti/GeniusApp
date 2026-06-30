import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useDashboard } from './useDashboard';

export function DashboardScreen() {
  const { currentRound, isMuted, playerName, handleToggleMute, goToHost, goToRanking, goToBluetooth } = useDashboard();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GENIUS CTRL</Text>

      <View style={styles.card}>
        <Text style={styles.label}>JOGADOR</Text>
        <Text style={styles.value}>{playerName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>ROUND ATUAL</Text>
        <Text style={styles.value}>{currentRound}</Text>
      </View>

      <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={styles.value}>MUDO</Text>
        <Switch value={isMuted} onValueChange={handleToggleMute} thumbColor="#00E676" />
      </View>

      <TouchableOpacity style={[styles.btnHost, { backgroundColor: '#2196F3', marginBottom: 15 }]} onPress={goToBluetooth}>
        <Text style={[styles.btnText, { color: '#FFF' }]}>CONEXÃO BLUETOOTH</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnHost} onPress={goToHost}>
        <Text style={styles.btnText}>ENTRAR NO MODO HOST</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btnHost, { backgroundColor: '#333', marginTop: 15 }]} onPress={goToRanking}>
        <Text style={[styles.btnText, { color: '#FFF' }]}>VER HISTÓRICO / RANKING</Text>
      </TouchableOpacity>
    </View>
  );
}