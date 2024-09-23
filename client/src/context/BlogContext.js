import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const { authToken } = useContext(AuthContext);

  const getBlogs = async () => {
    const response = await axios.get('http://localhost:4000/blogs/getBlogs');
    setBlogs(response.data.blogs);
  };

  const addBlog = async (blog) => {
    const response = await axios.post(
      'http://localhost:4000/blogs/addBlog',
      blog,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    setBlogs([...blogs, response.data]);
  };

  const editBlog = async (id, blog) => {
    const response = await axios.patch(
      `http://localhost:4000/blogs/updateBlog/${id}`,
      blog,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    setBlogs(blogs.map(b => (b._id === id ? response.data : b)));
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:4000/blogs/deleteBlog/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    setBlogs(blogs.filter(b => b._id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, getBlogs, addBlog, editBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
