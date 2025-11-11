# Stone Code - Token Platform
## Arquitetura Técnica Detalhada

---

## 1. Stack Tecnológico

### Frontend
- **Framework:** React 18+ com TypeScript
- **Build Tool:** Vite
- **Web3 Integration:** 
  - `ethers.js` v6+ (para interação com blockchain)
  - `web3modal` (para MetaMask connection)
  - `wagmi` (hooks para Web3 React)
- **UI:** Tailwind CSS + Headless UI
- **State Management:** TanStack Query (React Query) + Zustand
- **Forms:** React Hook Form + Zod (validação)

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** Firebase Firestore (documento de metadados dos tokens criados)
- **Authentication:** JWT + Web3 signature verification
- **API Rate Limiting:** express-rate-limit
- **Deployment:** Vercel ou Railway

### Smart Contracts
- **Language:** Solidity ^0.8.20
- **Framework:** Foundry (para desenvolvimento e testes)
- **Standards:**
  - ERC-20 (token padrão)
  - ERC-20 Permit (para aprovações gasless - futuro)
- **Testing:** Foundry tests + Hardhat (opcional)
- **Deployment:** Polygon mainnet

### Blockchain & APIs
- **RPC Provider:** Alchemy ou QuickNode (Polygon)
- **Event Indexing:** The Graph (subgraph para tokens criados)
- **SushiSwap Integration:**
  - `@sushiswap/sdk`: Roteamento e cálculos
  - SushiSwap GraphQL API (liquidez, volume)
  - Polygon SushiSwap Router V2

---

## 2. Arquitetura em Componentes

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌────────────────┬─────────────┬──────────────────┐   │
│  │  Create Token  │  Dashboard  │  Token Analytics │   │
│  │    Form        │             │   (SushiSwap)    │   │
│  └────────────────┴─────────────┴──────────────────┘   │
│         MetaMask Connection (Web3Modal)                 │
└────────────────┬────────────────────────────────────────┘
                 │
    ┌────────────▼──────────────────┐
    │    Frontend SDK (ethers.js)    │
    │    - Contract Interaction      │
    │    - Transaction Signing       │
    └────────────┬──────────────────┘
                 │
    ┌────────────▼──────────────────┐
    │   Backend API (Express.js)     │
    │  ┌──────────────────────────┐  │
    │  │ POST /api/tokens/deploy  │  │
    │  │ GET /api/tokens/:address │  │
    │  │ GET /api/tokens/trending │  │
    │  │ POST /api/sushiswap/...  │  │
    │  └──────────────────────────┘  │
    └────────────┬──────────────────┘
                 │
    ┌────────────▼──────────────────────────┐
    │       External Services                │
    │  ┌───────────┬───────────┬───────────┐│
    │  │  Polygon  │ Alchemy   │ SushiSwap ││
    │  │   RPC     │   API     │    API    ││
    │  └───────────┴───────────┴───────────┘│
    └───────────────────────────────────────┘
                 │
    ┌────────────▼──────────────────┐
    │    Smart Contracts (Polygon)   │
    │  ┌──────────────────────────┐  │
    │  │  Token Factory Contract  │  │
    │  │  ERC-20 Implementation   │  │
    │  └──────────────────────────┘  │
    └───────────────────────────────┘
                 │
    ┌────────────▼──────────────────┐
    │   Polygon Blockchain           │
    │   + SushiSwap DEX              │
    └───────────────────────────────┘
```

---

## 3. Fluxo de Criação de Token

### 3.1 Interação Frontend → Backend → Smart Contract

```
┌─────────────────────────────────────────────────────────────┐
│ 1. FRONTEND: Usuário Preenche Formulário                   │
│    - Nome: "My Meme Coin"                                  │
│    - Símbolo: "MMCOIN"                                     │
│    - Supply Inicial: 1,000,000                             │
│    - Decimals: 18                                          │
│    - [Opcional] Criar Pool SushiSwap: YES                  │
└───────────┬───────────────────────────────────────────────┘
            │
┌───────────▼───────────────────────────────────────────────┐
│ 2. FRONTEND: Conectar MetaMask e Assinar                  │
│    - Validação local de inputs                            │
│    - User aprova transaction no MetaMask                  │
└───────────┬───────────────────────────────────────────────┘
            │
┌───────────▼───────────────────────────────────────────────┐
│ 3. BACKEND: Validação e Pré-processamento                 │
│    - Validar inputs                                        │
│    - Estimar gas (via RPC call)                           │
│    - Gerar dados de transação                              │
│    POST /api/tokens/deploy (com dados do usuário)         │
└───────────┬───────────────────────────────────────────────┘
            │
┌───────────▼───────────────────────────────────────────────┐
│ 4. SMART CONTRACT: Deploy ERC-20                          │
│    - Factory cria novo token contrato                     │
│    - Mint supply inicial para user                        │
│    - Event: TokenCreated(address, name, symbol)           │
└───────────┬───────────────────────────────────────────────┘
            │
┌───────────▼───────────────────────────────────────────────┐
│ 5. [OPCIONAL] SUSHISWAP: Criar Pool de Liquidez          │
│    - Aprovação do token no SushiSwap                      │
│    - Factory SushiSwap cria par WMATIC/Token              │
│    - Mint LP token pro usuário                            │
└───────────┬───────────────────────────────────────────────┘
            │
┌───────────▼───────────────────────────────────────────────┐
│ 6. BACKEND: Registrar Metadados no Firebase               │
│    - Token address                                         │
│    - Creator address                                       │
│    - Pool address (se criado)                             │
│    - Timestamp                                             │
│    - Metadata (nome, símbolo, imagem)                     │
└───────────┬───────────────────────────────────────────────┘
            │
┌───────────▼───────────────────────────────────────────────┐
│ 7. FRONTEND: Sucesso!                                      │
│    - Mostrar: Token criado em [address]                   │
│    - Link para Polygon Scanner                            │
│    - Link para Pool SushiSwap                             │
│    - Share na web                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Endpoints da API Backend

### Tokens
```
POST   /api/tokens/deploy              # Deploy novo token
GET    /api/tokens/:address            # Info de um token específico
GET    /api/tokens                     # Listar todos os tokens criados
GET    /api/tokens/trending            # Top tokens por liquidez/volume
GET    /api/tokens/:address/holders    # Top holders de um token
```

### SushiSwap Integration
```
GET    /api/sushiswap/pools/:token     # Info do pool WMATIC/Token
POST   /api/sushiswap/add-liquidity    # Adicionar liquidez (futuro)
GET    /api/sushiswap/quotes/:token    # Quote de swap (futuro)
```

### Blockchain
```
GET    /api/blockchain/gas-price       # Preço atual de gas
GET    /api/blockchain/token/:address  # Info do token via RPC
```

---

## 5. Smart Contracts

### TokenFactory.sol
```solidity
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract TokenFactory is Ownable {
    address public tokenImplementation;
    address[] public deployedTokens;
    
    event TokenDeployed(
        address indexed tokenAddress,
        address indexed creator,
        string name,
        string symbol,
        uint256 initialSupply,
        uint8 decimals
    );
    
    function deployToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals
    ) external returns (address) {
        // Logic para deploy de novo ERC-20
        // Emite evento
        // Retorna address do novo token
    }
    
    function getDeployedTokens() external view returns (address[] memory) {
        return deployedTokens;
    }
}
```

### SimpleToken.sol
```solidity
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20 {
    uint8 private _decimals;
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimalsParam
    ) ERC20(name, symbol) {
        _decimals = decimalsParam;
        _mint(msg.sender, initialSupply * 10 ** uint256(decimalsParam));
    }
    
    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
```

---

## 6. Banco de Dados (Firebase)

### Collection: `tokens`
```json
{
  "tokenAddress": "0x123...",
  "creator": "0x456...",
  "name": "My Meme Coin",
  "symbol": "MMCOIN",
  "initialSupply": 1000000,
  "decimals": 18,
  "image": "ipfs://...",
  "description": "...",
  "website": "...",
  "twitter": "...",
  "poolAddress": "0x789..." // se criado no SushiSwap
  "createdAt": 1699699200,
  "transactionHash": "0xabc..."
}
```

---

## 7. Fluxo de Integração SushiSwap

### 7.1 Consulta GraphQL para Pool Info
```graphql
query GetPool($address: ID!) {
  pair(id: $address) {
    id
    token0 { id symbol }
    token1 { id symbol }
    reserve0
    reserve1
    totalSupply
    volumeUSD
    untrackedVolumeUSD
    txCount
  }
}
```

### 7.2 Cálculo de Price com @sushiswap/sdk
```typescript
import { SushiSwapV2Router02 } from '@sushiswap/sdk'

const quote = await router.getAmountOut(
  amount,
  tokenIn,
  tokenOut,
  chainId
)
```

### 7.3 Criação de Pool (Smart Contract)
```solidity
interface IUniswapV2Factory {
    function createPair(
        address tokenA,
        address tokenB
    ) external returns (address pair);
}

// No backend:
const tx = await factory.createPair(
  tokenAddress,
  wmatic.address
)
```

---

## 8. Deployment Strategy

### Fase 1: MVP
1. Deploy de Smart Contracts no Polygon Mainnet
2. Deploy de Frontend em Vercel
3. Deploy de Backend em Railway/Heroku
4. Firebase Firestore habilitado

### Fase 2: Otimizações
- IPFS para armazenar metadados/imagens
- The Graph para indexing eficiente
- CDN para frontend estático

### Segurança
- Auditar Smart Contracts (OpenZeppelin, Certora)
- Rate limiting na API
- Input validation rigorosa
- Web3 signature verification

---

## 9. Dependências Principais

### Frontend
```json
{
  "react": "^18.2.0",
  "vite": "^5.0.0",
  "ethers": "^6.0.0",
  "wagmi": "^2.0.0",
  "web3modal": "^3.0.0",
  "tailwindcss": "^3.3.0",
  "zustand": "^4.4.0"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "firebase-admin": "^12.0.0",
  "ethers": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.0"
}
```

### Smart Contracts
```json
{
  "@openzeppelin/contracts": "^5.0.0",
  "foundry": "latest"
}
```

---

## 10. Roadmap de Desenvolvimento

### Sprint 1 (Semana 1-2)
- [ ] Setup repositório GitHub
- [ ] Smart Contracts básicos (TokenFactory + SimpleToken)
- [ ] Testes dos contratos
- [ ] Deploy no testnet (Mumbai)

### Sprint 2 (Semana 3-4)
- [ ] Frontend inicial (formulário de criação)
- [ ] Integração MetaMask
- [ ] Backend API básica
- [ ] Database schema

### Sprint 3 (Semana 5-6)
- [ ] Dashboard de tokens
- [ ] Integração SushiSwap (GraphQL)
- [ ] Pool creation opcional
- [ ] Analytics básicas

### Sprint 4 (Semana 7-8)
- [ ] Testes end-to-end
- [ ] Auditoria de contratos
- [ ] Deploy em Polygon Mainnet
- [ ] Documentação completa
- [ ] Release v1.0
