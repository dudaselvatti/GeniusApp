import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useHost } from './useHost';

export function HostScreen() {
  const { sequence, handleAddColor, handleClearSequence, handleSendToSTM32 } = useHost();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Defina a Sequência</Text>
        <Text style={{ color: '#888' }}>Toque nas cores para criar o desafio</Text>
        
        <View style={styles.sequenceDisplay}>
          {sequence.length > 0 ? (
            <Text style={styles.sequenceText}>{sequence.join(' - ')}</Text>
          ) : (
            <Text style={styles.placeholderText}>Sua sequência aparecerá aqui...</Text>
          )}
        </View>
      </View>

      {/* Grid de Botões (Genius) */}
      <View style={styles.grid}>
        {/* Cor 1: Verde */}
        <TouchableOpacity 
          activeOpacity={0.4}
          style={[styles.colorButton, { backgroundColor: '#4CAF50' }]} 
          onPress={() => handleAddColor(1)} 
        />
        
        {/* Cor 2: Vermelho */}
        <TouchableOpacity 
          activeOpacity={0.4}
          style={[styles.colorButton, { backgroundColor: '#F44336' }]} 
          onPress={() => handleAddColor(2)} 
        />
        
        {/* Cor 3: Amarelo */}
        <TouchableOpacity 
          activeOpacity={0.4}
          style={[styles.colorButton, { backgroundColor: '#FFEB3B' }]} 
          onPress={() => handleAddColor(3)} 
        />
        
        {/* Cor 4: Azul */}
        <TouchableOpacity 
          activeOpacity={0.4}
          style={[styles.colorButton, { backgroundColor: '#2196F3' }]} 
          onPress={() => handleAddColor(4)} 
        />
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.btnAction, styles.btnClear]} onPress={handleClearSequence}>
          <Text style={styles.btnActionText}>LIMPAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnAction, styles.btnSend]} onPress={handleSendToSTM32}>
          <Text style={styles.btnSendText}>ENVIAR</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}