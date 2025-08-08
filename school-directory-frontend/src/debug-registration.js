// Debug script to test the exact same API call the frontend makes
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance exactly like the frontend
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication API exactly like the frontend
const authApi = {
  register: (userData) => api.post('/auth/register', userData),
};

// Test function that mimics the exact frontend registration process
async function testFrontendRegistration() {
  console.log('🔍 Testing exact frontend registration process...');
  
  const formData = {
    username: 'frontendtest456',
    email: 'frontendtest@example.com',
    city: 'Delhi',
    password: 'password123',
    role: 'USER'
  };

  try {
    console.log('Making API call with data:', formData);
    
    const response = await authApi.register(formData);
    
    console.log('✅ Registration successful!');
    console.log('Response:', response.data);
    
  } catch (err) {
    console.error('❌ Registration failed!');
    console.error('Error message:', err.response?.data?.message || 'Registration failed. Please try again.');
    console.error('Full error:', err);
  }
}

testFrontendRegistration();
