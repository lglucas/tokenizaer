import React from 'react'

export default function Dashboard() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Tokens Created', value: '-' },
            { label: 'Total Liquidity', value: '-' },
            { label: 'Your Tokens', value: '-' },
            { label: 'Trading Volume (24h)', value: '-' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow">
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-center text-gray-500">
            Dashboard coming in Sprint 3...
          </p>
        </div>
      </div>
    </div>
  )
}
