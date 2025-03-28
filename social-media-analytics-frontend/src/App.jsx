import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Feed } from './pages/Feed'
import { TopUsers } from './pages/TopUsers'
import { TrendingPosts } from './pages/TrendingPosts'
import { generateMockData } from './utils/mockData'

function App() {
  const [mockData, setMockData] = useState(generateMockData())

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMockData(prevData => ({
        ...prevData,
        posts: [generateMockData().posts[0], ...prevData.posts].slice(0, 50)
      }))
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Social Media Analytics</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-200">Feed</Link>
              <Link to="/top-users" className="hover:text-blue-200">Top Users</Link>
              <Link to="/trending" className="hover:text-blue-200">Trending Posts</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto mt-8 p-4">
          <Routes>
            <Route 
              path="/" 
              element={<Feed posts={mockData.posts} />} 
            />
            <Route 
              path="/top-users" 
              element={<TopUsers users={mockData.users} />} 
            />
            <Route 
              path="/trending" 
              element={<TrendingPosts posts={mockData.posts} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App