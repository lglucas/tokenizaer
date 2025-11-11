import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Page not found</p>
        <a href="/" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
          Go Home
        </a>
      </div>
    </div>
  )
}
