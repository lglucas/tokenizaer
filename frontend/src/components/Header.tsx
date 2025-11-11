import React from 'react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍣</span>
            <h1 className="text-3xl font-bold">Tokenizaer</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="/" className="hover:text-pink-200 transition">
              Home
            </a>
            <a href="/create" className="hover:text-pink-200 transition">
              Create Token
            </a>
            <a href="/dashboard" className="hover:text-pink-200 transition">
              Dashboard
            </a>
          </nav>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-pink-100 transition">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  )
}
