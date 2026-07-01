import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface EditNameModalProps {
  visible: boolean;
  currentName: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export function EditNameModal({ visible, currentName, onConfirm, onCancel }: EditNameModalProps) {
  const [name, setName] = useState(currentName);

  // Atualiza o input sempre que o modal abre com um novo nome
  React.useEffect(() => {
    setName(currentName);
  }, [currentName, visible]);

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>EDITAR JOGADOR</Text>
          <Text style={styles.subtitle}>Quem jogou esta partida?</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome do jogador"
            placeholderTextColor="#333"
            maxLength={20}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleConfirm}
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
              <Text style={styles.btnCancelText}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnConfirm, !name.trim() && { opacity: 0.4 }]}
              onPress={handleConfirm}
              disabled={!name.trim()}
            >
              <Text style={styles.btnConfirmText}>SALVAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000CC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modal: {
    backgroundColor: '#111118',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    borderWidth: 1,
    borderColor: '#1E1E30',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: '#444',
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#0A0A0F',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A40',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 14,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  btnCancel: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    borderWidth: 1,
    borderColor: '#1E1E30',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  btnCancelText: {
    color: '#444',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 2,
  },
  btnConfirm: {
    flex: 1,
    backgroundColor: '#0D1F0D',
    borderWidth: 1,
    borderColor: '#00C853',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  btnConfirmText: {
    color: '#00C853',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 2,
  },
});
