// NotFound.jsx - Component hiển thị khi không tìm thấy trang
// GENERIC TEMPLATE: Thay "items" và "Item" bằng route và entity của bạn
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import NavigationHeader from './NavigationHeader';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Card>
          <Card.Body className="text-center">
            <Alert variant="danger">
              <Alert.Heading>404 Not Found</Alert.Heading>
              {/* LƯU Ý: Thay "item" bằng entity của bạn */}
              <p>The page or item you're looking for doesn't exist.</p>
            </Alert>
            {/* LƯU Ý: Thay "/items" bằng route list của bạn */}
            <Button variant="primary" onClick={() => navigate('/items')}>
              Back to Item List
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default NotFound;