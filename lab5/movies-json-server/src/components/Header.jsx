import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Movie App</Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <span className="navbar-text text-white me-2">Xin chào, {user.name}</span>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Đăng xuất</Button>
            </>
          ) : (
            <Button variant="outline-light" size="sm" onClick={() => navigate('/login')}>Đăng nhập</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
