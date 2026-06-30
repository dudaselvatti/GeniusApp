import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useBluetooth } from './useBluetooth';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

export function BluetoothScreen() {
  const { devices, isScanning, isConnected, scanDevices, handleConnect, handleDisconnect } = useBluetooth();

  const renderDevice = ({ item }: { item: BluetoothDevice }) => (
    <View style={styles.deviceCard}>
      <View>
        <Text style={styles.deviceName}>{item.name || 'Dispositivo Desconhecido'}</Text>
        <Text style={styles.deviceAddress}>{item.address}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.connectButton}
        onPress={() => handleConnect(item)}
      >
        <Text style={styles.connectButtonText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.title}>Conexão Bluetooth</Text>
      
      <Text style={styles.statusText}>
        Status: {isConnected ? '🟢 Conectado à STM32' : '🔴 Desconectado'}
      </Text>

      {isScanning ? (
        <ActivityIndicator size="large" color="#00E676" style={{ marginVertical: 20 }} />
      ) : (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.address}
          renderItem={renderDevice}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={{ color: '#555', textAlign: 'center' }}>Nenhum dispositivo pareado encontrado.</Text>
          }
        />
      )}

      {isConnected && (
        <TouchableOpacity style={[styles.btnScan, { backgroundColor: '#FF1744' }]} onPress={handleDisconnect}>
          <Text style={styles.btnScanText}>Desconectar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.btnScan} onPress={scanDevices}>
        <Text style={styles.btnScanText}>Atualizar Lista</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}