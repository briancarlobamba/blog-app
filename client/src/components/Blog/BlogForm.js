import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext';

const BlogForm = () => {
  const { addBlog, editBlog, blogs } = useContext(BlogContext);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      const blogToEdit = blogs.find(blog => blog._id === id);
      if (blogToEdit) {
        setTitle(blogToEdit.title);
        setContent(blogToEdit.content);
      }
    }
  }, [id, blogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { title, content };

    if (id) {
      await editBlog(id, blogData);
    } else {
      await addBlog(blogData);
    }

    navigate('/');
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Blog' : 'New Blog'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
