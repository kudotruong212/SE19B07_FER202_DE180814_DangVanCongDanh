// src/components/AccountSearch.jsx
import React, { useState } from "react";
import { Card, Row, Col, Container, Form, InputGroup, Image } from "react-bootstrap";

const accounts = [
  { id: 1, username: "CongDanh", password: "secret1", avatar: "/Avatar/DE180814.jpg" },
  { id: 2, username: "KimThang",   password: "secret2", avatar: "/Avatar/DE180020.jpg" },
  { id: 3, username: "HongPhuc", password: "secret3", avatar: "/Avatar/DE190234.jpg" },
  { id: 4, username: "ThanhTai",  password: "secret4", avatar: "/Avatar/DE190491.jpg" },
];

export default function AccountSearch() {
  const [term, setTerm] = useState("");

  const filtered = accounts.filter(a =>
    a.username.toLowerCase().includes(term.trim().toLowerCase())
  );

  return (
    <Container className="py-4">
      <h3 className="mb-3">Tìm account theo username</h3>

      <InputGroup className="mb-4">
        <InputGroup.Text>@</InputGroup.Text>
        <Form.Control
          placeholder="Nhập username…"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </InputGroup>

      {filtered.length === 0 ? (
        <div className="text-muted text-center py-5">Không tìm thấy kết quả</div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {filtered.map(acc => (
            <Col key={acc.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex align-items-center gap-3">
                  <Image src={acc.avatar} roundedCircle width={56} height={56} alt={acc.username} />
                  <div>
                    <Card.Title className="mb-1">{acc.username}</Card.Title>
                    <Card.Text className="text-muted mb-0">
                      ID: {acc.id}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
