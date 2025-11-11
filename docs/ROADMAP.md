# Tokenizaer - Roadmap Detalhado

## Status Atual ✅

- [x] Documentação completa (PROJECT_SPEC.md, ARCHITECTURE.md, DEPLOYMENT.md)
- [x] Smart Contracts (TokenFactory + SimpleToken com testes completos)
- [x] Frontend scaffolding (React + TypeScript + Tailwind)
- [x] Backend scaffolding (Node.js + Express + Services)
- [x] Estrutura de integração com Claude AI
- [x] Estrutura de integração com SushiSwap GraphQL
- [x] Repositório GitHub público

---

## Sprint 1: Smart Contracts ✅ CONCLUÍDO

### Completado
- [x] `SimpleToken.sol` - ERC-20 padrão com metadados IPFS
- [x] `TokenFactory.sol` - Factory para criar tokens
- [x] Testes completos (Foundry)
- [x] Suporte a decimals customizáveis
- [x] Sistema de metadata no-chain

### Próximo Passo
→ **Deploy em Mumbai (testnet)** antes de prosseguir com Sprint 2

```bash
cd contracts
forge script script/Deploy.s.sol:DeployScript --rpc-url polygonMumbai --broadcast
```

---

## Sprint 2: Frontend - Token Creation Form 🔄 EM ANDAMENTO

### Tasks
- [ ] **MetaMask Integration**
  - [ ] Web3Modal setup
  - [ ] Wallet connection/disconnection
  - [ ] Account switching
  
- [ ] **Token Creation Form**
  - [ ] Form component com React Hook Form
  - [ ] Validação com Zod
  - [ ] Campos: Name, Symbol, Supply, Decimals
  - [ ] Preview do token

- [ ] **AI Enhancement Component**
  - [ ] Text area para description inicial
  - [ ] Chamada à API Claude
  - [ ] Exibição de sugestões melhoradas
  - [ ] Edit/approve flow

- [ ] **Gas Estimation**
  - [ ] Integração com BlockchainService
  - [ ] Exibição de gas price em tempo real
  - [ ] Estimativa de custo (USD)

- [ ] **Deploy Trigger**
  - [ ] Botão "Deploy Token"
  - [ ] Confirmação no MetaMask
  - [ ] Mostrar tx hash
  - [ ] Link para Polygonscan

---

## Sprint 3: Backend & SushiSwap Integration 🔄 PRÓXIMO

### Backend APIs
- [ ] `POST /api/tokens/deploy` - Criar token
- [ ] `GET /api/tokens/:address` - Info do token
- [ ] `GET /api/tokens/trending` - Top tokens
- [ ] `POST /api/ai/enhance` - Claude enhancement
- [ ] `GET /api/sushiswap/pools/:token` - Pool info

### SushiSwap Integration
- [ ] GraphQL queries para dados de pools
- [ ] Criação automática de pool WMATIC/Token
- [ ] Cálculo de preços em tempo real
- [ ] Volume e liquidez no dashboard

### Firebase/Database
- [ ] Setup Firebase Firestore
- [ ] Schema de tokens
- [ ] Indexing para queries eficientes
- [ ] Backup strategy

---

## Sprint 4: Dashboard & Polish 📊 REFINEMENT

### Dashboard Features
- [ ] Listar tokens criados por usuário
- [ ] Estatísticas: Total value, volume 24h
- [ ] Gráficos de preço (Recharts)
- [ ] Link para SushiSwap pools
- [ ] Compartilhar token nas redes sociais

### Performance & UX
- [ ] Lazy loading de componentes
- [ ] Otimização de bundle size
- [ ] Mobile responsiveness
- [ ] Dark mode (opcional)

### Testing & Deployment
- [ ] Testes unitários (Vitest)
- [ ] Testes E2E (Cypress)
- [ ] Deploy em staging (Vercel)
- [ ] QA e bug fixes

---

## Tasks Críticas para Começar Sprint 2

### 1. Instalar Dependências do Frontend
```bash
cd frontend
npm install
```

### 2. Setup de Ambiente
```bash
# Frontend .env.local
VITE_FACTORY_ADDRESS=0x... # após deploy em Mumbai
VITE_RPC_URL=https://rpc-mumbai.maticvigil.com
VITE_API_URL=http://localhost:3001

# Backend .env
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
TOKEN_FACTORY_ADDRESS=0x...
CLAUDE_API_KEY=sk-ant-... # obtenha em console.anthropic.com
```

### 3. Deploy Smart Contract em Mumbai
```bash
cd contracts
export PRIVATE_KEY=0x...
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url https://rpc-mumbai.maticvigil.com \
  --private-key $PRIVATE_KEY \
  --broadcast
```

### 4. Iniciar Backend em Dev
```bash
cd backend
npm install
npm run dev
```

### 5. Iniciar Frontend em Dev
```bash
cd frontend
npm install
npm run dev
```

---

## Decisões de Arquitetura

### AI Enhancement Flow
```
User Input: "Um cachorro fofo que late em português"
                    ↓
Backend: POST /api/ai/enhance
                    ↓
Claude API (Anthropic)
                    ↓
Response: {
  name: "Adorable Puppy",
  symbol: "PUPPY",
  description: "A cute token celebrating dogs...",
  imageURI: "cute-dog-png-generator",
  twitter: "@puppytoken"
}
                    ↓
Frontend: Mostrar sugestões, permitir edit
                    ↓
User aprova e deploya token
```

### SushiSwap Integration
```
Token Deployado ✅
        ↓
Criar Pool: WMATIC <-> NewToken
        ↓
Adicionar Liquidez Inicial (opcional)
        ↓
GraphQL Query para pool data
        ↓
Dashboard mostra preço, volume, liquidity
```

---

## Benchmarks & Métricas

### Performance Goals
- Home page: < 1s load time
- Token creation: < 3s form render
- AI enhancement: < 5s response
- Dashboard: < 2s para listar tokens

### On-chain Metrics
- Gas para deploy: ~300,000 (estimado)
- Custo em MATIC (a $1 = 150 MATIC): ~2-3 MATIC (~$0.03)
- Pool creation: ~150,000 gas

### User Metrics
- Target: 1000+ tokens criados em 3 meses
- Engagement: Dashboard engagement rate > 40%
- Retention: 30-day retention > 25%

---

## Checklist Final para Launch

### Antes de Mainnet
- [ ] Todos os testes passando (Smart Contracts)
- [ ] Testes E2E com MetaMask (Mumbai)
- [ ] Claude API testado com 10+ exemplos
- [ ] SushiSwap pool creation 100% funcional
- [ ] Dashboard com 5+ tokens
- [ ] Performance metrics atingidos
- [ ] Security audit (basic)
- [ ] Legal disclaimers visíveis
- [ ] GitHub documentação completa

### Segurança
- [ ] HTTPS em produção
- [ ] Rate limiting: 100 req/min por IP
- [ ] Input validation rigorosa
- [ ] CORS restrito a domínios permitidos
- [ ] Private keys em ambiente variables
- [ ] Firebase security rules

### Monitoring
- [ ] Sentry para error tracking
- [ ] LogRocket para session recording
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Gas price monitoring

---

## Links Úteis

| Recurso | Link |
|---------|------|
| Claude API | https://console.anthropic.com |
| Polygon Mumbai | https://faucet.polygon.technology/ |
| SushiSwap Docs | https://docs.sushi.com |
| Foundry Docs | https://book.getfoundry.sh |
| Vercel Docs | https://vercel.com/docs |
| Graph Studio | https://thegraph.com/studio |

---

## Contatos & Suporte

- **Documentação:** `/docs`
- **Issues:** GitHub Issues
- **Discussões:** GitHub Discussions
- **Email:** comercial@stonecode.com.br

---

**Próxima Etapa:** Deploy em Mumbai e começar Sprint 2 🚀
