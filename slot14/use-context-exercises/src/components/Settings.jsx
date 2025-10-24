import React from 'react';
import { Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';

function Settings() {
  return (
    <div>
      <h1 className="mb-4">Cài Đặt Hệ Thống</h1>
      <p className="text-muted mb-4">Quản lý cài đặt hệ thống và tài khoản.</p>
      
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Bảo Mật</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Thay đổi mật khẩu</span>
                  <Badge bg="success">Hoạt động</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Xác thực 2 yếu tố</span>
                  <Badge bg="warning" text="dark">Chưa bật</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Quản lý phiên đăng nhập</span>
                  <Badge bg="info">3 phiên</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Thông Báo</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Email thông báo</span>
                  <Badge bg="success">Bật</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Thông báo push</span>
                  <Badge bg="success">Bật</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Thông báo SMS</span>
                  <Badge bg="secondary">Tắt</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Giao Diện</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Chủ đề màu sắc</span>
                  <Badge bg="primary">Xanh</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Ngôn ngữ</span>
                  <Badge bg="info">Tiếng Việt</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Múi giờ</span>
                  <Badge bg="info">GMT+7</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Settings;
