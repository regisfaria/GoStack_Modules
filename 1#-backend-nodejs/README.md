# Anotações Back-end JS

Created: Jun 17, 2020 7:57 PM
Tags: Notes

# Inicializando o backend JS

$ yarn init -y

# Observando mudanças no código

 Posso observar mudanças no código utilizando o pacote nodemon. Ele permite que sempre quando atualizar algum arquivo, a aplicação atualizar, sem necessidade de ter que reiniciar a execução do código pelo terminal.

```bash
$ yarn add nodemon -D
```

[NOTA] - É usado o parametro "-D" para avisar que é uma dependencia apenas de desenvolvimento, caso a aplicação venha ser publicada, ela não vai ser instalada pelo usuario.

 Para utilizar o nodemon, utilizamos o comando abaixo.

```bash
$ yarn nodemon path_to_file.js
```

 Mas para pouparmos escrita, é recomendavel que eu crie um script na o arquivo package.json, adicionando o campo scripts(abaixo do campo license) e passando um objeto com os scripts. depois de criado o script, chamamos ele da seguinte forma:

```bash
$ yarn script_name
```

 Outra dica interessante é alterar o nome do arquivo "main" dentro do package.json, permitindo que o scipt criado seja apenas "nodemon".

# Métodos HTTP

- GET

Buscar informação do back-end

- POST

Enviar informação para o back-end. Criar uma informação nova dentro do back-end.

- PUT/PATCH

Alterar/atualizar informações no backend

É recomendado utilizar o "PUT" para atualizar todas as informações ao mesmo tempo e o método PATCH para atualizar uma unica informação

# Tipos de parametros

- Query Params / Get Params

Principalmente usado para adição de filtros e/ou paginação.

- Route Params

 Identificar recursos (Atualização/Deletar)

- Request Body

Conteúdo na hora de criar/editar um recurso. É um JSON.

# Middleware

 É um interceptador de requisições. Ele pode interromper totalmente a requisição ou alterar dados da requisição.

 É utilizado quando queremos executar algum tipo de código dentro das minhas requisições.

 O middleware pode ser considerado uma requisição, pois é definido da mesma forma.

 Um exemplo de utilização de um middleware, pode ser a validação de um dado. Suponha que tenho um aplicação que aceite a entrada de nomes sem digitos e senhas sem letras maiuscula. Então defino um middleware que faz uma avaliação na entrada de dados que o usuario forneceu, checando se ele colocou algum numero no nome ou uma letra maiuscula na senha.

### Formas de aplicar os Middlewares

- Temos 3 formas de aplicar os Middlewares
    1. app.use(middleware_function( ));
    2. app.get("/route_name", middleware1, middleware2, ..., middlewareN,  (request, response));
    3. app.use("/route_name", middleware1, middleware2, ..., middlewareN);

1 → Desta maneira, todas as rotas vão executar aquele middleware

2 → Nesta forma, chamamos os middlewares na definição da rota, fazendo com que apenas aquela rota execute o middleware, na sequencia em que eles foram definidos dentro da chamada

3 → Aqui posso definir quais rotas o middleware vai ser executado e também posso chamar quantos middlewares eu quiser.

# Notas gerais

- O arquivo que geralmente é iniciado primeiro em projetos desse tipo, é chamado de index.js