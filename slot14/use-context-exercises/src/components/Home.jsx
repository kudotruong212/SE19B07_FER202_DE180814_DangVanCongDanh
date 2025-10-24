import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="py-4">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 text-dark mb-3">
            Chào Mừng Đến Với Trang Chủ
          </h1>
          <p className="lead text-muted">
            Khám phá các tính năng của React Router với Bootstrap
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="fs-1 mb-3 text-dark">■</div>
              <Card.Title>Sản Phẩm</Card.Title>
              <Card.Text>
                Khám phá danh sách sản phẩm của chúng tôi với dynamic routing
              </Card.Text>
              <Button variant="dark" href="/san-pham">
                Xem Sản Phẩm
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="fs-1 mb-3 text-dark">●</div>
              <Card.Title>Liên Hệ</Card.Title>
              <Card.Text>
                Thông tin liên hệ và cách thức liên lạc với chúng tôi
              </Card.Text>
              <Button variant="outline-dark" href="/lien-he">
                Liên Hệ Ngay
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="fs-1 mb-3 text-dark">▲</div>
              <Card.Title>Dashboard</Card.Title>
              <Card.Text>
                Quản trị hệ thống với nested routes và layout chuyên nghiệp
              </Card.Text>
              <Button variant="dark" href="/dashboard">
                Vào Dashboard
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
