# Anotações React Native

Created: Jun 20, 2020 1:33 PM
Tags: Notes

# Arquitetura

![Anota%20es%20React%20Native%208523bd30344845718895c41f1185c4b2/arquitetura-reactnative.png](Anota%20es%20React%20Native%208523bd30344845718895c41f1185c4b2/arquitetura-reactnative.png)

# Configurando o ambiente de desenvolvimento

 Para configurar, sem dor de cabeça o ambiente dev, seguir este [tutorial](https://react-native.rocketseat.dev/android/linux).

# Iniciando o projeto

Utilize o comando abaixo para criar um projeto

$ npx react-native init project_name

Após iniciado o projeto em uma pasta no meu computador, preciso realizar os passos do tutorial para instalar um emulador OU conectar meu dispositivo físico. Em seguida, chamar:

$ npx react-native run-android

nota: O metro bundler precisa estar ativado para que o app funcione e atualize. Caso o comando run android tenha sido iniciado antes do metro bundles, pode gerar erro.

$ npx react-native start

# Conceitos importantes

 As principais diferenças entre um projeto React native e ReactJS são: Os elementos mostrados em tela(Não utilizamos tags HTML, mas sim componentes que se comportam de forma semelhante as tags já conhecidas) e a estilização.

 Ao realizar estilizações no projeto react native, elas são feitas dentro to próprio arquivo JS.

- O react native possui uma funcionalidade de "Live reloading", permitindo que apenas onde houve alterações seja atualizado no app, fazendo com que não seja preciso recarregar todo o projeto;
- Os componentes do React Native não possuem valor semântico(significado);
- Os componentes não possuem estilização própria;
- metro.config.js funciona de maneira semelhante ao webpack
- Não existe Herança de estilo

# Explicando alguns componentes usado

 Durante essa aula usamos alguns componentes que o react-native me disponibiliza, nesta seção vou fazer uma breve explicação sobre cada um.

```jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import api from './services/api'
```

- SafeAreaView

 Cria uma area segura para mostrar items. (Não passa da statusbar, etc)

- FlatList

 Cria uma lista scrolavel para mostrar itens

- Text

 Componente para mostrar texto no React native

- StyleSheet

 Serve para criar estilos CSS dentro do JS

- StatusBar

 Adiciona a possibilidade de configurar a status bar do aplicativo

- TouchableOpacity

 Cria um botão sem estilo que muda de opacidade quando pressionado