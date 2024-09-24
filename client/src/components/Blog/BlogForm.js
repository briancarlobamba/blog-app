import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext';
import { Container, Card, Button, Form } from 'react-bootstrap';

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
    let blogId;

    if (id) {
      await editBlog(id, blogData);
      blogId = id; 
    } else {
      blogId = await addBlog(blogData); 
    }

    navigate(`/posts/${blogId}`); 
  };

  const isFormValid = title.trim() && content.trim();  

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <Card.Title className="text-center fw-bold">{id ? 'Edit Blog' : 'New Blog'}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              placeholder="Enter blog title"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Content</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              required 
              placeholder="Write your blog content"
            />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100" 
            disabled={!isFormValid}  
          >
            Save
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default BlogForm;
