import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Giả lập dữ liệu sản phẩm dựa trên ID
  const productData = {
    101: { 
      name: 'Sản phẩm A', 
      price: '100,000 VNĐ', 
      description: 'Mô tả chi tiết sản phẩm A với chất lượng cao và thiết kế hiện đại',
      category: 'Electronics',
      image: '■',
      features: ['Chất lượng cao', 'Thiết kế hiện đại', 'Bảo hành 12 tháng'],
      inStock: true
    },
    102: { 
      name: 'Sản phẩm B', 
      price: '200,000 VNĐ', 
      description: 'Sản phẩm B với nhiều tính năng đặc biệt và giá trị tốt',
      category: 'Fashion',
      image: '●',
      features: ['Thiết kế độc đáo', 'Chất liệu cao cấp', 'Phong cách hiện đại'],
      inStock: true
    },
    103: { 
      name: 'Sản phẩm C', 
      price: '300,000 VNĐ', 
      description: 'Sản phẩm C cao cấp với công nghệ tiên tiến và dịch vụ tốt nhất',
      category: 'Home',
      image: '▲',
      features: ['Công nghệ tiên tiến', 'Dịch vụ tốt nhất', 'Bảo hành 24 tháng'],
      inStock: false
    }
  };

  const product = productData[productId] || { 
    name: 'Sản phẩm không xác định', 
    price: 'N/A', 
    description: 'Không tìm thấy thông tin sản phẩm',
    category: 'Unknown',
    image: '?',
    features: [],
    inStock: false
  };

  const handleGoBack = () => {
    navigate('/san-pham');
  };

  return (
    <Container className="py-4">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4 text-dark mb-3">
            Chi Tiết Sản Phẩm
          </h1>
          <Badge bg="dark" className="fs-6">
            ID: {productId}
          </Badge>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="fs-1 mb-4">{product.image}</div>
              <Card.Title className="h2">{product.name}</Card.Title>
              <Badge bg="dark" className="mb-3">{product.category}</Badge>
              
              {product.inStock ? (
                <Alert variant="success" className="mt-3">
                  Còn hàng
                </Alert>
              ) : (
                <Alert variant="danger" className="mt-3">
                  Hết hàng
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-dark text-white">
              <h4 className="mb-0">Thông Tin Giá</h4>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="text-dark fw-bold">{product.price}</h2>
              </div>
              
              <h5>Mô tả sản phẩm:</h5>
              <p className="text-muted">{product.description}</p>
              
              {product.features.length > 0 && (
                <>
                  <h5>Tính năng nổi bật:</h5>
                  <ul className="list-unstyled">
                    {product.features.map((feature, index) => (
                      <li key={index} className="mb-2">
                        <Badge bg="light" text="dark" className="me-2">
                          {index + 1}
                        </Badge>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="text-center">
              <h4>Thông Tin Kỹ Thuật</h4>
              <p className="mb-0">
                Đây là trang chi tiết sản phẩm sử dụng <strong>Dynamic Routing</strong> với useParams hook.
                URL hiện tại: <code>/san-pham/{productId}</code>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-center">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleGoBack}
            className="me-3"
          >
            Quay Lại Danh Sách
          </Button>
          <Button 
            variant="primary" 
            size="lg"
            disabled={!product.inStock}
          >
            {product.inStock ? 'Thêm Vào Giỏ Hàng' : 'Hết Hàng'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
