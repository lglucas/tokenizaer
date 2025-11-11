# Tokenizaer Backend

API Backend para Token Platform - Polygon + AI

## Setup

```bash
npm install
cp .env.example .env
# Edite .env com suas chaves
npm run dev
```

## Estrutura

```
src/
├── controllers/    # Request handlers
├── services/       # Business logic
│   ├── aiService.ts           # Claude AI integration
│   ├── blockchainService.ts   # Ethereum/Polygon calls
│   └── sushiswapService.ts    # SushiSwap GraphQL queries
├── routes/         # API routes
├── types/          # TypeScript interfaces
├── utils/          # Helper functions
└── index.ts        # Server entry point
```

## API Endpoints

### Tokens
- `POST /api/tokens/deploy` - Deploy novo token
- `GET /api/tokens/:address` - Info de um token
- `GET /api/tokens` - Listar tokens criados
- `GET /api/tokens/trending` - Top tokens

### AI
- `POST /api/ai/enhance` - Melhorar descrição do token com Claude
- `POST /api/ai/generate-names` - Gerar nomes sugeridos

### SushiSwap
- `GET /api/sushiswap/pools/:token` - Info do pool
- `GET /api/sushiswap/tokens/:token/price` - Preço atual

### Blockchain
- `GET /api/blockchain/gas-price` - Preço de gas
- `POST /api/blockchain/estimate-gas` - Estimar gas para criar token
