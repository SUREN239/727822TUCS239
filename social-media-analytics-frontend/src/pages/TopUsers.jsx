import React from 'react'

export function TopUsers({ users }) {
  const topUsers = [...users].sort((a, b) => b.postCount - a.postCount).slice(0, 5)

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {topUsers.map(user => (
        <div 
          key={user.id} 
          className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105"
        >
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="mx-auto rounded-full w-24 h-24 mb-4 border-4 border-blue-500"
          />
          <h3 className="font-bold text-xl mb-2">{user.name}</h3>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <span className="block text-blue-600 font-semibold">{user.postCount}</span>
              <span className="text-gray-500">Posts</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}