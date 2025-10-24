import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-white">
          React Router Demo
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link text-white ${isActive ? 'active bg-white text-dark' : ''}`
              }
            >
              Trang Chủ
            </NavLink>
            
            <NavLink 
              to="/san-pham"
              className={({ isActive }) => 
                `nav-link text-white ${isActive ? 'active bg-white text-dark' : ''}`
              }
            >
              Sản Phẩm
            </NavLink>
            
            <NavLink 
              to="/lien-he"
              className={({ isActive }) => 
                `nav-link text-white ${isActive ? 'active bg-white text-dark' : ''}`
              }
            >
              Liên Hệ
            </NavLink>
            
            <NavLink 
              to="/dashboard"
              className={({ isActive }) => 
                `nav-link text-white ${isActive ? 'active bg-white text-dark' : ''}`
              }
            >
              Dashboard
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
