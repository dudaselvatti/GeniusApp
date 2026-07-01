import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 8,
  },
  subtitle: {
    color: '#444',
    fontSize: 11,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#111118',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Área central que ocupa o espaço disponível
  deviceArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  // Loading
  loadingContainer: {
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: '#444',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '600',
  },

  // Card do dispositivo único
  deviceCard: {
    backgroundColor: '#111118',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1E1E30',
    padding: 32,
    alignItems: 'center',
    width: '85%',
    gap: 10,
  },
  deviceIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0D1F0D',
    borderWidth: 1,
    borderColor: '#00C85333',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  deviceIcon: {
    fontSize: 32,
    color: '#00C853',
  },
  deviceName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  deviceAddress: {
    color: '#444',
    fontSize: 12,
    letterSpacing: 1,
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D1F0D',
    borderWidth: 1,
    borderColor: '#00C85344',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    marginTop: 8,
  },
  connectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00C853',
  },
  connectedText: {
    color: '#00C853',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  connectButton: {
    backgroundColor: '#0D1F0D',
    borderWidth: 1,
    borderColor: '#00C853',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#00C853',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 2,
  },

  // Estado vazio
  emptyContainer: {
    alignItems: 'center',
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
    color: '#222',
    marginBottom: 8,
  },
  emptyText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  emptyHint: {
    color: '#2A2A2A',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 20,
  },

  // Rodapé
  footerContainer: {
    gap: 12,
    paddingTop: 8,
  },
  btnScan: {
    backgroundColor: '#111118',
    borderWidth: 1,
    borderColor: '#1E1E30',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnDisconnect: {
    backgroundColor: '#1F0D0D',
    borderWidth: 1,
    borderColor: '#FF1744',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnScanText: {
    color: '#666',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 2,
  },
  btnDisconnectText: {
    color: '#FF1744',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 2,
  },
});