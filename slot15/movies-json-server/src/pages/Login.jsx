import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Tài khoản hoặc mật khẩu sai!');
    }
  };

  return (
    <Container className="mt-4">
      <Card style={{maxWidth:'400px',margin:'0 auto'}}>
        <Card.Body>
          <h2 className="mb-3">Đăng nhập</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control type="text" value={username} onChange={e=>setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Đăng nhập</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Login;
