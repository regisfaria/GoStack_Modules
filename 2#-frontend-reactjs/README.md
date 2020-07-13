# Anotações Front-end ReactJS

Created: Jun 19, 2020 10:21 AM
Tags: Notes

# Iniciando o projeto

 Primeiro vamos iniciar o package.json, com o seguinte comando:

```bash
$ yarn init -y 
```

 Em seguida, vamos criar a estrutura padrão da pasta, uma "src" e uma "public" e o comando para adicionar o react

```bash
$ yarn add react react-dom
```

 Durante o bootcamp, estamos aprendendo a criar o projeto React na mão, sem utilizar o comando "create-react-app". Isso se da ao motivo de que com o comando, temos arquivos demais e talvez desnecessarios, então é melhor aprendermos da forma "mais dificil", pois sera mais performatico.

# Conceitos importantes

### Transpilando o React para o browser

 O nosso código React é muito recente para que os browsers entendam ele. Então é preciso utilizar algumas configurações externas para poder permitir que nosso código utilizando React seja interpretado por qualquer browser, e para isso utilizamos o Babel e o Webpack.

- Babel

 Converte(TRANSPILE) código React para um código que o browser entenda

- Webpack

 Para cada tipo de arquivo (.js, .css, .png) ele vai converter o código de uma maneira diferente para que o browser entenda

- Loaders

 Dentro do Webpack, temos os loaders: Babel-loader(converte o JS em algo que o browser entenda), css-loader(converte o css), image-loader.... etc

### JSX

 HTML dentro do Javascript, ou como é chamado, Javascript XML

### Componentização

 O react segue uma estrutura de componentização, onde todo conteudo dentro da aplicação pode e deve ser componentizado.

EX: Numa pagina de login, o modal do login é um componente, pois em outros lugares vão haver também modal forms, o botão de submit também é um componente, pois com certeza haverão outros botões dentro da aplicação.

 Abaixo tenho um código que exemplifica um funcionamento básico de como funciona a estrutura do React:

```jsx
// Arquivo: Header.js
import React from 'react'

export default function Header() {      // #1
  return (
    <header>
      <h1>ReactJS</h1>
    </header>
  )
}

// Arquivo: App.js
import React from 'react'
import Header from './components/Header'

function App() {
  return (
    <>                // #2
      <Header />
      <Header />
    </>
  )
}

export default App       // #3

// Arquivo: index.js
import React from 'react'
import { render } from 'react-dom'

import App from './App'    // #4

render(<App />, document.getElementById('app'))      // #5

// Arquivo: index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ReactJS</title>
</head>
<body>
  <div id="app"></div>     // #6
  <script src="bundle.js"></script>
</body>
</html>
```

---

#1 → Na hora de definir a função(o componente) já podemos acompanhar esse comando com o comando de exportação, ao invés de botar  no rodapé do código.

#2 → Conceito de Fragmentação: No React não podemos ter um componente que retorna dois nodos pais. Então como dentro do exemplo mostra que quero criar 2 Headers, posso resolver isso de duas maneiras.

 1. Seria envolvendo os headers em uma div, mas isso iria me gerar um código html desnecessario em minha aplicação.

 Então utilizo <></> para envolver os componentes que eu quero mostrar dentro do fragmento, permitindo retornar quantos componentes eu quiser, sem gerar todos eles dentro de uma div.

#3 → Modo 'padrão' de exportar um componente   |   #4  → Importando um componente

#5 → Renderizando o componente principal           |   #6 → Div para renderizar o app

---

- Todos os arquivos react precisam importar o react no inicio
- Devemos sempre criar arquivos de componentes com a letra maiuscula

### Propriedades

 Propriedades são parametros que posso enviar ao componente. Mas diferente de um parametro de função ele é usado de maneira diferente, abaixo:

```jsx
// Arquivo: Header.js
export default function Header({ title, children }) {  // #1
  return (
    <header>
      <h1>{title}</h1>      // #2

      {children}
    </header>
  )
}
// Arquivo: App.js
export default function App() {
  return (
    <>
      <Header title="Homepage">
        <ul>
          <li>Menu</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </Header>
      <Header title="MyApp">
      <ul>
          <li>Login</li>
          <li>dashboard</li>
          <li>Contact</li>
        </ul>
      </Header>
    </>
  )
}
```

---

#1 → Descompactação das propriedades, pois se não estivesse dentro das { }, teria que trocar tudo por "props" e para acessar esses valores, seria necesserario escrever sempre props antes de qualquer propriedade passada.

#2 → No JSX, para mostrar variaveis ou chamar funções JS, temos que envolver elas com { }.

---

### Estado e Imutabilidade

 Este conceito é a nova abordagem com as variaveis do React. Sempre que quero definir uma variavel no meu codigo react, devo importar o useState, como exemplificado e explicado abaixo:

```jsx
import React, { useState } from 'react'
import Header from './components/Header'

export default function App() {
  // useState returns a two-position array
  //
  // 1. Variable with it's initial value
  // 2. Function to update the first variable value
  const [projects, setProjects] = useState(["Web Development", "ReactJS"])

  function handleAddProject() {
    setProjects([...projects, `Project created at ${Date.now()}`])    // #1
  }

  return (
    <>
      <Header title="Projects">
        <ul>
          {projects.map(project => <li key={project}>{project}</li>)} // #2
        </ul>
        <button type="button" onClick={handleAddProject}>Add Project</button>
      </Header>
    </>
  )
}
```

---

#1 → Uso do spread operator(...) para copiar todo o conteudo anterior daquela variavel

#2 → sempre que houver um map, é preciso fornecer um valor unico de chave(key) para o elemento de maior procedencia.

---

### Conexão com a API

 Ao instalar o pacote axios, podemos fazer a conexão do nosso frontend com a API, adicionando uma pasta "services" definido da seguinte forma:

```jsx
// Arquivo: /services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export default api
```

 Agora é só importar a api no nosso "App.js".

### useEffect

 No react temos o conceito de useEffect, no qual me permite executar código sempre que algo aconteça, ou ao carregamento de alguma coisa, etc...

```jsx
import React, { useEffect }

function App() {
	// Essa função recebe dois parametros
	//
	// 1. A função que ela vai executar 
	// 2. Quando ela vai executar
	//     Posso passar [] para definir que ela sempre vai executar
	//    quando o componente for exibido em tela, ou passar o valor de uma variavel
  //    fazendo com que ela execute sempre que a variavel mudar de valor
	useEffect(() => {}, [])
}
```

# Pacotes adicionados e suas funcionalidades

---

```bash
$ yarn add @babel/core @babel/preset-env @babel/preset-react @babel/cli  webpack webpack-cli
```

 Pacotes de transpile. São responsaveis para fazer com que o browser entenda código que ele ainda não tem suporte

---

```bash
$ yarn add babel-loader
```

 É o loader do babel. Deve ser adicionado e configurado no webpack.

---

```bash
$ yarn add webpack-dev-server -D
```

 O pacote abaixo serve para fazermos o "watch" durante o desenvolvimento(por isso a flag -D). Após a instalação, ele deve ser adicionado no arquivo de Webpack. #1

---

```bash
$ yarn add css-loader style-loader
```

 Estes pacotes servem para realizar o transpile do estilo e css do código. Deve ser adicionada no webpack.

---

```bash
$ yarn add file-loader
```

 Cuida da interpretação de arquivos no código. Deve ser adicionada no webpack.

---

```bash
$ yarn add axios
```

 Define uma conexão com backends.

---

```bash
$ yarn add @babel/plugin-transform-runtime
```

 Permite que funções que utilizem da sintaxe "async, await" sejam executadas. Deve ser adicionada no babel config.

# Estruturando o projeto

 Dentro da pasta public, criamos um "index.html"(a convenção de chamar o arquivo de index, é para dizer que ele é o primeiro arquivo a ser executado, semelhante ao main), onde posso utilizar das extensões do VScode para me gerar uma DOM HTML com o seguinte comando:

html:5

 Em seguida, dentro do body, adicionar uma div com id=app. Isso também pode ser feito de maneira mais rapida com a extensão do VScode

div#app

### Configurando o Babel

 Após instalado os pacotes de transpilers, vamos criar na raiz do projeto um arquivo chamado "babel.config.js". Ele é responsavel para fazer com que o browser entenda meu código.

```jsx
module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react'	
	],
};
```

 Para então convertermos nosso arquivo index.js, temos que utilizar o comando abaixo.

```bash
$ yarn babel src/index.js —out-file public/bundle.js
```

 Então é criado um código na pasta public, convertido de uma maneira que o browser entenda. Em seguida, se importarmos o script no body do nosso index.html, ele será executado sem nenhum problema.

### Configurando o Webpack

 Vamos criar na raiz do projeto um arquivo chamado "webpack.config.js", onde ele vai ser responsavel por definir os interpretadores que vão agir no meu código. Ele vai ter o seguinte formato:

```jsx
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i, // #1
      }
    ]
  },
};
```

 No codigo acima, temos diversos conceitos, vou explicar cada um deles:

---

- Conceitos da RegEx usados:
    - ' \. '

    Significa que quero EXATAMENTE o caracter "." ( " \ " faz isso )

    - ' $ '

    Significa que é para buscar a regex no final do arquivo

    - ' .* ' ( usado na #1 )

    Ponto(representa caracter) acompanhado de um *(representa todo), para dizer que pode conter todo tipo de caracter

    - ' | '

    Operador lógico OU

    - ' e? '

    Este comando é a letra "e" acompanhada do "?", onde o "?" representa que a letra e é opcional, pode ou não existir. (pois temos .jpeg e .jpg)

    - ' i '

    Case insensitive, aceitando tanto ".JPG" como ".jpg"

    ---

entry ⇒ Arquivo principal que vai ser executado   |   output ⇒ arquivo principal transpilado

 No rules, vamos definir quais arquivos vamos converter, perceba que usamos expressões regulares para achar o tipo de arquivo que queremos trabalhar em cima.

test ⇒ Qual tipo de arquivo ele vai utilizar.

 Excluimos(exclude: /node_modules/) a pasta node_modules, pois não é nossa responsabilidade instalar ela e em seguida qual vai ser o transpilador para este tipo de arquivo.

 No fim de todas essas definições, executamos o webpack com o seguinte comando:

```bash
$ yarn webpack —mode development
```

 Mas apesar de tudo, sempre que atualizarmos o código, ele não vai ser automaticamente atualizado, fazendo com que seja necessario a execução do comando sempre que quisermos uma atualização.

 Para resolvermos isso, após instalado o pacote #1, podemos utilizar o seguinte comando:

```bash
 $ yarn webpack-dev-server —mode development
```