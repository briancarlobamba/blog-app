import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const { authToken } = useContext(AuthContext);

  // Fetch blogs when the component mounts
  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const response = await axios.get('https://blog-app-r09n.onrender.com/blogs/getBlogs');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const addBlog = async (blog) => {
    try {
      const response = await axios.post(
        'https://blog-app-r09n.onrender.com/blogs/addBlog',
        blog,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      return response.data._id; // Return the new blog's ID
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };


  const editBlog = async (id, blog) => {
    try {
      const response = await axios.patch(
        `https://blog-app-r09n.onrender.com/blogs/updateBlog/${id}`,
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
      await axios.delete(`https://blog-app-r09n.onrender.com/blogs/deleteBlog/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, getBlogs, addBlog, editBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
