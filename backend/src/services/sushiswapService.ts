/**
 * Service para interação com SushiSwap
 * Responsável por: consultar dados de pools, liquidity, volume
 */

import axios from 'axios'

const SUSHISWAP_GRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/sushiswap/polygon-exchange'

interface PoolData {
  id: string
  token0: { symbol: string }
  token1: { symbol: string }
  reserve0: string
  reserve1: string
  totalSupply: string
  volumeUSD: string
  txCount: string
}

export class SushiSwapService {
  /**
   * Consulta dados de um pool específico no SushiSwap
   */
  static async getPoolData(poolAddress: string): Promise<PoolData | null> {
    const query = `
      query GetPool($id: ID!) {
        pair(id: $id) {
          id
          token0 { id symbol }
          token1 { id symbol }
          reserve0
          reserve1
          totalSupply
          volumeUSD
          txCount
        }
      }
    `

    try {
      const response = await axios.post(SUSHISWAP_GRAPH_URL, {
        query,
        variables: { id: poolAddress.toLowerCase() },
      })

      if (response.data.errors) {
        console.error('GraphQL error:', response.data.errors)
        return null
      }

      return response.data.data.pair
    } catch (error) {
      console.error('Erro ao consultar SushiSwap:', error)
      return null
    }
  }

  /**
   * Busca pools que contêm um token específico
   */
  static async searchTokenPools(
    tokenAddress: string,
    limit: number = 10
  ): Promise<PoolData[]> {
    const query = `
      query SearchTokenPools($token: ID!, $first: Int!) {
        pairs(first: $first, where: { or: [{ token0: $token }, { token1: $token }] }) {
          id
          token0 { id symbol }
          token1 { id symbol }
          reserve0
          reserve1
          totalSupply
          volumeUSD
          txCount
        }
      }
    `

    try {
      const response = await axios.post(SUSHISWAP_GRAPH_URL, {
        query,
        variables: {
          token: tokenAddress.toLowerCase(),
          first: limit,
        },
      })

      if (response.data.errors) {
        console.error('GraphQL error:', response.data.errors)
        return []
      }

      return response.data.data.pairs || []
    } catch (error) {
      console.error('Erro ao buscar pools:', error)
      return []
    }
  }

  /**
   * Calcula preço de um token baseado no SushiSwap pool
   */
  static calculateTokenPrice(
    reserve0: string,
    reserve1: string,
    decimals0: number,
    decimals1: number
  ): number {
    try {
      const r0 = BigInt(reserve0) / BigInt(10 ** decimals0)
      const r1 = BigInt(reserve1) / BigInt(10 ** decimals1)
      return Number(r1) / Number(r0)
    } catch {
      return 0
    }
  }
}
