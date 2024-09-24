import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Title className="text-center mb-4">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
              size="sm"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password"
              size="sm"
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!email || !password} className="w-100">Login</Button>
        </Form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register" className="link-primary">Register</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
