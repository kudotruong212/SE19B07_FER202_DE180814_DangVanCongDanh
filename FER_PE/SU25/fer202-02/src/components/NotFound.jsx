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
              <p>The page or motorbike you're looking for doesn't exist.</p>
            </Alert>
            <Button variant="primary" onClick={() => navigate('/motorbikes')}>
              Back to Motorbike List
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default NotFound;