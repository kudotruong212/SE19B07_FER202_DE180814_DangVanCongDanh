import React from 'react';
import { Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';

function DashboardHome() {
  return (
    <div>
      <h1 className="mb-4">Dashboard Overview</h1>
      <p className="text-muted mb-4">Chào mừng bạn đến với trang quản trị!</p>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="fs-1 text-dark mb-3">■</div>
              <Card.Title>Số lượng người dùng</Card.Title>
              <h2 className="text-dark">1,234</h2>
              <Badge bg="success">+12%</Badge>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="fs-1 text-dark mb-3">●</div>
              <Card.Title>Doanh thu tháng này</Card.Title>
              <h2 className="text-dark">50M VNĐ</h2>
              <Badge bg="success">+8%</Badge>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="fs-1 text-dark mb-3">▲</div>
              <Card.Title>Sản phẩm đang bán</Card.Title>
              <h2 className="text-dark">156</h2>
              <Badge bg="info">+3</Badge>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body>
              <div className="fs-1 text-dark mb-3">◆</div>
              <Card.Title>Đơn hàng mới</Card.Title>
              <h2 className="text-dark">23</h2>
              <Badge bg="danger">+5</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Biểu Đồ Doanh Thu</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Tháng 1</span>
                  <span>75%</span>
                </div>
                <ProgressBar variant="primary" now={75} className="mb-2" />
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Tháng 2</span>
                  <span>60%</span>
                </div>
                <ProgressBar variant="success" now={60} className="mb-2" />
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Tháng 3</span>
                  <span>90%</span>
                </div>
                <ProgressBar variant="warning" now={90} className="mb-2" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Mục Tiêu Tháng</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="text-dark">85%</h3>
                <p className="text-muted">Hoàn thành mục tiêu</p>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Doanh số</span>
                  <Badge bg="success">Đạt</Badge>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Khách hàng mới</span>
                  <Badge bg="success">Đạt</Badge>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Sản phẩm mới</span>
                  <Badge bg="warning">Chưa đạt</Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardHome;
