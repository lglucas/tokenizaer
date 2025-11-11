/**
 * Service para interação com Polygon blockchain
 */

import { ethers } from 'ethers'

const RPC_URL = process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com'
const FACTORY_ADDRESS = process.env.TOKEN_FACTORY_ADDRESS || ''

// ABI simplificado do TokenFactory
const TOKEN_FACTORY_ABI = [
  'function createTokenSimple(string name, string symbol, uint256 initialSupply, uint8 decimals, string metadataURI) external returns (address)',
  'function getDeployedTokens() external view returns (address[])',
  'function getTokensByCreator(address creator) external view returns (address[])',
  'function getTokenInfo(address token) external view returns (address creator, uint256 createdAt, string metadataURI)',
  'function getTotalTokens() external view returns (uint256)',
  'event TokenDeployed(address indexed tokenAddress, address indexed creator, string name, string symbol, uint256 initialSupply, uint8 decimals, string metadataURI)',
]

export class BlockchainService {
  private static provider = new ethers.JsonRpcProvider(RPC_URL)

  /**
   * Estima gas para criar um token
   */
  static async estimateCreateTokenGas(
    name: string,
    symbol: string,
    initialSupply: string,
    decimals: number,
    metadataURI: string
  ): Promise<bigint> {
    if (!FACTORY_ADDRESS) {
      throw new Error('TOKEN_FACTORY_ADDRESS not configured')
    }

    const factory = new ethers.Contract(
      FACTORY_ADDRESS,
      TOKEN_FACTORY_ABI,
      this.provider
    )

    try {
      const gasEstimate = await factory.createTokenSimple.estimateGas(
        name,
        symbol,
        ethers.parseUnits(initialSupply, decimals),
        decimals,
        metadataURI
      )

      return gasEstimate
    } catch (error) {
      console.error('Erro ao estimar gas:', error)
      throw new Error('Failed to estimate gas')
    }
  }

  /**
   * Obtém preço atual de gas no Polygon
   */
  static async getGasPrice(): Promise<string> {
    try {
      const feeData = await this.provider.getFeeData()
      if (feeData.gasPrice) {
        return ethers.formatUnits(feeData.gasPrice, 'gwei')
      }
      return '0'
    } catch (error) {
      console.error('Erro ao obter gas price:', error)
      return '0'
    }
  }

  /**
   * Verifica se um token já existe no blockchain
   */
  static async tokenExists(tokenAddress: string): Promise<boolean> {
    try {
      const code = await this.provider.getCode(tokenAddress)
      return code !== '0x'
    } catch {
      return false
    }
  }

  /**
   * Obtém informações de um token ERC-20
   */
  static async getTokenInfo(tokenAddress: string) {
    const ERC20_ABI = [
      'function name() public view returns (string)',
      'function symbol() public view returns (string)',
      'function decimals() public view returns (uint8)',
      'function totalSupply() public view returns (uint256)',
    ]

    try {
      const token = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        this.provider
      )

      const [name, symbol, decimals, totalSupply] = await Promise.all([
        token.name(),
        token.symbol(),
        token.decimals(),
        token.totalSupply(),
      ])

      return {
        name,
        symbol,
        decimals,
        totalSupply: ethers.formatUnits(totalSupply, decimals),
      }
    } catch (error) {
      console.error('Erro ao obter info do token:', error)
      return null
    }
  }

  /**
   * Retorna o provider para operações avançadas
   */
  static getProvider() {
    return this.provider
  }
}
