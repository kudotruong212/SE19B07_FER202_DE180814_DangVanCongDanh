import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert, Form, Spinner } from 'react-bootstrap';
import { useMotorbikes } from '../contexts/MotorbikeContext';
import { useCart } from '../contexts/CartContext';
import * as api from '../services/api';
import NavigationHeader from '../components/NavigationHeader';

const MotorbikeList = () => {
  const { motorbikes, loading, updateMotorbikeStock } = useMotorbikes();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // State cho search và sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Filter và sort motorbikes với useMemo
  const filteredAndSorted = useMemo(() => {
    let result = [...motorbikes];

    // Filter theo model
    if (searchTerm) {
      result = result.filter(m =>
        m.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort theo price
    if (sortOrder === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [motorbikes, searchTerm, sortOrder]);

  // Handle Add to Cart
  const handleAddToCart = async (motorbike) => {
    // Kiểm tra stock
    if (motorbike.stock <= 0) {
      alert('Out of stock!');
      return;
    }

    try {
      // Thêm vào cart context
      addToCart(motorbike);
      
      // Giảm stock trong JSON Server
      const newStock = motorbike.stock - 1;
      await api.updateMotorbike(motorbike.id, {
        ...motorbike,
        stock: newStock
      });
      
      // Cập nhật state
      await updateMotorbikeStock(motorbike.id, newStock);
      
      // Hiển thị success message
      setSuccessMessage(`${motorbike.model} has been added to your cart.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  // Handle View Cart button
  const handleViewCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading motorbikes...</p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
      <h1 className="mb-4">Motorbike List</h1>

      {/* Success message với View Cart button */}
      {successMessage && (
        <Alert variant="success" className="d-flex justify-content-between align-items-center">
          <span>{successMessage}</span>
          <Button variant="primary" size="sm" onClick={handleViewCart}>
            View Cart
          </Button>
        </Alert>
      )}

      {/* Search và Sort controls */}
      <div className="d-flex gap-3 mb-4">
        <Form.Control
          type="text"
          placeholder="Search by model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="">Sort by Price</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </Form.Select>
      </div>

      {/* Motorbike cards */}
      <Row>
        {filteredAndSorted.map(motorbike => (
          <Col key={motorbike.id} md={3} className="mb-4">
            <Card style={{ height: '100%' }}>
              <Card.Img
                variant="top"
                src={motorbike.image}
                alt={`${motorbike.brand} ${motorbike.model}`}
                style={{ height: '250px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/images/motorbikes/honda-winner.jpg';
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{motorbike.brand} {motorbike.model}</Card.Title>
                <div className="mb-2">
                  <Badge bg="info" className="me-2">Year: {motorbike.year}</Badge>
                  <Badge bg="success">Price: ${motorbike.price}</Badge>
                  <Badge bg="secondary" className="ms-2">Stock: {motorbike.stock}</Badge>
                </div>
                <div className="d-grid gap-2 mt-auto">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/view/${motorbike.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(motorbike)}
                    disabled={motorbike.stock <= 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default MotorbikeList;