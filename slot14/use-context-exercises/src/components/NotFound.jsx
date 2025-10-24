import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center border-0 shadow-lg">
            <Card.Body className="py-5">
              <div className="display-1 text-danger mb-4">404</div>
              <h1 className="h2 mb-3">Trang Không Tìm Thấy</h1>
              <p className="text-muted mb-4">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
              </p>
              <p className="text-muted mb-4">
                Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
              </p>
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleGoHome}
                >
                  🏠 Về Trang Chủ
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="lg"
                  onClick={() => window.history.back()}
                >
                  ← Quay Lại
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
