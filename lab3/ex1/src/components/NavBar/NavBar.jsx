import React, { useState } from "react";
import { Navbar, Nav, Form, Button, Dropdown, InputGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSearch, BiUser, BiHeart, BiLock } from "react-icons/bi";

export default function NavBar() {
  const [quickSearch, setQuickSearch] = useState("");

  const handleQuickSearch = (e) => {
    e.preventDefault();
    console.log("Quick search:", quickSearch);
    // TODO: Implement quick search functionality
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🎬 MovieHub
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          
          <Form className="d-flex me-3" onSubmit={handleQuickSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Quick search..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                style={{ minWidth: "200px" }}
              />
              <Button variant="outline-light" type="submit">
                <BiSearch />
              </Button>
            </InputGroup>
          </Form>

          <Nav className="d-flex align-items-center">
            {/* Accounts Dropdown */}
            <Dropdown className="me-3">
              <Dropdown.Toggle variant="outline-light" id="accounts-dropdown">
                <BiUser className="me-1" />
                Accounts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/account">Build your Account</Dropdown.Item>
                <Dropdown.Item href="#manage-profiles">Manage Your Profiles</Dropdown.Item>
                <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Login Button */}
            <Button variant="outline-light" className="me-3">
              <BiLock className="me-1" />
              Login
            </Button>

            {/* Favourites Button */}
            <Button variant="outline-light">
              <BiHeart className="me-1" />
              Favourites
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
