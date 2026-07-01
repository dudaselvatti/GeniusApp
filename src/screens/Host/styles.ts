import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width / 2) - 44;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
    width: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 6,
  },
  subtitle: {
    color: '#444',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 20,
  },
  sequenceDisplay: {
    backgroundColor: '#111118',
    width: '100%',
    minHeight: 80,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E1E30',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  sequenceDisplayLocked: {
    borderColor: '#F9A82544',
    backgroundColor: '#1A160A',
  },
  waitingContainer: {
    alignItems: 'center',
    gap: 4,
  },
  waitingText: {
    color: '#F9A825',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  waitingSubText: {
    color: '#7A6000',
    fontSize: 11,
    letterSpacing: 1,
  },
  sequenceText: {
    color: '#00C853',
    fontSize: 18,
    letterSpacing: 6,
    fontWeight: '800',
  },
  placeholderText: {
    color: '#2A2A3A',
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 18,
  },
  colorButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 24,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 44,
    width: '100%',
  },
  btnAction: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClear: {
    backgroundColor: '#111118',
    borderWidth: 1,
    borderColor: '#1E1E30',
  },
  btnSend: {
    backgroundColor: '#0D1F0D',
    borderWidth: 1,
    borderColor: '#00C853',
  },
  btnActionText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  btnSendText: {
    color: '#00C853',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
});