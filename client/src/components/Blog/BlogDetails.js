import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext';
import CommentSection from './CommentSection';
import { AuthContext } from '../../context/AuthContext';
import { Container, Card, Button } from 'react-bootstrap';

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, deleteBlog } = useContext(BlogContext);
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundBlog = blogs.find(b => b._id === id);
    setBlog(foundBlog);
  }, [blogs, id]);

  const handleDelete = async () => {
    await deleteBlog(id);
    navigate('/posts');
  };

  if (!blog) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Card className="shadow mb-4">
        <Card.Body>
          <Card.Title className="text-center fw-bold">{blog.title}</Card.Title>
          <Card.Text>{blog.content}</Card.Text>
          <div className="d-flex justify-content-between mt-3">
            <Card.Text className="text-muted"><strong>Author:</strong> {blog.author.username}</Card.Text>
            <Card.Text className="text-muted"><strong>Published:</strong> {new Date(blog.dateCreated).toLocaleString()}</Card.Text>
          </div>
          {user && (user.userId === blog.author.userId || user.isAdmin) && (
            <div className="d-flex justify-content-between mt-4">
              <Link to={`/posts/edit/${id}`} className="btn btn-warning">Edit</Link>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
          )}
        </Card.Body>
      </Card>
      <CommentSection blogId={id} comments={blog.comments} />
    </Container>
  );
};

export default BlogDetails;
