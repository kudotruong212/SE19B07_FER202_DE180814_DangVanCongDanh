import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';

function Contact() {
  return (
    <Container className="py-4">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 text-dark mb-3">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="lead text-muted">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Header className="bg-dark text-white">
              <h4 className="mb-0">Thông Tin Liên Hệ</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="fs-3 me-3 text-dark">■</div>
                  <div>
                    <strong>Địa chỉ:</strong><br />
                    123 Đường ABC, Quận XYZ, TP.HCM
                  </div>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="fs-3 me-3 text-dark">●</div>
                  <div>
                    <strong>Điện thoại:</strong><br />
                    <a href="tel:0123456789" className="text-decoration-none text-dark">
                      0123 456 789
                    </a>
                  </div>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="fs-3 me-3 text-dark">▲</div>
                  <div>
                    <strong>Email:</strong><br />
                    <a href="mailto:contact@example.com" className="text-decoration-none text-dark">
                      contact@example.com
                    </a>
                  </div>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex align-items-center">
                  <div className="fs-3 me-3 text-dark">◆</div>
                  <div>
                    <strong>Website:</strong><br />
                    <a href="https://example.com" className="text-decoration-none text-dark" target="_blank" rel="noopener noreferrer">
                      www.example.com
                    </a>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Header className="bg-dark text-white">
              <h4 className="mb-0">Giờ Làm Việc</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><strong>Thứ 2 - Thứ 6</strong></span>
                  <Badge bg="dark">8:00 - 17:00</Badge>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><strong>Thứ 7</strong></span>
                  <Badge bg="secondary">8:00 - 12:00</Badge>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><strong>Chủ Nhật</strong></span>
                  <Badge bg="light" text="dark">Nghỉ</Badge>
                </ListGroup.Item>
              </ListGroup>
              
              <div className="mt-4">
                <h5>Hỗ Trợ Khách Hàng</h5>
                <p className="text-muted">
                  Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng 
                  giải đáp mọi thắc mắc và hỗ trợ bạn 24/7.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={8} className="mx-auto">
          <Card className="bg-light border-0">
            <Card.Body className="text-center">
              <h4 className="text-dark mb-3">Phản Hồi Nhanh Chóng</h4>
              <p className="mb-0">
                Chúng tôi cam kết phản hồi mọi yêu cầu của bạn trong vòng 24 giờ.
                Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
