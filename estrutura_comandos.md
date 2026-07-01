## 📤 1. Ações do Aplicativo (Envio App ➔ STM32)
- $MUTE:1: Enviado ao ativar o Switch Mudo no Dashboard. Objetivo: Silenciar o buzzer da placa.

- $MUTE:0: Enviado ao desativar o Switch Mudo no Dashboard. Objetivo: Reativar o som do buzzer.

- $HOST_MODE: Enviado ao clicar em "ENVIAR" na tela Host. Objetivo: Avisar a placa para entrar em modo de configuração.

- $SEQ:C1,C2,...: Enviado logo após o $HOST_MODE. Objetivo: Enviar a sequência de cores (IDs separados por vírgula) escolhida pelo usuário.

## 📥 2. Reações do Aplicativo (Recebimento STM32 ➔ App)
- $ROUND:X: O BluetoothService processa e atualiza a variável currentRound na store global automaticamente, refletindo o novo round na interface.

- $RESULTADO:NIVEL:STATUS: O BluetoothService captura o evento, coleta o nome atual (definido no campo de texto do App), a dificuldade e o status, e salva um novo registro no Firebase (via StorageService).

- $ERRO:MOTIVO: O BluetoothService registra a falha no console para fins de depuração.

## 📚 Orientações para o Firmware (STM32)
- Terminação de String: Todo comando enviado pela placa deve finalizar com o caractere \n (quebra de linha), caso contrário, o aplicativo não processará o comando.

- Comparação: No código em C, utilize funções como strcmp (da biblioteca string.h) para validar os comandos recebidos pela UART.

- Formato de Resultado: Para garantir que o ranking seja salvo corretamente, a placa deve enviar o comando final com o formato: printf("$RESULTADO:%s:%s\n", nivel, status);.