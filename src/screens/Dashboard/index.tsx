import React from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useDashboard } from './useDashboard';

export function DashboardScreen() {
  const {
    isMuted,
    isMuteLoading,
    isConnected,
    handleToggleMute,
    goToHost,
    goToRanking,
    goToBluetooth,
  } = useDashboard();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Logo / Header */}
      <View style={styles.logoContainer}>
        <View style={styles.geniusDots}>
          <View style={[styles.dot, { backgroundColor: '#4CAF50' }]} />
          <View style={[styles.dot, { backgroundColor: '#F44336' }]} />
          <View style={[styles.dot, { backgroundColor: '#FFEB3B' }]} />
          <View style={[styles.dot, { backgroundColor: '#2196F3' }]} />
        </View>
        <Text style={styles.title}>GENIUS</Text>
        <Text style={styles.subtitle}>CONTROLLER</Text>
      </View>

      {/* Status Badge */}
      <View style={[styles.statusBadge, { borderColor: isConnected ? '#00C85322' : '#FF174422' }]}>
        <View style={[styles.statusDot, { backgroundColor: isConnected ? '#00C853' : '#FF1744' }]} />
        <Text style={[styles.statusText, { color: isConnected ? '#00C853' : '#FF1744' }]}>
          {isConnected ? 'STM32 CONECTADO' : 'SEM CONEXÃO'}
        </Text>
      </View>

      {/* Som — só quando conectado */}
      {isConnected && (
        <>
          <View style={styles.divider} />
          <Text style={styles.sectionLabel}>PARTIDA</Text>

          <View style={[styles.infoCard, styles.muteCard]}>
            <Text style={styles.label}>SOM</Text>
            <View style={styles.muteRow}>
              <Text style={styles.muteSub}>{isMuted ? 'Desativado' : 'Ativado'}</Text>
              {isMuteLoading ? (
                <ActivityIndicator size="small" color="#00C853" style={{ marginLeft: 12 }} />
              ) : (
                <Switch
                  value={!isMuted}
                  onValueChange={handleToggleMute}
                  disabled={isMuteLoading}
                  thumbColor={isMuted ? '#333' : '#FFFFFF'}
                  trackColor={{ false: '#1E1E30', true: '#00C853' }}
                  style={{ marginLeft: 12 }}
                />
              )}
            </View>
          </View>
        </>
      )}

      <View style={styles.divider} />

      {/* Ações */}
      <Text style={styles.sectionLabel}>AÇÕES</Text>
      <View style={styles.actionsContainer}>
        {/* Bluetooth — sempre visível */}
        <TouchableOpacity style={[styles.btnPrimary, styles.btnBluetooth]} onPress={goToBluetooth}>
          <Text style={styles.btnTextBluetooth}>
            {isConnected ? '⬡  GERENCIAR BLUETOOTH' : '⬡  CONECTAR BLUETOOTH'}
          </Text>
        </TouchableOpacity>

        {/* Histórico — sempre visível */}
        <TouchableOpacity style={[styles.btnPrimary, styles.btnHistory]} onPress={goToRanking}>
          <Text style={styles.btnTextHistory}>◈  VER HISTÓRICO</Text>
        </TouchableOpacity>

        {/* Modo Host — clicável só se conectado */}
        {isConnected ? (
          <TouchableOpacity
            style={[styles.btnPrimary, styles.btnHost, styles.btnHostEnabled]}
            onPress={goToHost}
          >
            <Text style={[styles.btnTextHost, styles.btnTextHostEnabled]}>▶  MODO HOST</Text>
            <Text style={[styles.btnSubText, styles.btnSubEnabled]}>Definir sequência de cores</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.btnPrimary, styles.btnHost, styles.btnHostDisabled]}>
            <Text style={[styles.btnTextHost, styles.btnTextHostDisabled]}>▶  MODO HOST</Text>
            <Text style={[styles.btnSubText, styles.btnSubDisabled]}>Conecte o Bluetooth para continuar</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}