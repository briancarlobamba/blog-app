import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { BlogContext } from '../../context/BlogContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { blogs, getBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      await getBlogs();
      setLoading(false);
    };
    fetchFeaturedPosts();
  }, [getBlogs]);

  useEffect(() => {
    if (blogs.length > 0) {
      const sortedBlogs = [...blogs].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      setFeaturedPosts(sortedBlogs.slice(0, 3));  // Get the three most recent blogs
    }
  }, [blogs]);

  return (
    <Container className="mt-5">
      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title className="display-4"><strong>Welcome to Blog App</strong></Card.Title>
          <Card.Text className="lead">
            Your go-to place for insightful articles and discussions.
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Featured Posts Section */}
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="justify-content-center mb-5 g-4">
          {featuredPosts.map(post => (
            <Col key={post._id} xs={12} sm={6} md={4}>
              <Card className="h-100 shadow">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-center">{post.title}</Card.Title>
                  <Card.Text className="text-muted text-center">{post.content.substring(0, 200)}...</Card.Text>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Card.Text className="mb-0"><strong>Author:</strong> {post.author.username}</Card.Text>
                    <Card.Text className="mb-0"><strong>Published:</strong> {new Date(post.dateCreated).toLocaleString()}</Card.Text>
                  </div>
                  <Link to={`/posts/${post._id}`} className="btn btn-primary mt-3">Read More</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Row className="justify-content-center">
        <Col xs={12} md={4} className="mb-3">
          <Link to="/posts">
            <Button variant="primary" className="w-100">View All Posts</Button>
          </Link>
        </Col>
        {user ? (
          <Col xs={12} md={4} className="mb-3">
            <Link to="/posts/new">
              <Button variant="success" className="w-100">Create New Post</Button>
            </Link>
          </Col>
        ) : (
          <>
            <Col xs={12} md={4} className="mb-3">
              <Link to="/login">
                <Button variant="success" className="w-100">Login</Button>
              </Link>
            </Col>
            <Col xs={12} md={4} className="mb-3">
              <Link to="/register">
                <Button variant="primary" className="w-100">Register</Button>
              </Link>
            </Col>
          </>
        )}
        {user && (
          <Col xs={12} md={4} className="mb-3">
            <Link to="/my-posts">
              <Button variant="primary" className="w-100">My Posts</Button>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
