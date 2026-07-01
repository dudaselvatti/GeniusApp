🚀 Guia de Configuração do Ambiente - Genius App (React Native)
Este guia contém o passo a passo para configurar o seu computador e rodar o aplicativo de controle do nosso projeto Genius pela primeira vez. Como o nosso app se comunica com hardware (Bluetooth) e nuvem (Firebase), não podemos usar o Expo Go; precisamos compilar o código nativo.

1. Instalações Obrigatórias
Node.js: Baixe e instale a versão LTS (recomendado versão 18 ou 20) no site oficial.

Java JDK (Versão 17): O React Native moderno exige o Java 17. Baixe o instalador .msi do OpenJDK 17 (pode usar o site da Adoptium/Eclipse Temurin) e faça a instalação padrão.

Android Studio: Baixe no site oficial do desenvolvedor Android. Ele é pesado, mas precisamos dele pelas ferramentas de compilação (Android SDK), mesmo que você não vá programar nele. Faça a instalação "Standard".

2. Configurando o Android SDK
Abra o Android Studio.

Clique em More Actions (ou no ícone de engrenagem) e vá em SDK Manager.

Na aba SDK Platforms, marque a caixa do Android 13 (Tiramisu) ou Android 14 (UpsideDownCake).

Na aba SDK Tools, marque a caixa Android SDK Build-Tools (versão 33.0.0 ou 34.0.0).

Clique em Apply e espere o download terminar.

3. Variáveis de Ambiente (Windows)
Abra o menu Iniciar do Windows e pesquise por "Editar as variáveis de ambiente do sistema".

Clique no botão Variáveis de Ambiente.

Na seção de variáveis de usuário, clique em Novo.

Nome da variável: ANDROID_HOME

Valor da variável: C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk (substitua SEU_USUARIO pelo nome do seu usuário no Windows).

Ainda nas variáveis de usuário, encontre a variável Path, selecione-a e clique em Editar.

Adicione o seguinte caminho na lista do Path: %ANDROID_HOME%\platform-tools

Clique em OK em tudo para salvar.

4. Preparando o Celular Físico
No seu celular Android, vá em Configurações > Sobre o telefone.

Toque 7 vezes seguidas na opção Número da Versão (ou "Versão da MIUI/UI") para liberar o modo de desenvolvedor.

Volte nas Configurações, procure por Opções do Desenvolvedor e ative a Depuração USB (USB Debugging).

Conecte o celular ao computador via cabo USB (escolha a opção "Transferência de Arquivos").

Aceite o pop-up de segurança que aparecerá na tela do celular.

5. Rodando o Projeto (A Hora da Verdade)
Clone o repositório do projeto para o seu computador.

Cole o arquivo google-services.json (solicite este arquivo para a equipe) EXATAMENTE dentro da pasta android/app/.

Abra o terminal na pasta raiz do projeto.

Instale as bibliotecas rodando o comando: npm install

Abra um terminal e inicie o servidor rodando: npm start

Abra um SEGUNDO terminal na pasta do projeto e inicie a compilação no celular rodando: npm run android

Nota sobre a primeira compilação: O comando npm run android vai demorar bastante na primeira vez (pode levar de 5 a 10 minutos dependendo do computador), pois ele vai baixar todas as dependências nativas do Firebase e do Bluetooth. Tenha paciência! Nas próximas vezes, abrirá em segundos.