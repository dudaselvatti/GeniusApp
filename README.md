# 🧠 Aplicativo de Controle - Jogo Genius (STM32)

Este repositório contém o aplicativo mobile desenvolvido em **React Native (Bare Workflow)** para atuar como um painel de controle, histórico e ranking para um jogo Genius físico, processado por um microcontrolador **STM32**.

## Funcionalidades Implementadas

A interface e a lógica base do aplicativo já estão estruturadas:

* **Dashboard:** Painel principal que exibe o jogador atual, o round em andamento na STM32 e permite ligar/desligar o buzzer da placa física.
* **Modo Host:** Interface visual com os 4 botões coloridos do Genius, permitindo que um jogador crie uma sequência personalizada e envie para a placa reproduzir.
* **Ranking/Histórico:** Tela que utiliza `AsyncStorage` para salvar os resultados das partidas localmente no celular (Nome, Data/Hora, Dificuldade, Round atingido e Status de Vitória/Derrota).
* **Serviço Bluetooth:** Implementação da biblioteca `react-native-bluetooth-classic` com lógica preparada para pareamento via protocolo SPP com módulos HC-05.

## Arquitetura do Projeto

O projeto adota uma arquitetura modular baseada em **Custom Hooks**, separando estritamente a Interface Visual (Views), Lógica de Negócios (Hooks) e Estilização (Styles).

```text
src/
├── navigation/    # Configuração de rotas (React Navigation)
├── screens/       # Telas divididas em (index.tsx, styles.ts, use[Tela].ts)
├── services/      # Comunicação externa (BluetoothService e StorageService)
├── store/         # Gerenciamento de estado global (Zustand)
└── utils/         # Tipagens (types.ts)
```

## 📡 Protocolo de Comunicação UART (Bluetooth)
O aplicativo foi projetado para ler e escrever comandos em string finalizados com o caractere de quebra de linha \n.

- Recebimento (STM32 ➔ App)
O aplicativo escuta continuamente o fluxo de dados e reage aos seguintes comandos:

$NOME:NOME_JOGADOR - Registra o jogador atual.

$ROUND:X - Atualiza o display do round atual.

$RESULTADO:NOME:NIVEL:STATUS - Registra o fim de jogo no histórico.

$ERRO:MOTIVO - Registra uma falha (timeout, cor errada).

- Envio (App ➔ STM32)
O aplicativo despacha os seguintes comandos via botões na interface:

$MUTE:0 ou $MUTE:1 - Controle do buzzer.

$HOST_MODE - Prepara a placa para receber uma sequência.

$SEQ:C1,C2,C3... - Envia a sequência de IDs de cores criada no app.

## Como executar o projeto localmente
Como o projeto utiliza código nativo para a conexão Bluetooth Classic, ele não pode ser executado via Expo Go.

Certifique-se de ter o ambiente Android configurado (JDK, Android SDK). Link: https://developer.android.com/studio?hl=pt-br (pode clicar em next em tudo e só rezar pelo melhor)

Clone o repositório.

Instale as dependências: npm install

Conecte o seu smartphone Android via cabo USB (com Depuração USB ativa).

Execute o servidor do Metro Bundler: npm start

Em outro terminal, compile o app: npm run android