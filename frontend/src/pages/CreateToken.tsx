import React from 'react'

export default function CreateToken() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Create Your Token</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Form coming in Sprint 2 */}
          <div className="text-center text-gray-500">
            <p className="mb-4">Token creation form coming soon...</p>
            <p>Features:</p>
            <ul className="text-left max-w-sm mx-auto my-4">
              <li>✓ MetaMask integration</li>
              <li>✓ AI-powered token enhancement</li>
              <li>✓ Real-time gas estimation</li>
              <li>✓ Automatic SushiSwap pool creation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
