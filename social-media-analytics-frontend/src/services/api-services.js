import axios from 'axios';

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Adjust to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// API service for social media-related calls
const SocialMediaService = {
  // Fetch top users
  async getTopUsers() {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching top users:', error);
      throw error;
    }
  },

  // Fetch posts (with type parameter)
  async getPosts(type = 'latest') {
    try {
      const response = await apiClient.get('/posts', {
        params: { type }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Optional: Add a method to handle post creation
  async createPost(postData) {
    try {
      const response = await apiClient.post('/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Error handling utility
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
  }
};

export default SocialMediaService;