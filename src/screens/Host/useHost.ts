import { useState } from 'react';
import { Alert } from 'react-native';
import { btService } from '../../services/BluetoothService';

export function useHost() {
  // Estado local para guardar a sequência de IDs de cores (ex: [1, 4, 2, 3])
  const [sequence, setSequence] = useState<number[]>([]);

  // Função para adicionar uma cor à sequência
  const handleAddColor = (colorId: number) => {
    // Limite opcional: impedir que a sequência fique gigante (ex: max 20)
    if (sequence.length >= 20) {
      Alert.alert('Limite atingido', 'A sequência máxima é de 20 cores.');
      return;
    }
    setSequence((prev) => [...prev, colorId]);
  };

  // Função para limpar a sequência atual
  const handleClearSequence = () => {
    setSequence([]);
  };

  // Função que "enviaria" os dados para o Bluetooth
  const handleSendToSTM32 = async() => {
    if (sequence.length === 0) {
      Alert.alert('Aviso', 'Crie uma sequência antes de enviar.');
      return;
    }

    // Monta a string no formato exigido: $SEQ:C1,C2,C3
    const sequenceString = sequence.join(',');
    const commandToSend = `$SEQ:${sequenceString}`;

    // Aqui, no futuro, chamaremos a função de write do BluetoothService
    // Envia os dois comandos. O await garante a ordem.
    const successHost = await btService.sendData('$HOST_MODE');
    const successSeq = await btService.sendData(commandToSend);

    if (successHost && successSeq) {
        Alert.alert('Sucesso', 'Sequência enviada para a placa!');
        handleClearSequence(); // Limpa a tela se deu tudo certo
    } else {
        Alert.alert('Erro', 'Falha ao enviar. Verifique a conexão Bluetooth.');
    }
  };

  return {
    sequence,
    handleAddColor,
    handleClearSequence,
    handleSendToSTM32,
  };
}