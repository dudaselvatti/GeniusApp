import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width / 2) - 40; // Calcula o tamanho para caber 2 por linha com folga

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro igual ao Dashboard
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sequenceDisplay: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    minHeight: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
  },
  sequenceText: {
    color: '#00E676',
    fontSize: 20,
    letterSpacing: 4, // Espaçamento entre os números
    fontWeight: 'bold',
  },
  placeholderText: {
    color: '#555',
    fontSize: 16,
    fontStyle: 'italic',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20, // Espaço entre os botões
    paddingHorizontal: 20,
  },
  colorButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 20,
    elevation: 8, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 50,
  },
  btnAction: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  btnClear: {
    backgroundColor: '#333',
  },
  btnSend: {
    backgroundColor: '#00E676',
  },
  btnActionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnSendText: {
    color: '#000', // Texto preto no fundo verde
    fontSize: 16,
    fontWeight: 'bold',
  }
});