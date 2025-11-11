/**
 * Service para integração com Claude AI
 * Responsável por: melhorar descrições, gerar nomes, sugerir metadados
 */

import axios from 'axios'
import { TokenEnhanceRequest, TokenEnhanceResponse } from '../types/token'

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'

export class AIService {
  /**
   * Melhora uma descrição básica de token usando Claude
   */
  static async enhanceTokenDescription(
    request: TokenEnhanceRequest
  ): Promise<TokenEnhanceResponse> {
    if (!CLAUDE_API_KEY) {
      throw new Error('CLAUDE_API_KEY not configured')
    }

    const prompt = `
Você é um especialista em blockchain e marketing de tokens. Um usuário quer criar um memecoin com a seguinte descrição:

**Descrição básica:** ${request.basicDescription}
${request.targetAudience ? `**Público alvo:** ${request.targetAudience}` : ''}
${request.keyFeatures && request.keyFeatures.length > 0 ? `**Features principais:** ${request.keyFeatures.join(', ')}` : ''}

Baseado nisso, retorne um JSON com:
1. **name**: Nome melhorado para o token (máx 30 chars)
2. **symbol**: Símbolo (3-5 letras maiúsculas)
3. **description**: Descrição melhorada e atrativa (máx 200 chars)
4. **imageURI**: Sugestão de estilo da imagem (descrição breve)
5. **website**: Sugestão de domínio (ou null)
6. **twitter**: Sugestão de handle do Twitter (sem @)
7. **markdown**: Versão longa da descrição em markdown (máx 500 chars)

Retorne APENAS o JSON, sem explicações adicionais.
`

    try {
      const response = await axios.post(
        CLAUDE_API_URL,
        {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
        }
      )

      const content = response.data.content[0].text
      const parsed = JSON.parse(content)

      return {
        name: parsed.name || 'Token',
        symbol: parsed.symbol || 'TKN',
        description: parsed.description || '',
        imageURI: parsed.imageURI,
        website: parsed.website,
        twitter: parsed.twitter,
        markdown: parsed.markdown || '',
      }
    } catch (error) {
      console.error('Erro ao chamar Claude API:', error)
      throw new Error('Failed to enhance token description')
    }
  }

  /**
   * Gera sugestões de nomes para um token baseado em um prompt
   */
  static async generateTokenNames(description: string): Promise<string[]> {
    if (!CLAUDE_API_KEY) {
      throw new Error('CLAUDE_API_KEY not configured')
    }

    const prompt = `
Gere 5 nomes criativos e únicos para um memecoin baseado nesta descrição:
"${description}"

Retorne apenas uma lista JSON de nomes, sem explicações.
Exemplo: ["Doggo Coin", "Bark Token", "Puppy Moon", ...]
`

    try {
      const response = await axios.post(
        CLAUDE_API_URL,
        {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 256,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
        }
      )

      const content = response.data.content[0].text
      const names = JSON.parse(content)
      return Array.isArray(names) ? names : []
    } catch (error) {
      console.error('Erro ao gerar nomes:', error)
      throw new Error('Failed to generate token names')
    }
  }
}
