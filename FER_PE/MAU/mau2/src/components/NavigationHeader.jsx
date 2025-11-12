// NavigationHeader.jsx là component thanh điều hướng chung chứa thông tin đăng nhập và nút Logout
// GENERIC TEMPLATE: Thay "Item" và "Items" bằng tên entity của bạn
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const NavigationHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const username = user?.username || 'User';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
            <Container>
                {/* LƯU Ý: Thay "Item Shop" bằng tên app của bạn */}
                <Navbar.Brand as={Link} to="/items">Item Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* LƯU Ý: Thay "/items" và "Items" bằng route và label của bạn */}
                        <Nav.Link as={Link} to="/items">Items</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Navbar.Text className="me-3">
                            Signed in as: <strong>{username}</strong>
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