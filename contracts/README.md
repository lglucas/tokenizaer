# Token Platform - Smart Contracts

Contratos Solidity para criação e deploy de tokens ERC-20 na Polygon.

## Estrutura

```
contracts/
├── src/
│   ├── TokenFactory.sol      # Factory para criar tokens
│   ├── SimpleToken.sol       # Implementação padrão de token
│   └── interfaces/
│       └── ITokenFactory.sol # Interface do factory
├── test/
│   ├── TokenFactory.t.sol
│   └── SimpleToken.t.sol
└── foundry.toml
```

## Desenvolvimento

```bash
# Instalar dependências
forge install OpenZeppelin/openzeppelin-contracts

# Compilar
forge build

# Testes
forge test

# Deploy em testnet (Mumbai)
forge script script/Deploy.s.sol:DeployScript --rpc-url polygonMumbai --broadcast
```

## Smart Contracts

- **TokenFactory.sol**: Cria novos tokens ERC-20
- **SimpleToken.sol**: Implementação padrão com suporte a custom decimals
