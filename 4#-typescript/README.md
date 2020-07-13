# Anotações Typescript

Created: Jun 21, 2020 1:34 PM
Tags: Notes

# Porque usar TS?

 Uma grande vantagem do TS é utilizar eles em grandes projetos, pois você tem mais suporte a inteligencia da IDE, sabendo como é o formato dos objetos que estão sendo utilizados dentro do código, fornecendo uma maior escalabilidade e manutenção nos projetos que o utilizam.

# Conceitos importantes

 Na hora de executar um projeto que utiliza TS, não posso utlizar o antigo comando de execução do codigo:

```bash
$ node src/index.ts
```

 Porque o Node não conhece o TS, apenas JS. Então quando fazemos a adição do modulo "typescript", posso executar meus códigos TS da seguinte forma:

```bash
$ yarn tsc src/index.ts
```

 Para convertar o código TS em JS, antes de tudo preciso de um arquivo "tsconfig.json" na raiz do meu projeto, para criar este arquivo, posso utilizar do seguinte comando:

```bash
$ yarn tsc --init
```

 Agora com o arquivo tsconfig no projeto, posso simplesmete escrever o comando abaixo para realizar a conversão do código, pois o TS vai achar automaticamente os arquivos que precisam ser convertidos, e em seguida executar o backend:

```bash
$ yarn tsc
$ node src/index.js (arquivo convertido)
```

 Uma boa pratica na conversão dos arquivos, é acessar o tsconfig e descomentar a linha "outdir", setando um diretório para onde vai contar os arquivos buildados do TS.

```json
// Arquivo: tsconfig
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
--->"outDir": "./dist",                       /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  }
}
```

### Como definir e usar a typagem do TS

 Nem sempre vouo definir tipos para minhas  variaveis no TS, então fica  a pergunta, quando devo definir um tipo?

 Quando importamos algum modulo(e que teve seu @types importado também), sua intelisense é mantida no arquivo que ele foi importado, mas no exemplo abaixo, o arquivo "routes.ts" não vai ter acesso aos metodos da (response, request), pois a importação do express foi feita no arquivo "index.ts".

```tsx
// Arquivo: index.ts
import express from 'express'
import { helloWorld } from './routes'

const app = express()

app.get("/", helloWorld)

app.listen(3333)
// Arquivo: routes.ts
export function helloWorld(request, response) {
  return response.json({message: "Hello world"})
}
```

 Então como posso ter acesso a todas as funcionalidade dos objetos do express, dentro do arquivo  routes? É preciso importar os tipos e typar as variaveis na função da seguinte forma:

```tsx
// Arquivo: routes.ts
import { Response, Request } from 'express'

export function helloWorld(request: Request, response: Response) {
  return response.json({message: "Hello world"})
}
```

 Mas não preciso SEMPRE saber quando definir os tipos, pois o VSCode vai me avisa quando é preciso fazer a typagem.

### Como criar minhas própias tipagens

 Quando vamos definir conjuntos de dados e queremos utilizar da funcionalidade do TS, posso criar uma interface para definir como vai ser o objeto que vou trabalhar.

```tsx
// Arquivo: services/CreateUsers.ts
interface Techs{
  title: string
  experience: number
}

interface CreateUserData {
  name?: string
  email: string
  password: string
  techs?: Array<string | Techs>
}

export default function createUsers({ name, email, password }: CreateUserData) {
  const user = {
    name,
    email,
    password
  }

  return user
}
```

 Na interface, após o campo "name", temos um "?". Isso significa que aquele parametro é opcional.

# Modulos importados

 Como de praxe, vou deixar anotado aqui alguns módulos que foram utilizados e explicar oque cada um faz.

---

```bash
$ yarn add typescript -D
```

 Este pacote é instalado porque precisamos converter o meu codigo typescript em javascript, por isso essa dependencia é baixada com a flag -D, pois só sera utilizada em desenvolvimento, nna hora da conversão do código.

```bash
$ yarn add express
$ yarn add @types/express -D
```

 Serve para criar a principal estrutura de rotas do backend.

 O comando é acompanhando do @types/express, para o Typescript adqurir a intelisense(inteligencia da IDE) sobre este pacote

---

Para mais informações sobre TypeScript, conferir este [link](https://www.notion.so/Typescript-5712aeab312d44fcba0aa88895caad36).