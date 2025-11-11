// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SimpleToken
 * @notice Implementação padrão de um token ERC-20 com suporte a decimals customizáveis
 * @dev Criado pela plataforma Token Factory do Stone Code
 */
contract SimpleToken is ERC20 {
    uint8 private _decimals;
    address public creator;
    string public tokenURI; // Metadados IPFS ou similar
    
    event TokenCreated(
        address indexed creator,
        string name,
        string symbol,
        uint256 initialSupply,
        uint8 decimals
    );

    /**
     * @dev Construtor do token
     * @param name Nome do token
     * @param symbol Símbolo do token
     * @param initialSupply Supply inicial (sem decimals)
     * @param decimalsParam Número de decimals (0-18)
     * @param _tokenURI URI dos metadados (IPFS hash ou URL)
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimalsParam,
        string memory _tokenURI
    ) ERC20(name, symbol) {
        require(decimalsParam <= 18, "Decimals must be <= 18");
        require(initialSupply > 0, "Initial supply must be > 0");
        
        _decimals = decimalsParam;
        creator = msg.sender;
        tokenURI = _tokenURI;
        
        // Mint do supply inicial com os decimals corretos
        uint256 supply = initialSupply * 10 ** uint256(decimalsParam);
        _mint(msg.sender, supply);
        
        emit TokenCreated(msg.sender, name, symbol, initialSupply, decimalsParam);
    }

    /**
     * @notice Retorna o número de decimals
     * @return Número de decimals
     */
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    /**
     * @notice Retorna a URI de metadados do token
     * @return URI dos metadados
     */
    function getTokenURI() external view returns (string memory) {
        return tokenURI;
    }

    /**
     * @notice Atualiza a URI de metadados (apenas o criador)
     * @param _newURI Nova URI
     */
    function setTokenURI(string memory _newURI) external {
        require(msg.sender == creator, "Only creator can update URI");
        tokenURI = _newURI;
    }
}
