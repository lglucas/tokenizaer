# Guia de Deploy - Tokenizaer

Instruções para fazer deploy da plataforma em produção.

---

## 1. Smart Contracts (Foundry)

### Pré-requisitos
- Conta Polygon com MATIC (testnet ou mainnet)
- Private key segura (use `.env`)
- Alchemy ou QuickNode RPC key

### Deploy em Mumbai (Testnet)

```bash
cd contracts

# Copiar .env.example e preencher
cp .env.example .env

# Carregar as variáveis de ambiente
export $(cat .env | xargs)

# Deploy
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $MUMBAI_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify \
  --etherscan-api-key $POLYGONSCAN_API_KEY
```

### Deploy em Polygon Mainnet

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $POLYGON_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify \
  --etherscan-api-key $POLYGONSCAN_API_KEY
```

**Salvar o endereço do TokenFactory em `.env` do backend!**

---

## 2. Backend (Node.js)

### Deploy em Railway

```bash
# Login no Railway
railway login

# Criar novo projeto
railway init

# Deploy
railway up

# Configurar variáveis de ambiente
railway variables add POLYGON_RPC_URL=https://polygon-rpc.com
railway variables add TOKEN_FACTORY_ADDRESS=0x...
railway variables add CLAUDE_API_KEY=sk-ant-...
```

### Deploy em Vercel (Serverless)

```bash
# Clonar o backend (estruturado como API serverless)
vercel login
vercel deploy --prod
```

### Variáveis de Ambiente Necessárias

```
POLYGON_RPC_URL=https://polygon-rpc.com
TOKEN_FACTORY_ADDRESS=0x...
CLAUDE_API_KEY=sk-ant-...
CORS_ORIGIN=https://tokenizaer.vercel.app
NODE_ENV=production
```

---

## 3. Frontend (React)

### Deploy em Vercel

```bash
cd frontend

# Deploy automático ao push em main
vercel --prod

# Ou manual
npm run build
vercel deploy --prod --prebuilt
```

### Configurar .env.production

```
VITE_API_URL=https://api.tokenizaer.com
VITE_FACTORY_ADDRESS=0x...
VITE_RPC_URL=https://polygon-rpc.com
```

### Deploy em Netlify

```bash
npm run build

# Netlify CLI
netlify deploy --prod --dir=dist
```

---

## 4. Checklist de Deploy

### Antes de Mainnet

- [ ] Contratos testados em Mumbai
- [ ] Backend rodando em staging
- [ ] Frontend conectado ao backend
- [ ] MetaMask integration testado
- [ ] Claude AI testado
- [ ] SushiSwap pools criadas com sucesso
- [ ] Todos os .env.example preenchidos
- [ ] Rate limiting configurado
- [ ] CORS permitido apenas para domínios esperados
- [ ] Logs monitorados (Sentry ou similar)

### Segurança

- [ ] Private keys em secure vault (não no git)
- [ ] HTTPS em todos os endpoints
- [ ] Rate limiting na API
- [ ] Input validation rigorosa
- [ ] Contratos auditados (fase 2)
- [ ] Disclaimer legal visível

### Monitoramento

```bash
# Sentry (error tracking)
npm install @sentry/react

# LogRocket (user sessions)
npm install logrocket

# Uptime monitoring
# Usar UptimeRobot ou similar
```

---

## 5. CI/CD (GitHub Actions)

### Arquivo: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Test Smart Contracts
        run: |
          cd contracts
          npm install
          forge test
      
      - name: Deploy Backend
        run: |
          cd backend
          npm install
          npm run build
          # Deploy to Vercel/Railway
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
          # Deploy to Vercel/Netlify
```

---

## 6. Domínio e DNS

### Configurar CNAME

```
tokenizaer.com     → api.tokenizaer.com (Backend)
tokenizaer.com     → tokenizaer.vercel.app (Frontend)
```

### SSL/TLS

- Vercel fornece SSL automático
- Railway fornece SSL automático
- Usar Cloudflare para cache/CDN (opcional)

---

## 7. Pós-Deploy

### Health Checks

```bash
# Backend
curl https://api.tokenizaer.com/health

# Frontend
https://tokenizaer.com
```

### Monitorar

- Logs do servidor
- Uso de RPC calls (rate limiting)
- Transações on-chain
- Erros de usuários

### Manutenção

```bash
# Atualizar contratos
# Apenas se necessário fazer upgrade

# Atualizar dependências
npm audit fix
npm update

# Database backups
# Se usar Firebase, ativar backups automáticos
```

---

## 8. Rollback

Se algo der errado:

```bash
# Backend em Vercel
vercel rollback

# Frontend em Vercel
vercel rollback

# Smart Contracts (cuidado!)
# Deployer pode usar Proxy pattern para upgrade
```

---

## Links Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Foundry Docs](https://book.getfoundry.sh)
- [Polygon Docs](https://docs.polygon.technology)
- [Sentry Docs](https://docs.sentry.io)
