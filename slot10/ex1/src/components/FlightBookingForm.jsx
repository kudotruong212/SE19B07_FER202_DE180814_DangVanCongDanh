import React from "react";
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";

export default function FlightBookingForm() {
  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <Alert variant="warning" className="text-center fw-bold">
      </Alert>

      <h1 className="mb-4">Form đặt vé máy bay</h1>

      <Form>
        {/* === Họ tên === */}
        <Form.Group className="mb-3">
          <Form.Label>Họ tên</Form.Label>
          <InputGroup>
            <InputGroup.Text>👤</InputGroup.Text>
            <Form.Control type="text" placeholder="Họ tên" />
            <InputGroup.Text>vnd</InputGroup.Text>
          </InputGroup>
          <Form.Text muted>Phải nhập 5 ký tự, in hoa…</Form.Text>
        </Form.Group>

        {/* === Địa chỉ === */}
        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control type="text" placeholder="Nhập địa chỉ" />
          <Form.Text muted>Phải nhập 5 ký tự, in hoa…</Form.Text>
        </Form.Group>

        {/* === Đi từ & Đến === */}
        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label>Đi từ</Form.Label>
            <Form.Select>
              <option>Hà nội</option>
              <option>Đà Nẵng</option>
              <option>Hải Phòng</option>
              <option>TP.HCM</option>
              <option>Cần Thơ</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <Form.Label>Đến</Form.Label>
            <Form.Select>
              <option>Hà nội</option>
              <option>Đà Nẵng</option>
              <option>Hải Phòng</option>
              <option>TP.HCM</option>
              <option>Cần Thơ</option>
            </Form.Select>
          </Form.Group>
        </Row>

        {/* === Chọn chiều đi (khứ hồi) === */}
        <Form.Group className="mb-3">
          <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
          <div className="d-flex flex-column">
            <Form.Check type="checkbox" label="Đi" />
            <Form.Check type="checkbox" label="Về" />
          </div>
        </Form.Group>

        {/* === Nút Submit === */}
        <Button variant="primary" type="submit" className="w-100">
          Đặt vé
        </Button>
      </Form>
    </div>
  );
}
