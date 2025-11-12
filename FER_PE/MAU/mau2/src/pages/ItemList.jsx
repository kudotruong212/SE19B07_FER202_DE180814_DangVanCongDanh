// ItemList.jsx - Trang danh sách items
// GENERIC TEMPLATE: Tùy chỉnh các field hiển thị (name, title, description, etc.) theo entity của bạn
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert, Form, Spinner } from 'react-bootstrap';
import { useItems } from '../contexts/ItemContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';
import NavigationHeader from '../components/NavigationHeader';
import EditItemModal from '../components/EditItemModal';

const ItemList = () => {
  const { items, loading, updateItemStock, fetchItems } = useItems();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Kiểm tra admin
  const isAdmin = user?.role === 'admin';
  
  // State cho search và sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // State cho Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter và sort items với useMemo
  // LƯU Ý: Thay "name" bằng field bạn muốn search (ví dụ: model, title, productName, etc.)
  const filteredAndSorted = useMemo(() => {
    let result = [...items];

    // Filter theo name (thay đổi field này theo entity của bạn)
    if (searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort theo price
    if (sortOrder === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, searchTerm, sortOrder]);

  // Handle Add to Cart
  const handleAddToCart = async (item) => {
    // Kiểm tra stock
    if (item.stock <= 0) {
      alert('Out of stock!');
      return;
    }

    try {
      // Thêm vào cart context
      addToCart(item);
      
      // Giảm stock trong JSON Server
      const newStock = item.stock - 1;
      await api.updateItem(item.id, {
        ...item,
        stock: newStock
      });
      
      // Cập nhật state
      await updateItemStock(item.id, newStock);
      
      // Hiển thị success message
      // LƯU Ý: Thay "name" bằng field hiển thị của bạn
      setSuccessMessage(`${item.name} has been added to your cart.`);
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

  // Handle Edit Item
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  // Handle Edit Modal Success
  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedItem(null);
    // Refresh items list
    fetchItems();
    setSuccessMessage('Item updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading items...</p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
      <h1 className="mb-4">Item List</h1>

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
          placeholder="Search by name"
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

      {/* Item cards */}
      <Row>
        {filteredAndSorted.map(item => (
          <Col key={item.id} md={3} className="mb-4">
            <Card style={{ height: '100%' }}>
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                style={{ height: '250px', objectFit: 'cover' }}
                onError={(e) => {
                  // Đặt default image khi lỗi
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.name}</Card.Title>
                {/* LƯU Ý: Tùy chỉnh các Badge hiển thị theo field của entity bạn */}
                <div className="mb-2">
                  <Badge bg="info" className="me-2">Category: {item.category}</Badge>
                  <Badge bg="success">Price: ${item.price}</Badge>
                  <Badge bg="secondary" className="ms-2">Stock: {item.stock}</Badge>
                </div>
                <div className="d-grid gap-2 mt-auto">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/view/${item.id}`)}
                  >
                    View Details
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="warning"
                      onClick={() => handleEditItem(item)}
                    >
                      Edit Item
                    </Button>
                  )}
                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock <= 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Item Modal */}
      {selectedItem && (
        <EditItemModal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onSuccess={handleEditSuccess}
        />
      )}
    </Container>
    </>
  );
};

export default ItemList;