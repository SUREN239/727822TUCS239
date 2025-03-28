import React from 'react'

export function TopUsers({ users }) {
  // Enhanced mock data with additional user information
  const mockUsers = [
    {
      id: 5,
      name: "Charlie Brown",
      postCount: 13,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      rank: 1
    },
    {
      id: 6,
      name: "Diana White",
      postCount: 12,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
      rank: 2
    },
    {
      id: 13,
      name: "Kathy Thomas",
      postCount: 10,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathy",
      rank: 3
    },
    {
      id: 14,
      name: "Liam Jackson",
      postCount: 10,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
      rank: 4
    },
    {
      id: 20,
      name: "Rachel Young",
      postCount: 10,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
      rank: 5
    }
  ]

  // Sort users by post count in descending order
  const topUsers = [...mockUsers].sort((a, b) => b.postCount - a.postCount)

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Top Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topUsers.map(user => (
          <div 
            key={user.id} 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center space-x-4"
          >
            <div className="flex-shrink-0">
              <img 
                src={user.avatar} 
                alt={`${user.name}'s avatar`} 
                className="w-16 h-16 rounded-full border-2 border-blue-500"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <span className="text-sm font-bold text-blue-600">#{user.rank}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600 mr-2">
                  {user.postCount} Posts
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
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

export default TopUsers