// ItemDetail.jsx - Trang chi tiết item
// GENERIC TEMPLATE: Tùy chỉnh các field hiển thị theo entity của bạn
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Card, Badge, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useItems } from '../contexts/ItemContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';
import NotFound from '../components/NotFound';
import NavigationHeader from '../components/NavigationHeader';
import EditItemModal from '../components/EditItemModal';


const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, updateItemStock } = useItems();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  // Kiểm tra admin
  const isAdmin = user?.role === 'admin';
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State cho Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadItem = async () => {
      setLoading(true);
      try {
        const found = await api.getItemById(id);
        setItem(found);
      } catch (error) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  const handleAddToCart = async () => {
    if (!item || item.stock <= 0) {
      alert('Out of stock!');
      return;
    }

    try {
      addToCart(item);
      const newStock = item.stock - 1;
      await api.updateItem(item.id, {
        ...item,
        stock: newStock
      });
      await updateItemStock(item.id, newStock);
      setItem({ ...item, stock: newStock });
      // LƯU Ý: Thay "name" bằng field hiển thị của bạn
      alert(`${item.name} has been added to your cart.`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Handle Edit Item
  const handleEditItem = () => {
    setShowEditModal(true);
  };

  // Handle Edit Modal Success
  const handleEditSuccess = async () => {
    setShowEditModal(false);
    // Reload item data after successful edit
    setLoading(true);
    try {
      const found = await api.getItemById(id);
      setItem(found);
    } catch (error) {
      setItem(null);
    } finally {
      setLoading(false);
    }
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
            <p className="mt-3">Loading...</p>
          </div>
        </Container>
      </>
    );
  }

  if (!item) {
    return <NotFound />;
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate('/items')} className="mb-3">
        ← Back to List
      </Button>

      {/* Success message */}
      {successMessage && (
        <Alert variant="success" className="mb-3">
          {successMessage}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Row>
            <Col md={5}>
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid w-100"
                style={{ borderRadius: 8, objectFit: 'cover', maxHeight: '600px' }}
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            </Col>
            <Col md={7}>
              <h1>{item.name}</h1>
              {/* LƯU Ý: Tùy chỉnh các Badge và thông tin hiển thị theo field của entity bạn */}
              <div className="mb-3">
                <Badge bg="info" className="me-2">Category: {item.category}</Badge>
                <Badge bg="success" className="me-2">Price: ${item.price}</Badge>
                <Badge bg="secondary">Stock: {item.stock}</Badge>
              </div>
              <p className="lead">
                {item.description || 'A great item for your needs.'}
              </p>
              {/* LƯU Ý: Thêm các field khác bạn muốn hiển thị */}
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Stock:</strong> {item.stock}</p>
              <div className="d-flex gap-2 mt-4">
                {isAdmin && (
                  <Button
                    variant="warning"
                    onClick={handleEditItem}
                  >
                    Edit Item
                  </Button>
                )}
                <Button
                  variant="success"
                  onClick={handleAddToCart}
                  disabled={item.stock <= 0}
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

      {/* Edit Item Modal */}
      {item && (
        <EditItemModal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
          }}
          item={item}
          onSuccess={handleEditSuccess}
        />
      )}
    </Container>
    </>
  );
};

export default ItemDetail;