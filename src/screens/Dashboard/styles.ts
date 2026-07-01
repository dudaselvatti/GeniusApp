import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 12,
  },
  geniusDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    letterSpacing: 4,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 4,
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
    fontWeight: '600',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#1A1A2E',
    marginVertical: 20,
  },
  sectionLabel: {
    fontSize: 11,
    color: '#444',
    letterSpacing: 3,
    fontWeight: '700',
    marginBottom: 12,
    marginLeft: 4,
  },
  label: {
    color: '#555',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 8,
  },
  // Card de som — largura total
  infoCard: {
    flex: 1,
    backgroundColor: '#111118',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E1E30',
  },
  muteCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  muteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  muteSub: {
    color: '#888',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  actionsContainer: {
    gap: 12,
  },
  btnPrimary: {
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBluetooth: {
    backgroundColor: '#1A1A2E',
    borderWidth: 1.5,
    borderColor: '#4488FF',
  },
  btnHost: {
    borderWidth: 1,
  },
  btnHostEnabled: {
    backgroundColor: '#0D1F0D',
    borderColor: '#00C853',
  },
  btnHostDisabled: {
    backgroundColor: '#111118',
    borderColor: '#1E1E30',
  },
  btnHistory: {
    backgroundColor: '#111118',
    borderWidth: 1,
    borderColor: '#1E1E30',
  },
  btnTextBluetooth: {
    color: '#4488FF',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 2,
  },
  btnTextHost: {
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 2,
  },
  btnTextHostEnabled: {
    color: '#00C853',
  },
  btnTextHostDisabled: {
    color: '#333',
  },
  btnTextHistory: {
    color: '#666',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 2,
  },
  btnSubText: {
    fontSize: 11,
    marginTop: 3,
    letterSpacing: 1,
  },
  btnSubEnabled: {
    color: '#005c26',
  },
  btnSubDisabled: {
    color: '#2A2A2A',
  },
});