import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Create Tokens in Seconds 🚀
          </h1>
          <p className="text-xl mb-8 text-purple-100">
            Deploy ERC-20 tokens on Polygon with AI-powered enhancement and instant SushiSwap integration
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:scale-105 transition">
            Start Creating →
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'One-Click Deploy',
                description: 'Deploy ERC-20 tokens in seconds on Polygon'
              },
              {
                icon: '🤖',
                title: 'AI Enhancement',
                description: 'Claude AI improves your token descriptions automatically'
              },
              {
                icon: '🍣',
                title: 'SushiSwap Ready',
                description: 'Automatic pool creation and liquidity management'
              },
              {
                icon: '🔐',
                title: 'Web3 Secure',
                description: 'MetaMask authentication, fully decentralized'
              },
              {
                icon: '📊',
                title: 'Real-time Analytics',
                description: 'Monitor liquidity, volume, and token metrics'
              },
              {
                icon: '🌐',
                title: 'Open Source',
                description: 'Fully open source, community-driven development'
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to launch your token?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of creators building on Polygon with Tokenizaer
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transition">
              Create Token
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition">
              View Docs
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
