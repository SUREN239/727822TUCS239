import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Function to generate mock data
function generateMockData() {
  const users = [
    { 
      id: 1, 
      name: "John Doe", 
      postCount: 8, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      bio: "Tech enthusiast and coffee lover"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      postCount: 15, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      bio: "Creative writer and digital nomad"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      postCount: 6, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      bio: "Fitness guru and entrepreneur"
    },
    { 
      id: 5, 
      name: "Charlie Brown", 
      postCount: 13, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      bio: "Nature photographer and traveler"
    },
    { 
      id: 6, 
      name: "Diana White", 
      postCount: 12, 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
      bio: "Design innovator and art curator"
    }
  ]

  const posts = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    username: users[Math.floor(Math.random() * users.length)].name,
    content: [
      "Exploring the future of technology! 🚀",
      "Just finished an amazing book that changed my perspective.",
      "Beautiful sunset at the beach today. Nature is breathtaking! 🌅",
      "Coding all night, fueled by creativity and coffee ☕",
      "Discovered a new hiking trail - absolutely stunning! 🏞️"
    ][Math.floor(Math.random() * 5)],
    comments: Math.floor(Math.random() * 20),
    likes: Math.floor(Math.random() * 100),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000))
  }))

  return { users, posts }
}

function TopUsers({ users }) {
  const topUsers = [...users].sort((a, b) => b.postCount - a.postCount)

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6 text-center">
        Top Contributors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topUsers.map(user => (
          <div 
            key={user.id} 
            className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={user.avatar} 
                alt={`${user.name}'s avatar`} 
                className="w-20 h-20 rounded-full border-4 border-purple-200"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.bio}</p>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-purple-600">
                  Posts: {user.postCount}
                </span>
                <div className="w-full bg-purple-200 rounded-full h-2.5 ml-4">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{width: `${(user.postCount / topUsers[0].postCount) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Feed({ posts }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-6 text-center">
        Community Feed
      </h2>
      <div className="space-y-6">
        {posts.sort((a, b) => b.timestamp - a.timestamp).map(post => (
          <div 
            key={post.id} 
            className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <h3 className="text-xl font-bold text-gray-800">{post.username}</h3>
                <p className="text-sm text-gray-500">
                  {post.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>💬 {post.comments} Comments</span>
              <span>❤️ {post.likes} Likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrendingPosts({ posts }) {
  const maxComments = Math.max(...posts.map(post => post.comments))
  const trendingPosts = posts.filter(post => post.comments === maxComments)

  return (
    <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600 mb-6 text-center">
        Trending Discussions
      </h2>
      <div className="space-y-6">
        {trendingPosts.map(post => (
          <div 
            key={post.id} 
            className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <h3 className="text-xl font-bold text-gray-800">{post.username}</h3>
                <p className="text-sm text-gray-500">
                  {post.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-600 font-semibold">
                  🔥 Trending Post
                </span>
                <span className="text-green-800">
                  💬 {post.comments} Comments
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-center mb-4">
              Social Pulse Analytics
            </h1>
            <nav className="flex justify-center space-x-8">
              <Link 
                to="/" 
                className="text-xl font-semibold text-purple-600 hover:text-blue-600 transition-colors"
              >
                Community Feed
              </Link>
              <Link 
                to="/top-users" 
                className="text-xl font-semibold text-purple-600 hover:text-blue-600 transition-colors"
              >
                Top Contributors
              </Link>
              <Link 
                to="/trending" 
                className="text-xl font-semibold text-purple-600 hover:text-blue-600 transition-colors"
              >
                Trending Discussions
              </Link>
            </nav>
          </header>

          <div className="grid grid-cols-1 gap-8">
            <Routes>
              <Route path="/" element={<Feed posts={mockData.posts} />} />
              <Route path="/top-users" element={<TopUsers users={mockData.users} />} />
              <Route path="/trending" element={<TrendingPosts posts={mockData.posts} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App