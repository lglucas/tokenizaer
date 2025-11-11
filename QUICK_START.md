# 🚀 Quick Start Guide

Guia rápido para começar a desenvolver o Tokenizaer.

---

## ⚡ 5 Minutos Setup

### 1. Clone o repositório
```bash
git clone https://github.com/lglucas/tokenizaer.git
cd tokenizaer
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# Abrir: http://localhost:5173
```

### 3. Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env com suas chaves
npm run dev
# Rodando em: http://localhost:3001
```

### 4. Smart Contracts
```bash
cd contracts
# Editar foundry.toml com RPC key
forge build      # Compilar
forge test -vv   # Testar
```

---

## 📚 Documentação Principal

- **[PROJECT_SPEC.md](./docs/PROJECT_SPEC.md)** - O que é o projeto
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Como funciona
- **[ROADMAP.md](./docs/ROADMAP.md)** - O que falta fazer
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Como fazer deploy
- **[BOOTSTRAP_SUMMARY.md](./BOOTSTRAP_SUMMARY.md)** - Resumo do que foi feito

---

## 🔑 Variáveis de Ambiente

### Frontend (.env.local)
```
VITE_FACTORY_ADDRESS=0x...
VITE_RPC_URL=https://polygon-rpc.com
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```
POLYGON_RPC_URL=https://polygon-rpc.com
TOKEN_FACTORY_ADDRESS=0x...
CLAUDE_API_KEY=sk-ant-...
```

### Smart Contracts (foundry.toml)
```
[profile.default.rpc_endpoints]
polygon = "https://polygon-rpc.com/"
```

---

## 🧪 Testes

```bash
# Frontend (em breve)
cd frontend
npm test

# Backend (em breve)
cd backend
npm test

# Smart Contracts
cd contracts
forge test -vv
```

---

## 🚀 Deploy

### Testnet (Mumbai)
```bash
cd contracts
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url https://rpc-mumbai.maticvigil.com \
  --private-key $PRIVATE_KEY \
  --broadcast
```

### Produção (Polygon Mainnet)
Ver [DEPLOYMENT.md](./docs/DEPLOYMENT.md) para detalhes.

---

## 📞 Precisa de Ajuda?

- **Docs:** `/docs` folder
- **GitHub Issues:** Abra uma issue
- **Email:** comercial@stonecode.com.br

---

## ✨ Stack Resumido

| O Quê | Tecnologia |
|-------|-----------|
| Frontend | React + Tailwind + Vite |
| Backend | Express + TypeScript |
| Blockchain | Polygon + Solidity |
| Web3 | Ethers.js + MetaMask |
| AI | Claude API |
| DEX | SushiSwap GraphQL |

---

**Próximo passo:** Ir para [ROADMAP.md](./docs/ROADMAP.md) para ver as tasks de Sprint 2!

🍣 Happy coding!
