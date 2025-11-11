# Tokenizaer Frontend

React + TypeScript + Web3 Frontend

## Setup

```bash
npm install
npm run dev
```

Acessar em `http://localhost:3000` (ou configurado no vite.config.ts)

## Estrutura

```
src/
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas principais
├── hooks/          # Custom React hooks
├── store/          # Estado global (Zustand)
├── services/       # API calls, blockchain
├── styles/         # CSS global
└── main.tsx        # Entry point
```

## Features (Sprint 2-4)

- [ ] MetaMask connection (Web3Modal)
- [ ] Token creation form
- [ ] AI enhancement (Claude API)
- [ ] Real-time gas estimation
- [ ] Dashboard com tokens criados
- [ ] SushiSwap pool info
- [ ] Trading charts

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- ethers.js / wagmi
- Zustand (state)
- React Hook Form (forms)
