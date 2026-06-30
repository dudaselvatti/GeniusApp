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
  // NOVA REGRA: Garante que o último item da lista não fique escondido atrás dos botões
  listContent: {
    paddingBottom: 20, 
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
  },
  winBorder: {
    borderLeftColor: '#00E676', // Verde para vitória
  },
  loseBorder: {
    borderLeftColor: '#FF1744', // Vermelho para derrota
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  playerName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    color: '#888',
    fontSize: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    color: '#AAA',
    fontSize: 14,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontStyle: 'italic',
  },
  // NOVA REGRA: Agrupa os botões na parte de baixo
  footerContainer: {
    marginTop: 10,
    gap: 10, // Espaço entre os botões
  },
  btnClear: {
    backgroundColor: '#333',
    padding: 15, // Aumentei um pouquinho o padding para ficar mais "clicável"
    borderRadius: 8,
    alignItems: 'center',
    // marginTop foi removido daqui e passado para o footerContainer (via gap)
  },
  btnClearText: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});