import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function Products() {
  // Danh sách 3 sản phẩm với ID: 101, 102, 103
  const products = [
    { 
      id: 101, 
      name: 'Sản phẩm A', 
      price: '100,000 VNĐ',
      description: 'Mô tả ngắn về sản phẩm A với chất lượng cao',
      category: 'Electronics',
      image: '■'
    },
    { 
      id: 102, 
      name: 'Sản phẩm B', 
      price: '200,000 VNĐ',
      description: 'Sản phẩm B với thiết kế hiện đại và tiện dụng',
      category: 'Fashion',
      image: '●'
    },
    { 
      id: 103, 
      name: 'Sản phẩm C', 
      price: '300,000 VNĐ',
      description: 'Sản phẩm C cao cấp với nhiều tính năng đặc biệt',
      category: 'Home',
      image: '▲'
    }
  ];

  return (
    <Container className="py-4">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 text-dark mb-3">
            Danh Sách Sản Phẩm
          </h1>
          <p className="lead text-muted">
            Khám phá các sản phẩm chất lượng cao của chúng tôi
          </p>
        </Col>
      </Row>
      
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} md={6} lg={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                <div className="fs-1 mb-3 text-dark">{product.image}</div>
                <Card.Title className="h4">{product.name}</Card.Title>
                <Badge bg="dark" className="mb-3">{product.category}</Badge>
                <Card.Text className="text-muted mb-3">
                  {product.description}
                </Card.Text>
                <div className="mb-3">
                  <h5 className="text-dark fw-bold">{product.price}</h5>
                </div>
                <Link to={`/san-pham/${product.id}`}>
                  <Button variant="dark" className="w-100">
                    Xem Chi Tiết
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="text-center">
              <h4>Thông Tin Thêm</h4>
              <p className="mb-0">
                Click vào "Xem Chi Tiết" để trải nghiệm dynamic routing với useParams hook.
                Mỗi sản phẩm sẽ có URL riêng biệt và có thể điều hướng programmatically.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
