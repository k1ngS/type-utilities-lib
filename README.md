# 🧰 Type Utilities Library

> Biblioteca TypeScript com tipos utilitários, decorators e funções genéricas para desenvolvimento moderno.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![In Progress](https://img.shields.io/badge/status-em%20desenvolvimento-yellow.svg)]()

## 📋 Sobre o Projeto

O objetivo do projeto é criar uma biblioteca de utilitários reutilizáveis com tipos avançados, decorators e funções genéricas.

## 📦 Instalação e Setup

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/type-utilities-lib.git
cd type-utilities-lib

# Instale as dependências
npm install

# Rode os testes
npm test

# Build do projeto
npm run build

# Desenvolvimento
npm run dev
```

### Requisitos

- Node.js >= 18.x
- TypeScript >= 5.0

## ✅ Funcionalidades Implementadas

### 🎨 Tipos Utilitários

Localização: `src/types/index.ts`

#### Nullable<T>
Permite que um tipo aceite `null`.

```typescript
import { Nullable } from './types'

type Username = Nullable<string> // string | null

const validUsername: Username = "john_doe" // ✓ OK
const noUsername: Username = null // ✓ OK
```

#### DeepPartial<T>
Torna todas as propriedades opcionais recursivamente.

```typescript
import { DeepPartial } from './types'

interface User {
  profile: {
    address: {
      street: string
      city: string
    }
  }
}

// Tudo opcional, incluindo campos aninhados
type PartialUser = DeepPartial<User>

const user: PartialUser = {
  profile: {} // ✓ OK - não precisa de address
}
```

#### DeepRequired<T>
Torna todas as propriedades obrigatórias recursivamente.

```typescript
import { DeepRequired } from './types'

interface Config {
  database?: {
    host?: string
    port?: number
  }
}

// Agora tudo é obrigatório
type RequiredConfig = DeepRequired<Config>

const config: RequiredConfig = {
  database: {
    host: "localhost", // ✓ Obrigatório
    port: 5432 // ✓ Obrigatório
  }
}
```

#### ReadonlyDeep<T>
Torna todas as propriedades readonly recursivamente.

```typescript
import { ReadonlyDeep } from './types'

interface User {
  profile: {
    name: string
  }
}

type ImmutableUser = ReadonlyDeep<User>

const user: ImmutableUser = {
  profile: { name: "John" }
}

user.profile.name = "Jane" // ❌ Error: readonly
```

#### Prettyfi<T>
"Achata" tipos interseccionados para melhor legibilidade.

```typescript
import { Prettyfi } from './types'

type A = { a: number }
type B = { b: string }

// Sem Prettyfi: difícil de ler no editor
type Ugly = A & B

// Com Prettyfi: apresentação limpa
type Clean = Prettyfi<A & B>
// Resultado: { a: number; b: string }
```

### 🎨 Decorators

Localização: `src/decorators/index.ts`

> ⚠️ **Nota**: Decorators requerem `experimentalDecorators: true` no `tsconfig.json`

#### @MeasureTime()
Mede o tempo de execução de métodos e loga informações.

```typescript
import { MeasureTime } from './decorators'

class UserService {
  @MeasureTime()
  async fetchUser(id: string) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { id, name: "John Doe" }
  }
}

const service = new UserService()
await service.fetchUser("user-123")

// Output no console:
// [fetchUser] argumentos recebidos: ['user-123']
// [fetchUser] retornado: { id: 'user-123', name: 'John Doe' }
// [fetchUser] duração: 1002ms
```

**Uso Prático:**
- Debug de performance
- Identificar métodos lentos
- Monitorar chamadas em desenvolvimento

### 🔧 Funções Genéricas

Localização: `src/utils/index.ts`

#### retry<T>()
Tenta executar uma função assíncrona múltiplas vezes antes de falhar.

```typescript
import { retry } from './utils'

// Função que pode falhar
const fetchData = async () => {
  const response = await fetch("https://api.example.com/data")
  if (!response.ok) throw new Error("API Error")
  return response.json()
}

// Tentar 3 vezes com 1 segundo de delay entre tentativas
const data = await retry(fetchData, 3, 1000)

// Se todas as 3 tentativas falharem, lança o erro
```

**Parâmetros:**
- `fn`: Função assíncrona a ser executada
- `retries`: Número de tentativas (padrão: 3)
- `delay`: Tempo em ms entre tentativas (padrão: 1000)

**Casos de Uso:**
- Requisições HTTP instáveis
- Operações de I/O que podem falhar
- Integrações com APIs externas

## 🧪 Testes

### Executar Testes

```bash
# Rodar todos os testes
npm test

# Modo watch (re-executa ao salvar)
npm run test:watch

# Com relatório de coverage
npm run test:coverage
```

### Testes Implementados

#### ✅ retry.spec.ts
Localização: `src/__tests__/retry.spec.ts`

```
✓ deve retornar o valor na primeira tentativa se tudo der certo
✓ deve tentar novamente se falhar na primeira vez
✓ deve lançar erro se todas as tentativas falharem
```

### Coverage Atual

```
File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
utils/index.ts |   100   |   100    |   100   |   100
```

## 📁 Estrutura do Projeto

```
type-utilities-lib/
├── src/
│   ├── __tests__/
│   │   └── retry.spec.ts          ✅ Implementado
│   ├── decorators/
│   │   └── index.ts                ✅ MeasureTime
│   ├── types/
│   │   └── index.ts                ✅ 5 tipos implementados
│   ├── utils/
│   │   └── index.ts                ✅ retry
│   └── index.ts                    🔴 Pendente (entry point)
├── dist/                            (gerado após build)
├── coverage/                        (gerado após test:coverage)
├── .gitignore                       ✅ Configurado
├── jest.config.js                   ✅ Configurado
├── package.json                     ✅ Scripts funcionais
├── tsconfig.json                    ✅ Decorators habilitados
└── README.md                        📖 Este arquivo
```

## 🗺️ Roadmap

### ✅ Fase 1: Fundamentos (CONCLUÍDA)
- [x] Setup TypeScript + Jest
- [x] Tipos básicos: Nullable, DeepPartial, DeepRequired, ReadonlyDeep, Prettyfi
- [x] Decorator: MeasureTime
- [x] Função: retry com testes
- [x] Configuração ESLint/Prettier

### 🚧 Fase 2: Expansão (EM PROGRESSO)
- [ ] **Tipos Adicionais:**
  - [ ] `Maybe<T>` (T | undefined)
  - [ ] `Optional<T>` (T | null | undefined)
  - [ ] `PickByType<T, U>` (extrair props por tipo)
  - [ ] `OmitByType<T, U>` (omitir props por tipo)

- [ ] **Decorators Adicionais:**
  - [ ] `@Cache(ttl)` - cachear resultados
  - [ ] `@Validate(schema)` - validação de argumentos
  - [ ] `@Retry(maxRetries)` - retry automático
  - [ ] `@Log()` - logging separado do MeasureTime

- [ ] **Funções Adicionais:**
  - [ ] `merge<T, U>()` - merge com type safety
  - [ ] `deepClone<T>()` - clone profundo
  - [ ] `pick<T, K>()` - pick tipado
  - [ ] `omit<T, K>()` - omit tipado

- [ ] **Testes:**
  - [ ] `types.spec.ts` - testar todos os tipos
  - [ ] `decorators.spec.ts` - testar todos decorators
  - [ ] Coverage >80%

### 📅 Fase 3: Finalização (PLANEJADO)
- [ ] Entry point `src/index.ts` exportando tudo
- [ ] Documentação completa com mais exemplos
- [ ] Exemplos práticos em `examples/`
- [ ] GitHub Actions CI/CD

## 💡 Exemplos de Uso Real

### Exemplo 1: API com Retry

```typescript
import { retry } from './utils'
import { Nullable } from './types'

interface User {
  id: string
  email: string
}

async function getUser(id: string): Promise<Nullable<User>> {
  return retry(async () => {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) throw new Error("Failed to fetch user")
    return response.json()
  }, 3, 1000)
}
```

### Exemplo 2: Configuração Parcial

```typescript
import { DeepPartial } from './types'

interface AppConfig {
  database: {
    host: string
    port: number
    credentials: {
      user: string
      password: string
    }
  }
}

// Função aceita config parcial
function updateConfig(changes: DeepPartial<AppConfig>) {
  // Pode passar apenas o que quer mudar
  console.log(changes)
}

updateConfig({
  database: {
    port: 5433 // ✓ Só mudando a porta
  }
})
```

### Exemplo 3: Service com Logging

```typescript
import { MeasureTime } from './decorators'

class ProductService {
  @MeasureTime()
  async getProducts(category: string) {
    // Automaticamente loga tempo e argumentos
    await new Promise(r => setTimeout(r, 500))
    return [{ id: 1, name: "Product 1" }]
  }
}
```

## 🤝 Contribuindo

Este é um projeto de estudos, mas pull requests são bem-vindos!

```bash
# Fork e clone
git clone seu-fork

# Crie uma branch
git checkout -b feature/nova-funcionalidade

# Faça commits claros
git commit -m "feat(types): adiciona tipo Maybe<T>"

# Push e abra PR
git push origin feature/nova-funcionalidade
```

## 📚 Recursos de Aprendizado

- [TypeScript Handbook - Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Testar tipos online
- [Exercism TypeScript Track](https://exercism.org/tracks/typescript)
- [type-fest](https://github.com/sindresorhus/type-fest) - Inspiração para tipos

## 📝 Changelog

### [0.1.0] - 2025-01-02 (Atual)
- ✨ Implementados 5 tipos utilitários
- ✨ Decorator MeasureTime funcional
- ✨ Função retry com testes completos
- 🧪 Jest configurado e funcionando
- 📚 README com documentação básica

## 📄 Licença

[MIT](LICENSE)

## 👤 Autor

**Marcos k1ngS**
- GitHub: [@k1ngS](https://github.com/k1ngS)
- LinkedIn: [marcos-k1ngs](https://linkedin.com/in/marcos-k1ngs)
- Website: [k1ngs.dev](https://k1ngs.dev)
- Email: marcos.beltrao@outlook.pt
