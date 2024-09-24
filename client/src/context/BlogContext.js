import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const { authToken } = useContext(AuthContext);


  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const response = await axios.get('https://blog-app-1-9dqy.onrender.com/blogs/getBlogs');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const addBlog = async (blog) => {
    try {
      const response = await axios.post(
        'https://blog-app-1-9dqy.onrender.com/blogs/addBlog',
        blog,
        { headers: { Authorization: `Bearer ${authToken}` } } 
      );
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      return response.data._id;
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const editBlog = async (id, blog) => {
    try {
      const response = await axios.patch(
        `https://blog-app-1-9dqy.onrender.com/blogs/updateBlog/${id}`, 
        blog,
        { headers: { Authorization: `Bearer ${authToken}` } } 
      );
      setBlogs(blogs.map(b => (b._id === id ? response.data : b)));
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`https://blog-app-1-9dqy.onrender.com/blogs/deleteBlog/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const getMyBlogs = async () => {
    try {
      const response = await fetch('https://blog-app-1-9dqy.onrender.com/blogs/getMyBlogs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        return data.blogs; 
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching my blogs:', error);
      throw error; 
    }
  };


  return (
    <BlogContext.Provider value={{ blogs, getBlogs, addBlog, editBlog, deleteBlog, getMyBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};
