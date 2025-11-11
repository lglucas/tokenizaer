# 🍣 Tokenizaer - Token Platform by Stone Code

Crie e faça deploy de tokens ERC-20 no Polygon com **poder da AI**! 🤖

[![GitHub](https://img.shields.io/badge/github-lglucas/tokenizaer-blue)](https://github.com/lglucas/tokenizaer)
[![Polygon](https://img.shields.io/badge/blockchain-Polygon-purple)](https://polygon.technology)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ✨ Features

- 🚀 **One-Click Token Creation** - Deploy tokens ERC-20 em segundos
- 🤖 **AI-Powered Enhancement** - Integração com Claude para melhorar descrições de tokens
- 🍣 **SushiSwap Integration** - Crie liquidez automaticamente no SushiSwap
- 🔐 **Web3 Secure** - Autenticação via MetaMask, totalmente descentralizado
- 📊 **Real-time Analytics** - Dashboard com dados de liquidez e trading do SushiSwap
- 🌐 **Open Source** - Código 100% aberto e contribuívelArtigo

---

## 🏗️ Arquitetura

```
tokenizaer/
├── contracts/          # Smart Contracts Solidity (Foundry)
│   ├── src/
│   │   ├── TokenFactory.sol       # Factory para criar tokens
│   │   └── SimpleToken.sol        # Implementação ERC-20
│   └── test/
│       ├── TokenFactory.t.sol     # Testes da factory
│       └── SimpleToken.t.sol      # Testes do token
├── frontend/           # React App (Web3 UI)
├── backend/            # Node.js API (Express)
└── docs/              # Documentação e arquitetura
```

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Foundry (para smart contracts)
- MetaMask instalado no navegador

### 1. Clone o repositório
```bash
git clone https://github.com/lglucas/tokenizaer.git
cd tokenizaer
```

### 2. Setup Smart Contracts
```bash
cd contracts
npm install
forge build
forge test -vv
```

### 3. Deploy no Mumbai (Testnet)
```bash
cp .env.example .env
# Edite .env com suas chaves
forge script script/Deploy.s.sol:DeployScript --rpc-url polygonMumbai --broadcast
```

### 4. Deploy no Polygon (Mainnet)
```bash
forge script script/Deploy.s.sol:DeployScript --rpc-url polygon --broadcast
```

---

## 📖 Documentação

- [**Especificação do Projeto**](./docs/PROJECT_SPEC.md) - Visão e objetivos
- [**Arquitetura Técnica**](./docs/ARCHITECTURE.md) - Detalhes de implementação
- [**Smart Contracts**](./contracts/README.md) - Guia dos contratos

---

## 🎯 Sprint Planning

### Sprint 1: Smart Contracts ✅
- [x] TokenFactory.sol
- [x] SimpleToken.sol
- [x] Testes completos
- [ ] Deploy em Mumbai

### Sprint 2: Frontend
- [ ] React Setup
- [ ] MetaMask Integration
- [ ] Token Creation Form
- [ ] Dashboard básico

### Sprint 3: Backend & SushiSwap
- [ ] API Express
- [ ] Firebase Firestore
- [ ] SushiSwap Integration
- [ ] GraphQL queries

### Sprint 4: AI Enhancement & Refinement
- [ ] Claude API Integration
- [ ] AI-powered token descriptions
- [ ] End-to-end testing
- [ ] Mainnet deployment

---

## 🤖 AI Integration

A plataforma usa **Claude API** para:
- Analisar prompts do usuário
- Gerar descrições otimizadas de tokens
- Sugerir metadados e imagens
- Melhorar nomes e símbolos

**Exemplo de fluxo:**
```
User Input: "Um token de cachorro fofo"
    ↓
Claude API: Analisa e melhora
    ↓
Output: {
  name: "Adorable Puppy Coin",
  symbol: "PUPPY",
  description: "O token oficial para celebrar cães fofos...",
  imageURI: "ipfs://...",
  twitter: "@puppycoin"
}
```

---

## 🍣 SushiSwap Integration

Automaticamente:
1. Deploy token como ERC-20
2. Cria par WMATIC/Token no SushiSwap
3. Adiciona liquidez inicial
4. Retorna links do pool

Dashboard mostra:
- Preço em tempo real
- Liquidez total
- Volume de trades
- 24h change

---

## 🔐 Security

- Smart contracts usando OpenZeppelin
- Web3.js com MetaMask verification
- Input validation rigorosa
- Rate limiting na API
- HTTPS em produção

**Status de Auditoria:**
- [ ] Contratos auditados (Phase 2)
- [ ] Penetration testing (Phase 2)

---

## 📝 License

MIT © [Stone Code](https://stonecode.com.br)

---

## 🤝 Contributing

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

---

## 📞 Support

- **Discord**: Em breve
- **Twitter**: [@stonecode_br](https://twitter.com/stonecode_br)
- **Email**: [comercial@stonecode.com.br](mailto:comercial@stonecode.com.br)

---

## 🔗 Links Úteis

- [Polygon Documentation](https://docs.polygon.technology)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Foundry Book](https://book.getfoundry.sh)
- [MetaMask API](https://docs.metamask.io)
- [SushiSwap SDK](https://docs.sushi.com/docs)

---

Feito com ❤️ por [Stone Code](https://stonecode.com.br)
