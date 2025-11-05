import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { useMotorbikes } from '../contexts/MotorbikeContext';
import { useCart } from '../contexts/CartContext';
import * as motorbikeAPI from '../api/motorbikeAPI';

const MotorbikeList = () => {
  const { motorbikes, loading, updateMotorbikeStock } = useMotorbikes();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // State cho search và sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Filter và sort motorbikes với useMemo (tối ưu performance)
  const filteredAndSorted = useMemo(() => {
    if (!motorbikes || motorbikes.length === 0) {
      return [];
    }
    let result = [...motorbikes];

//   /* 
//       cách 1:
//       if (searchTerm && searchTerm.trim()) {
//       const searchLower = searchTerm.toLowerCase().trim();
//       result = result.filter(m => {
//         // Search trong brand
//         const brandMatch = m.brand && m.brand.toLowerCase().includes(searchLower);
        
//         // Search trong model
//         const modelMatch = m.model && m.model.toLowerCase().includes(searchLower);
        
//         // Search trong year (convert sang string)
//         const yearMatch = m.year && String(m.year).includes(searchLower);
        
//         // Search trong price (convert sang string)
//         const priceMatch = m.price && String(m.price).includes(searchLower);
        
//         // Search trong stock (convert sang string)
//         const stockMatch = m.stock && String(m.stock).includes(searchLower);
        
//         // Trả về true nếu match BẤT KỲ field nào
//         return brandMatch || modelMatch || yearMatch || priceMatch || stockMatch;
//       });
//     }
// */
    // 1. FILTER - Search TẤT CẢ các trường dữ liệu
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(m => {
        // Tạo một chuỗi chứa tất cả các giá trị để search
        const searchableText = [
          m.brand,
          m.model,
          String(m.year || ''),
          String(m.price || ''),
          String(m.stock || '')
        ]
          .filter(Boolean) // Bỏ null/undefined
          .join(' ')
          .toLowerCase();
        
        return searchableText.includes(searchLower);
      });
    }

    // 2. SORT theo price (Sort by price - 0.5 marks)
    if (sortOrder === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [motorbikes, searchTerm, sortOrder]);

  // Handle Add to Cart (1 mark)
   const handleAddToCart = async (motorbike) => {
    // Kiểm tra stock
    if (motorbike.stock <= 0) {
      alert('Out of stock!');
      return;
    }

    try {
      // 1. Giảm stock trong STATE (tạm thời, chưa update JSON Server)
      const newStock = motorbike.stock - 1;
      updateMotorbikeStock(motorbike.id, newStock);
      
      // 2. Thêm vào cart context
      addToCart(motorbike);
      
      // 3. Hiển thị success message
      setSuccessMessage(`${motorbike.model} has been added to your cart.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert(`Failed to add to cart: ${error.message}`);
    }
  };
  // Handle View Cart button
  const handleViewCart = () => {
    navigate('/cart');
  };

  // Loading state
  if (loading) {
    return (
      <Container className="mt-4">
        <p>Loading motorbikes...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Motorbike List</h1>

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
      <div className="d-flex gap-3 mb-4 justify-content-center">
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
          <Col key={motorbike.id} md={3} className="mb-3">
            <Card style={{ height: '100%' }}>
              <Card.Img
                variant="top"
                src={motorbike.image}
                style={{ height: '250px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{motorbike.brand} {motorbike.model}</Card.Title>
                <div className="mb-3">
                  <div> <strong>Year:</strong> {motorbike.year}</div>
                  <div> <strong>Price:</strong> ${motorbike.price}</div>
                  <div> <strong>Stock:</strong> {motorbike.stock}</div>
                </div>
                <div className="d-flex gap-2 mt-auto">
                  <Button
                    variant="primary"
                    className="flex-fill"
                    onClick={() => navigate(`/view/${motorbike.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="success"
                    className="flex-fill"
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
  );
};

export default MotorbikeList;