export function generateMockData() {
    const users = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      avatar: `/api/placeholder/100/100?text=U${i + 1}`,
      postCount: Math.floor(Math.random() * 50)
    }))
  
    const posts = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      userId: users[Math.floor(Math.random() * users.length)].id,
      username: `User ${Math.floor(Math.random() * 20) + 1}`,
      content: `This is a sample post content for post ${i + 1}`,
      image: `/api/placeholder/600/400?text=Post${i + 1}`,
      comments: Math.floor(Math.random() * 100),
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
    }))
  
    return { users, posts }
  }