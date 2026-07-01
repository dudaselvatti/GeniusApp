import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useHost } from './useHost';

export function HostScreen() {
  const { sequence, isSending, isLocked, handleAddColor, handleClearSequence, handleSendToSTM32 } = useHost();

  const isDisabled = isSending || isLocked;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MODO HOST</Text>
        <Text style={styles.subtitle}>DEFINA A SEQUÊNCIA</Text>

        {/* Display da sequência / estado do jogo */}
        <View style={[styles.sequenceDisplay, isLocked && styles.sequenceDisplayLocked]}>
          {isLocked ? (
            <View style={styles.waitingContainer}>
              <ActivityIndicator size="small" color="#F9A825" style={{ marginBottom: 8 }} />
              <Text style={styles.waitingText}>PARTIDA EM ANDAMENTO</Text>
              <Text style={styles.waitingSubText}>Aguardando o resultado do jogador...</Text>
            </View>
          ) : sequence.length > 0 ? (
            <Text style={styles.sequenceText}>{sequence.join('  ')}</Text>
          ) : (
            <Text style={styles.placeholderText}>Toque nas cores para criar o desafio...</Text>
          )}
        </View>
      </View>

      {/* Grid de cores — opaco e desabilitado enquanto o jogo estiver ativo */}
      <View style={[styles.grid, isDisabled && { opacity: 0.25 }]}>
        <TouchableOpacity
          activeOpacity={isDisabled ? 1 : 0.5}
          style={[styles.colorButton, { backgroundColor: '#2E7D32' }]}
          onPress={() => handleAddColor(0)}
          disabled={isDisabled}
        />
        <TouchableOpacity
          activeOpacity={isDisabled ? 1 : 0.5}
          style={[styles.colorButton, { backgroundColor: '#B71C1C' }]}
          onPress={() => handleAddColor(1)}
          disabled={isDisabled}
        />
        <TouchableOpacity
          activeOpacity={isDisabled ? 1 : 0.5}
          style={[styles.colorButton, { backgroundColor: '#F9A825' }]}
          onPress={() => handleAddColor(3)}
          disabled={isDisabled}
        />
        <TouchableOpacity
          activeOpacity={isDisabled ? 1 : 0.5}
          style={[styles.colorButton, { backgroundColor: '#1565C0' }]}
          onPress={() => handleAddColor(2)}
          disabled={isDisabled}
        />
      </View>

      {/* Botões de ação */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.btnAction, styles.btnClear, isDisabled && { opacity: 0.25 }]}
          onPress={handleClearSequence}
          disabled={isDisabled}
        >
          <Text style={styles.btnActionText}>LIMPAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnAction,
            styles.btnSend,
            isDisabled && { opacity: isLocked ? 0.25 : 0.7 },
          ]}
          onPress={handleSendToSTM32}
          disabled={isDisabled}
        >
          {isSending ? (
            <ActivityIndicator size="small" color="#00C853" />
          ) : (
            <Text style={styles.btnSendText}>{isLocked ? 'AGUARDANDO...' : 'ENVIAR'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}