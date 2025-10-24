import React from 'react';
import { Row, Col, Card, ListGroup, Badge, ProgressBar } from 'react-bootstrap';

function Reports() {
  return (
    <div>
      <h1 className="mb-4">Báo Cáo & Phân Tích</h1>
      <p className="text-muted mb-4">Xem và phân tích các báo cáo chi tiết.</p>
      
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Báo Cáo Doanh Thu</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Doanh thu theo tháng</span>
                  <Badge bg="success">+15%</Badge>
                </div>
                <ProgressBar variant="success" now={75} className="mt-1" />
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Doanh thu theo sản phẩm</span>
                  <Badge bg="info">+8%</Badge>
                </div>
                <ProgressBar variant="info" now={60} className="mt-1" />
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Doanh thu theo khu vực</span>
                  <Badge bg="warning" text="dark">+3%</Badge>
                </div>
                <ProgressBar variant="warning" now={45} className="mt-1" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Báo Cáo Người Dùng</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <h3 className="text-dark">1,234</h3>
                <p className="text-muted">Tổng người dùng</p>
              </div>
              
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Người dùng mới</span>
                  <Badge bg="success">+156</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Hoạt động hôm nay</span>
                  <Badge bg="info">89%</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Phân tích hành vi</span>
                  <Badge bg="warning" text="dark">Đang phân tích</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0">Báo Cáo Hiệu Suất</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Hiệu suất trang web</span>
                  <Badge bg="success">95%</Badge>
                </div>
                <ProgressBar variant="success" now={95} className="mt-1" />
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Tốc độ tải trang</span>
                  <Badge bg="info">1.2s</Badge>
                </div>
                <ProgressBar variant="info" now={80} className="mt-1" />
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Lỗi hệ thống</span>
                  <Badge bg="danger">2</Badge>
                </div>
                <ProgressBar variant="danger" now={10} className="mt-1" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;
