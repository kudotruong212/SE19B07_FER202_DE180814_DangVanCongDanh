import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Card, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { useMotorbikes } from '../contexts/MotorbikeContext';
import { useCart } from '../contexts/CartContext';
import * as api from '../services/api';
import NotFound from '../components/NotFound';
import NavigationHeader from '../components/NavigationHeader';


const MotorbikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { motorbikes, updateMotorbikeStock } = useMotorbikes();
  const { addToCart } = useCart();
  
  const [motorbike, setMotorbike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMotorbike = async () => {
      try {
        const found = await api.getMotorbikeById(id);
        setMotorbike(found);
      } catch (error) {
        setMotorbike(null);
      } finally {
        setLoading(false);
      }
    };
    loadMotorbike();
  }, [id]);

  const handleAddToCart = async () => {
    if (!motorbike || motorbike.stock <= 0) {
      alert('Out of stock!');
      return;
    }

    try {
      addToCart(motorbike);
      const newStock = motorbike.stock - 1;
      await api.updateMotorbike(motorbike.id, {
        ...motorbike,
        stock: newStock
      });
      await updateMotorbikeStock(motorbike.id, newStock);
      setMotorbike({ ...motorbike, stock: newStock });
      alert(`${motorbike.model} has been added to your cart.`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading...</p>
          </div>
        </Container>
      </>
    );
  }

  if (!motorbike) {
    return <NotFound />;
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate('/motorbikes')} className="mb-3">
        ← Back to List
      </Button>

      <Card>
        <Card.Body>
          <Row>
            <Col md={5}>
              <img
                src={motorbike.image}
                alt={`${motorbike.brand} ${motorbike.model} - ${motorbike.year}`}
                className="img-fluid w-100"
                style={{ borderRadius: 8, objectFit: 'cover', maxHeight: '600px' }}
                onError={(e) => {
                  e.target.src = '/images/motorbikes/honda-winner.jpg';
                }}
              />
            </Col>
            <Col md={7}>
              <h1>{motorbike.brand} {motorbike.model}</h1>
              <div className="mb-3">
                <Badge bg="info" className="me-2">Year: {motorbike.year}</Badge>
                <Badge bg="success" className="me-2">Price: ${motorbike.price}</Badge>
                <Badge bg="secondary">Stock: {motorbike.stock}</Badge>
              </div>
              <p className="lead">
                A performance-focused motorbike suitable for daily use and racing enthusiasts.
              </p>
              <p><strong>Year:</strong> {motorbike.year}</p>
              <p><strong>Price:</strong> ${motorbike.price}</p>
              <div className="d-flex gap-2 mt-4">
                <Button
                  variant="success"
                  onClick={handleAddToCart}
                  disabled={motorbike.stock <= 0}
                >
                  Add to Cart
                </Button>
                <Button variant="primary" onClick={() => navigate('/cart')}>
                  View Cart
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};

export default MotorbikeDetail;