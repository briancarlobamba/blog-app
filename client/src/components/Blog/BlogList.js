import React, { useEffect, useContext, useState } from 'react';
import { BlogContext } from '../../context/BlogContext';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const { blogs, getBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      await getBlogs();
      setLoading(false);
    };
    fetchBlogs();
  }, [getBlogs]);

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" />
    </div>
  );

  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <Row className="justify-content-center g-4">
        {sortedBlogs.length === 0 ? (
          <Col xs={12} className="text-center">
            <p>No blogs found.</p>
          </Col>
        ) : (
          sortedBlogs.map(blog => (
            <Col key={blog._id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-center">{blog.title}</Card.Title>
                  <Card.Text className="text-muted text-center">{blog.content.substring(0, 200)}...</Card.Text>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Card.Text className="mb-0"><strong>Author:</strong> {blog.author.username}</Card.Text>
                    <Card.Text className="mb-0"><strong>Published:</strong> {new Date(blog.dateCreated).toLocaleString()}</Card.Text>
                  </div>
                  <Link to={`/posts/${blog._id}`} className="btn btn-primary mt-3">Read More</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default BlogList;
