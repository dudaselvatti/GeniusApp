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
    marginBottom: 20,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#111118',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#1E1E30',
    borderRightColor: '#1E1E30',
    borderBottomColor: '#1E1E30',
  },
  winBorder: {
    borderLeftColor: '#00C853',
  },
  loseBorder: {
    borderLeftColor: '#FF1744',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  nameButton: {
    flex: 1,
    marginRight: 12,
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  editHint: {
    color: '#333',
    fontSize: 11,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  timeText: {
    color: '#444',
    fontSize: 12,
    letterSpacing: 0.5,
    fontVariant: ['tabular-nums'],
    marginTop: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    color: '#444',
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  statusText: {
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
  },
  // Estado vazio
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    gap: 20,
  },
  emptyText: {
    color: '#2A2A3A',
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  btnSeed: {
    backgroundColor: '#111118',
    borderWidth: 1,
    borderColor: '#4488FF33',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 180,
  },
  btnSeedText: {
    color: '#4488FF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Rodapé
  footerContainer: {
    paddingTop: 12,
  },
  btnClear: {
    backgroundColor: '#111118',
    borderWidth: 1,
    borderColor: '#1E1E30',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnClearText: {
    color: '#444',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 2,
  },
});