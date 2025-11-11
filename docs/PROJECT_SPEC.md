# Stone Code - Token Platform MVP
## Especificação do Projeto

**Versão:** 0.1  
**Data:** 11 de Novembro de 2025  
**Empresa:** Stone Code (stonecode.com.br)  

---

## 1. Visão do Projeto

Criar uma **plataforma simplificada para criação e deploy de tokens** dentro de uma rede blockchain, permitindo que a Stone Code e seus clientes gerem e gerenciem tokens de forma rápida e eficiente.

### MVP: Memecoins
O MVP focará em **memecoins** como prova de conceito, validando o fluxo completo de criação → configuração → deploy.

### Fases Futuras
- Tokens de utilidade (utility tokens)
- Tokens de segurança (security tokens)
- Tokens de ativos reais (real-world assets/RWA)
- Integração com a estratégia de tokenização de ativos minerários

---

## 2. Objetivos do MVP

- [ ] Interface intuitiva para criação de tokens
- [ ] Deploy automático na blockchain (inicialmente Ethereum/Polygon/similar)
- [ ] Configurações básicas: nome, símbolo, supply inicial, decimals
- [ ] Wallet integration para deploy
- [ ] Dashboard de tokens criados
- [ ] Histórico de transações

---

## 3. Perguntas e Discussões Necessárias

### 3.1 Tecnologia Blockchain
- ✅ **Blockchain primária:** Polygon (mainnet)
- ✅ **MVP com uma chain apenas:** Polygon
- ✅ **Integração com SushiSwap:** Aproveitar API e SDK do SushiSwap para liquidez e funcionalidades avançadas

### 3.2 Autenticação e Segurança
- ✅ **Autenticação:** Web3 apenas, via MetaMask
- ✅ **KYC/AML:** Não necessário para MVP (open source, público)
- ✅ **Usuários iniciais:** Entusiastas e comunidade (repositório público no GitHub)

### 3.3 Modelo de Negócio
- ✅ **Monetização:** Sem custos para Stone Code (open source gratuito)
- ✅ **Custos de gas:** Repassados 100% ao usuário que criar o token

### 3.4 Compliance e Regulação
- ✅ **Open Source:** Disponível publicamente no GitHub
- ✅ **Responsabilidade do usuário:** Disclaimer de risco e responsabilidades legais
- ℹ️ **Considerar** disclaimers de que é responsabilidade do criador estar em conformidade com regulações locais

### 3.5 Escopo Técnico - DEFINIÇÕES
- **Frontend:** React com Web3.js/Ethers.js + MetaMask integration
- **Backend:** Node.js + Express (ou serverless functions)
- **Smart Contracts:** Solidity (ERC-20 Token Factory)
- **Banco de dados:** Firebase/Supabase (rastreamento de tokens criados, apenas metadados)
- **SushiSwap Integration:** APIs e SDK para adicionar liquidez, swap, analytics

### 3.6 Features de Token
- ✅ **Standard inicial:** ERC-20
- **Capabilities:** Nome, símbolo, supply inicial, decimals
- 🔄 **Fase 2:** Mint/Burn/Pause capabilities
- 🔄 **Fase 2:** Supply dinâmica

---

## 4. Integração SushiSwap 🍣

### 4.1 O Que Vamos Usar

**SushiSwap Kashi & AMM:**
- **Token Factory:** Deploy direto com suporte nativo a Polygon
- **Liquidity Pool Creation:** Criar automaticamente par WMATIC/NewToken
- **SushiSwap API/SDK:** 
  - `sushiswap-sdk`: Roteamento de trades, cálculos de output
  - `@sushiswap/tines`: Advanced routing
  - `GraphQL API`: Histórico de pools, volume, analytics

### 4.2 Fluxo com SushiSwap

```
1. Usuário cria token via nossa plataforma
2. Token é deployado como ERC-20 no Polygon
3. Opção: Criar automaticamente pool WMATIC/NewToken no SushiSwap
4. Listar token na plataforma com:
   - Link para Polygon scanner
   - Link para pool SushiSwap
   - Volume, liquidez, price charts
5. Usuário pode fazer swap direto (powered by SushiSwap)
```

### 4.3 Features Habilitadas
- ✅ Deploy com suporte a criação de pool automática
- ✅ Dashboard mostrando liquidez e preço do token (via SushiSwap)
- ✅ Integração de swap widget (SushiSwap Widget ou Custom)
- 🔄 **Fase 2:** Farm/Staking integration
- 🔄 **Fase 2:** Analytics avançadas

---

## 5. Arquitetura Proposta (Rascunho)

```
┌─────────────────────────────────────────┐
│        Frontend (SPA/Web App)           │
│  - Create Token Form                    │
│  - Dashboard                            │
│  - Wallet Connection                    │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│    Backend API (Node.js/Python?)        │
│  - Token Creation Logic                 │
│  - Deploy Management                    │
│  - History & Analytics                  │
│  - User Management                      │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│   Smart Contracts (Solidity)            │
│  - Token Factory                        │
│  - ERC-20 Implementation                │
│  - Deployment Management                │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│     Blockchain Network (RPC)            │
│  - Token Deployment                     │
│  - Transaction Execution                │
└─────────────────────────────────────────┘
```

---

## 5. Próximas Etapas

1. **Responder as perguntas acima**
2. **Definir tech stack específico**
3. **Criar documento de arquitetura detalhada**
4. **Esboçar wireframes/mockups**
5. **Estimar timeline e recursos**
6. **Iniciar setup do repositório e ambiente**

---

## 6. Notas

- Este documento será atualizado conforme avançarmos na discussão
- Manter alinhamento com a visão maior da Stone Code (tokenização de ativos minerários)
- Considerar escalabilidade desde o início
