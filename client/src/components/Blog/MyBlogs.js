import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BlogContext } from '../../context/BlogContext';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const { getMyBlogs } = useContext(BlogContext);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const blogs = await getMyBlogs();
        setMyBlogs(blogs);
      } catch (error) {
        console.error("Error fetching my blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyBlogs();
    }
  }, [user, getMyBlogs]);

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" />
    </div>
  );

  const sortedMyBlogs = [...myBlogs].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">My Blogs</h1>
      <Row className="justify-content-center g-4">
        {sortedMyBlogs.length === 0 ? (
          <Col xs={12} className="text-center">
            <p>No blogs found.</p>
          </Col>
        ) : (
          sortedMyBlogs.map(blog => (
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

export default MyBlogs;
