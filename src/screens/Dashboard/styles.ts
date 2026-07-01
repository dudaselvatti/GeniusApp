import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00E676', textAlign: 'center', marginBottom: 30 },
  card: { 
    backgroundColor: '#1E1E1E', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333'
  },
  label: { color: '#888', fontSize: 14, marginBottom: 5 },
  value: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  btnHost: { 
    backgroundColor: '#00E676', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  input: {
    color: '#00E676',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 5,
    marginTop: 5,
  },
});