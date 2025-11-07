//NavigationHeader.jsx - Component thanh điều hướng chung
// File này GIỮ NGUYÊN, chỉ thay đổi brand name nếu muốn
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const NavigationHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const fullName = user?.fullName || user?.username || 'User';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
            <Container>
                {/* 📝 THAY ĐỔI: Thay 'ItemManager' thành tên ứng dụng của bạn */}
                <Navbar.Brand href="/home">ItemManager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Navbar.Text className="me-3">
                            Signed in as: <strong>{fullName}</strong>
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

