import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  statusText: {
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  deviceCard: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  deviceName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceAddress: {
    color: '#888',
    fontSize: 12,
  },
  connectButton: {
    backgroundColor: '#00E676',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  connectButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  btnScan: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  btnScanText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});