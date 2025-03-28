import React from 'react'

export function TrendingPosts({ posts }) {
  const maxComments = Math.max(...posts.map(post => post.comments))
  const trendingPosts = posts.filter(post => post.comments === maxComments)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {trendingPosts.map(post => (
        <div 
          key={post.id} 
          className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
        >
          <div className="flex items-center mb-4">
            <img 
              src={`/api/placeholder/40/40?text=${post.username}`} 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-semibold">{post.username}</span>
          </div>
          
          <img 
            src={post.image} 
            alt="Trending Post" 
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          />
          
          <p className="mb-4">{post.content}</p>
          
          <div className="flex justify-between items-center">
            <div className="text-blue-600 font-bold">
              Comments: {post.comments}
            </div>
            <span className="text-gray-500 text-sm">
              {post.timestamp.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}