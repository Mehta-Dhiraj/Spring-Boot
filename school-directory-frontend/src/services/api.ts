import axios from 'axios';
import { School, SearchFilters, LoginRequest } from '../types/School';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// School API endpoints
export const schoolApi = {
  getAllSchools: () => api.get('/schools'),
  getSchoolsByCity: (city: string) => api.get(`/schools/city/${city}`),
  searchSchools: (city: string, area: string) => api.get(`/schools/search?city=${city}&area=${area}`),
  searchSchoolsByName: (name: string) => api.get(`/schools/search/name?name=${name}`),
  getSchoolById: (id: number) => api.get(`/schools/${id}`),
  createSchool: (school: any) => api.post('/schools', school),
  updateSchool: (id: number, school: any) => api.put(`/schools/${id}`, school),
  deleteSchool: (id: number) => api.delete(`/schools/${id}`),
};

// Authentication API
export const authApi = {
  login: (credentials: { username: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  profile: () => api.get('/auth/profile'),
};

export default api;
