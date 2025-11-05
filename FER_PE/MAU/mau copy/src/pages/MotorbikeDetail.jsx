import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Card, Badge, Row, Col } from 'react-bootstrap';
import { useMotorbikes } from '../contexts/MotorbikeContext';
import { useCart } from '../contexts/CartContext';
import * as motorbikeAPI from '../api/motorbikeAPI';
import NotFound from '../components/NotFound';

const MotorbikeDetail = () => {
  const { id } = useParams();  // Lấy ID từ URL (/view/:id)
  const navigate = useNavigate();
  const { motorbikes, updateMotorbikeStock } = useMotorbikes();
  const { addToCart } = useCart();
  
  const [motorbike, setMotorbike] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load motorbike theo ID khi component mount hoặc ID thay đổi
  useEffect(() => {
    const loadMotorbike = async () => {
      console.log('Loading motorbike with ID:', id);
      setLoading(true);
      
      try {
        // Thử tìm trong state trước (nhanh hơn)
        const foundInState = motorbikes.find(m => String(m.id) === String(id));
        
        if (foundInState) {
          console.log('Found in state:', foundInState);
          setMotorbike(foundInState);
          setLoading(false);
          return;
        }
        
        // Nếu không có trong state, gọi API
        console.log('Not found in state, fetching from API...');
        const found = await motorbikeAPI.getMotorbikeById(id);
        console.log('Found from API:', found);
        setMotorbike(found);
      } catch (error) {
        console.error('Error loading motorbike:', error);
        setMotorbike(null);  // Không tìm thấy
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadMotorbike();
    }
  }, [id, motorbikes]);

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (!motorbike || motorbike.stock <= 0) {
      alert('Out of stock!');
      return;
    }

    try {
      addToCart(motorbike);
      const newStock = motorbike.stock - 1;
      await motorbikeAPI.updateMotorbike(motorbike.id, {
        ...motorbike,
        stock: newStock
      });
      updateMotorbikeStock(motorbike.id, newStock);
      setMotorbike({ ...motorbike, stock: newStock });
      alert(`${motorbike.model} has been added to your cart.`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container className="mt-4">
        <p>Loading motorbike details...</p>
      </Container>
    );
  }

  // Not found - 404 handling
  if (!motorbike) {
    return <NotFound />;
  }

  return (
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
                alt={motorbike.model}
                className="img-fluid w-100"
                style={{ borderRadius: 8, objectFit: 'cover', maxHeight: '600px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
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
  );
};

export default MotorbikeDetail;