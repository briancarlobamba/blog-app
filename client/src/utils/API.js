import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://blog-app-r09n.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// API Methods
export const getAllBlogs = () => api.get('/blogs/getBlogs');
export const getBlogById = (id) => api.get(`/blogs/getBlog/${id}`);
export const addBlog = (blogData) => api.post('/blogs/addBlog', blogData);
export const updateBlog = (id, blogData) => api.patch(`/blogs/updateBlog/${id}`, blogData);
export const deleteBlog = (id) => api.delete(`/blogs/deleteBlog/${id}`);

export const addComment = (id, comment) => api.patch(`/blogs/addComment/${id}`, { comment });
export const deleteComment = (id, commentId) => api.delete(`/blogs/deleteComment/${id}`, {
  data: { commentId }
});

// Authentication
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const registerUser = (userData) => api.post('/users/register', userData);

export default api;
