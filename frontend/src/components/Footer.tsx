import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Tokenizaer 🍣</h3>
            <p className="text-sm">
              Create and deploy ERC-20 tokens on Polygon with AI power
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/create" className="hover:text-white">Create Token</a></li>
              <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#docs" className="hover:text-white">Documentation</a></li>
              <li><a href="#api" className="hover:text-white">API Docs</a></li>
              <li><a href="#github" className="hover:text-white">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">By Stone Code</h4>
            <p className="text-sm mb-4">
              <a href="https://stonecode.com.br" className="hover:text-white">
                stonecode.com.br
              </a>
            </p>
            <div className="flex gap-4">
              <a href="#twitter" className="hover:text-white">Twitter</a>
              <a href="#github" className="hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Tokenizaer by Stone Code. MIT License.</p>
        </div>
      </div>
    </footer>
  )
}
