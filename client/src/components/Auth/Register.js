import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://blog-app-1-9dqy.onrender.com/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      navigate('/login');
    } else {
      console.error(data.message); 
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Title className="text-center mb-4">Register</Card.Title>
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
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
              placeholder="Choose a username"
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
          <Button variant="primary" type="submit" disabled={!email || !username || !password} className="w-100">Register</Button>
        </Form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login" className="link-primary">Login</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Register;
