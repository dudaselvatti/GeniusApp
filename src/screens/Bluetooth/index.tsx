import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useBluetooth } from './useBluetooth';

export function BluetoothScreen() {
  const {
    targetDevice,
    isScanning,
    isConnecting,
    isDisconnecting,
    isConnected,
    scanDevices,
    handleConnect,
    handleDisconnect,
  } = useBluetooth();

  const isBusy = isScanning || isConnecting || isDisconnecting;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.title}>BLUETOOTH</Text>
      <Text style={styles.subtitle}>CONEXÃO STM32</Text>

      {/* Status badge */}
      <View style={[styles.statusBadge, { borderColor: isConnected ? '#00C85322' : '#FF174422' }]}>
        <View style={[styles.statusDot, { backgroundColor: isConnected ? '#00C853' : '#FF1744' }]} />
        <Text style={[styles.statusText, { color: isConnected ? '#00C853' : '#FF1744' }]}>
          {isConnected ? 'CONECTADO' : 'DESCONECTADO'}
        </Text>
      </View>

      {/* Área central — dispositivo único */}
      <View style={styles.deviceArea}>
        {isScanning ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00C853" />
            <Text style={styles.loadingText}>Buscando módulo STM32...</Text>
          </View>
        ) : targetDevice ? (
          /* Dispositivo encontrado */
          <View style={styles.deviceCard}>
            <View style={styles.deviceIconCircle}>
              <Text style={styles.deviceIcon}>⬡</Text>
            </View>
            <Text style={styles.deviceName}>{targetDevice.name || 'Módulo STM32'}</Text>
            <Text style={styles.deviceAddress}>{targetDevice.address}</Text>

            {isConnected ? (
              <View style={styles.connectedBadge}>
                <View style={styles.connectedDot} />
                <Text style={styles.connectedText}>Conectado</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.connectButton, isBusy && { opacity: 0.5 }]}
                onPress={handleConnect}
                disabled={isBusy}
              >
                {isConnecting ? (
                  <ActivityIndicator size="small" color="#00C853" />
                ) : (
                  <Text style={styles.connectButtonText}>CONECTAR</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        ) : (
          /* Nenhum dispositivo encontrado */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>⬡</Text>
            <Text style={styles.emptyText}>Nenhum módulo encontrado</Text>
            <Text style={styles.emptyHint}>
              Pareie o HC-05 nas configurações{'\n'}de Bluetooth do celular
            </Text>
          </View>
        )}
      </View>

      {/* Rodapé */}
      <View style={styles.footerContainer}>
        {isConnected && (
          <TouchableOpacity
            style={[styles.btnDisconnect, isBusy && { opacity: 0.4 }]}
            onPress={handleDisconnect}
            disabled={isBusy}
          >
            {isDisconnecting ? (
              <ActivityIndicator size="small" color="#FF1744" />
            ) : (
              <Text style={styles.btnDisconnectText}>✕  DESCONECTAR</Text>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btnScan, isBusy && { opacity: 0.4 }]}
          onPress={scanDevices}
          disabled={isBusy}
        >
          <Text style={styles.btnScanText}>↺  BUSCAR NOVAMENTE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}