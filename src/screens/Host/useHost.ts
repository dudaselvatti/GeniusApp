import { useState } from 'react';
import { Alert } from 'react-native';
import { btService } from '../../services/BluetoothService';
import { useGameStore } from '../../store/gameStore';

export function useHost() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isSending, setIsSending] = useState(false);
  const { gameActive, setGameActive } = useGameStore();

  // Bloqueado se já enviou uma sequência e o jogo não terminou
  const isLocked = gameActive;

  const handleAddColor = (colorId: number) => {
    if (isSending || isLocked) return;
    if (sequence.length >= 20) {
      Alert.alert('Limite Atingido', 'A sequência máxima é de 20 cores.');
      return;
    }
    setSequence((prev) => [...prev, colorId]);
  };

  const handleClearSequence = () => {
    if (isSending || isLocked) return;
    setSequence([]);
  };

  const handleSendToSTM32 = async () => {
    if (isSending || isLocked) return;

    if (sequence.length === 0) {
      Alert.alert('Sequência Vazia', 'Toque nas cores para criar a sequência antes de enviar.');
      return;
    }

    setIsSending(true);
    try {
      const sequenceString = sequence.join(',');
      const commandToSend = `$SEQ:${sequenceString}`;

      const successHost = await btService.sendData('$HOST_MODE');

      // Aguarda a STM32 processar o $HOST_MODE antes de enviar a sequência
      await new Promise<void>(resolve => setTimeout(resolve, 250));

      const successSeq = await btService.sendData(commandToSend);

      if (successHost && successSeq) {
        // Marca o jogo como ativo — bloqueia novas sequências até o resultado chegar
        setGameActive(true);
        setSequence([]);
        Alert.alert('✓ Enviado!', 'Sequência enviada! Aguardando o jogador terminar a partida.');
      } else {
        Alert.alert('Falha no Envio', 'Um ou mais comandos não foram confirmados. Verifique a conexão Bluetooth e tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao enviar para a placa.');
    } finally {
      setIsSending(false);
    }
  };

  return {
    sequence,
    isSending,
    isLocked,
    handleAddColor,
    handleClearSequence,
    handleSendToSTM32,
  };
}