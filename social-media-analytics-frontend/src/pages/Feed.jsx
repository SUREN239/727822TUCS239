import React from 'react'

export function Feed({ posts }) {
  return (
    <div className="grid gap-4">
      {posts.sort((a, b) => b.timestamp - a.timestamp).map(post => (
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
            alt="Post" 
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          />
          
          <p className="mb-4">{post.content}</p>
          
          <div className="flex justify-between text-gray-500">
            <span>Comments: {post.comments}</span>
            <span>{post.timestamp.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}