// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SimpleToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

/**
 * @title TokenFactory
 * @notice Factory para criar novos tokens ERC-20 na plataforma Stone Code
 * @dev Usa o padrão Clones para minimizar gas costs
 */
contract TokenFactory is Ownable {
    using Clones for address;

    // ============== STATE ==============
    
    address public tokenImplementation;
    address[] public deployedTokens;
    
    mapping(address => address) public tokenCreator;
    mapping(address => uint256) public tokenCreatedAt;
    mapping(address => string) public tokenMetadata; // JSON string com info adicionais

    // ============== EVENTS ==============

    event TokenDeployed(
        address indexed tokenAddress,
        address indexed creator,
        string name,
        string symbol,
        uint256 initialSupply,
        uint8 decimals,
        string metadataURI
    );

    event FactoryInitialized(address indexed implementation);
    event MetadataUpdated(address indexed token, string metadata);

    // ============== CONSTRUCTOR ==============

    /**
     * @dev Deploy a SimpleToken como implementation
     */
    constructor() {
        // Deploy a SimpleToken que será usada como implementation
        SimpleToken impl = new SimpleToken("IMPL", "IMPL", 1, 18, "");
        tokenImplementation = address(impl);
        emit FactoryInitialized(tokenImplementation);
    }

    // ============== PUBLIC FUNCTIONS ==============

    /**
     * @notice Cria um novo token ERC-20
     * @param name Nome do token
     * @param symbol Símbolo do token
     * @param initialSupply Supply inicial (sem decimals)
     * @param decimals Número de decimals (0-18)
     * @param metadataURI URI dos metadados (IPFS, Arweave, etc)
     * @return tokenAddress Endereço do token criado
     */
    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals,
        string memory metadataURI
    ) external returns (address tokenAddress) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(initialSupply > 0, "Supply must be > 0");
        require(decimals <= 18, "Decimals must be <= 18");

        // Clone do implementation
        tokenAddress = tokenImplementation.clone();

        // Inicializar o clone com os parâmetros
        SimpleToken(tokenAddress).constructor{gas: gasleft()}(
            name,
            symbol,
            initialSupply,
            decimals,
            metadataURI
        );

        // Registrar metadados
        deployedTokens.push(tokenAddress);
        tokenCreator[tokenAddress] = msg.sender;
        tokenCreatedAt[tokenAddress] = block.timestamp;
        tokenMetadata[tokenAddress] = metadataURI;

        emit TokenDeployed(
            tokenAddress,
            msg.sender,
            name,
            symbol,
            initialSupply,
            decimals,
            metadataURI
        );

        return tokenAddress;
    }

    /**
     * @notice Cria um token sem usar clones (mais simples, mais gas)
     * @dev Versão simplificada que não usa Clones pattern
     */
    function createTokenSimple(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals,
        string memory metadataURI
    ) external returns (address tokenAddress) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(initialSupply > 0, "Supply must be > 0");
        require(decimals <= 18, "Decimals must be <= 18");

        // Deploy novo token direto
        SimpleToken newToken = new SimpleToken(
            name,
            symbol,
            initialSupply,
            decimals,
            metadataURI
        );

        tokenAddress = address(newToken);

        // Registrar
        deployedTokens.push(tokenAddress);
        tokenCreator[tokenAddress] = msg.sender;
        tokenCreatedAt[tokenAddress] = block.timestamp;
        tokenMetadata[tokenAddress] = metadataURI;

        emit TokenDeployed(
            tokenAddress,
            msg.sender,
            name,
            symbol,
            initialSupply,
            decimals,
            metadataURI
        );

        return tokenAddress;
    }

    // ============== VIEW FUNCTIONS ==============

    /**
     * @notice Retorna todos os tokens criados
     * @return Array com endereços de todos os tokens
     */
    function getDeployedTokens() external view returns (address[] memory) {
        return deployedTokens;
    }

    /**
     * @notice Retorna tokens criados por um usuário específico
     * @param creator Endereço do criador
     * @return Array com endereços dos tokens
     */
    function getTokensByCreator(address creator) 
        external 
        view 
        returns (address[] memory) 
    {
        uint256 count = 0;
        
        // Contar tokens do criador
        for (uint256 i = 0; i < deployedTokens.length; i++) {
            if (tokenCreator[deployedTokens[i]] == creator) {
                count++;
            }
        }

        // Criar array com os tokens
        address[] memory tokens = new address[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < deployedTokens.length; i++) {
            if (tokenCreator[deployedTokens[i]] == creator) {
                tokens[index] = deployedTokens[i];
                index++;
            }
        }

        return tokens;
    }

    /**
     * @notice Retorna informações sobre um token
     * @param token Endereço do token
     * @return creator Endereço do criador
     * @return createdAt Timestamp de criação
     * @return metadataURI URI dos metadados
     */
    function getTokenInfo(address token) 
        external 
        view 
        returns (
            address creator,
            uint256 createdAt,
            string memory metadataURI
        ) 
    {
        return (
            tokenCreator[token],
            tokenCreatedAt[token],
            tokenMetadata[token]
        );
    }

    /**
     * @notice Retorna o número total de tokens criados
     * @return Total de tokens
     */
    function getTotalTokens() external view returns (uint256) {
        return deployedTokens.length;
    }

    /**
     * @notice Retorna informações paginadas de tokens
     * @param offset Índice inicial
     * @param limit Número de tokens a retornar
     * @return tokens Array com endereços dos tokens
     * @return total Total de tokens
     */
    function getTokensPaginated(uint256 offset, uint256 limit)
        external
        view
        returns (address[] memory tokens, uint256 total)
    {
        total = deployedTokens.length;
        require(offset < total, "Offset out of bounds");

        uint256 end = offset + limit;
        if (end > total) {
            end = total;
        }

        tokens = new address[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            tokens[i - offset] = deployedTokens[i];
        }

        return (tokens, total);
    }

    // ============== ADMIN FUNCTIONS ==============

    /**
     * @notice Atualiza o endereço da implementation (admin only)
     * @param _newImplementation Novo endereço
     */
    function setImplementation(address _newImplementation) external onlyOwner {
        require(_newImplementation != address(0), "Invalid address");
        tokenImplementation = _newImplementation;
    }
}
