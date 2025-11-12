// NavigationHeader.jsx là component thanh điều hướng chung chứa thông tin đăng nhập và nút Logout
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const NavigationHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const fullName = user?.fullName || user?.username || 'Administrator';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/home">Course Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                            href="/home" 
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/home');
                            }}
                            className="text-white"
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link 
                            href="/users" 
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/users');
                            }}
                            className="text-white"
                        >
                            User Management
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto d-flex align-items-center">
                        <Navbar.Text className="me-3 d-flex align-items-center">
                            {user?.avatar && (
                                <img 
                                    src={user.avatar} 
                                    alt={`${fullName} avatar`}
                                    className="rounded-circle me-2"
                                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.src = '/logo192.png';
                                    }}
                                />
                            )}
                            <span>
                                Signed in as: <strong>{fullName}</strong>
                            </span>
                        </Navbar.Text>
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationHeader;
