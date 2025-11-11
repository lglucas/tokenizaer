import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'Tokenizaer API',
    version: '0.1.0',
    endpoints: {
      tokens: '/api/tokens',
      sushiswap: '/api/sushiswap',
      ai: '/api/ai',
    },
  })
})

// TODO: Importar e usar rotas
// import tokenRoutes from './routes/tokens'
// import sushiswapRoutes from './routes/sushiswap'
// import aiRoutes from './routes/ai'

// app.use('/api/tokens', tokenRoutes)
// app.use('/api/sushiswap', sushiswapRoutes)
// app.use('/api/ai', aiRoutes)

// Error handling
app.use((err: any, req: Request, res: Response) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`)
})

export default app
