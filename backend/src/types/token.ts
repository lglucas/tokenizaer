export interface Token {
  id: string
  address: string
  creator: string
  name: string
  symbol: string
  decimals: number
  initialSupply: string
  totalSupply: string
  image?: string
  description?: string
  website?: string
  twitter?: string
  metadataURI?: string
  poolAddress?: string
  createdAt: number
  transactionHash: string
}

export interface TokenCreateRequest {
  name: string
  symbol: string
  initialSupply: string
  decimals: number
  description?: string
  image?: string
  website?: string
  twitter?: string
}

export interface TokenEnhanceRequest {
  basicDescription: string
  targetAudience?: string
  keyFeatures?: string[]
}

export interface TokenEnhanceResponse {
  name: string
  symbol: string
  description: string
  imageURI?: string
  website?: string
  twitter?: string
  markdown: string
}
