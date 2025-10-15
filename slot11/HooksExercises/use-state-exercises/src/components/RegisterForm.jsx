// src/components/RegisterForm.jsx
import React, { useMemo, useState } from "react";
import {
  Button, Card, Container, Row, Col, Form,
  Modal, Toast, ToastContainer
} from "react-bootstrap";

const usernameRegex = /^(?!\s)([A-Za-z0-9._]){3,}(?<!\s)$/; // >=3, chữ/số/._, không khoảng trắng đầu/cuối
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/; // >=8, hoa, thường, số, ký tự đặc biệt

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!usernameRegex.test(form.username.trim())) {
      e.username = "Username ≥ 3 ký tự, chỉ gồm chữ/số/._ và không khoảng trắng đầu/cuối.";
    }
    if (!emailRegex.test(form.email.trim())) {
      e.email = "Email không hợp lệ.";
    }
    if (!passwordRegex.test(form.password)) {
      e.password = "Mật khẩu ≥ 8 ký tự, có hoa, thường, số và ký tự đặc biệt.";
    }
    if (form.confirmPassword !== form.password || form.confirmPassword === "") {
      e.confirmPassword = "Confirm không khớp password.";
    }
    return e;
  }, [form]);

  const isValid = useMemo(
    () => Object.keys(errors).length === 0 &&
          form.username && form.email && form.password && form.confirmPassword,
    [errors, form]
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setShowToast(true);
    setShowModal(true);
  };

  const onCancel = () => {
    setForm({ username: "", email: "", password: "", confirmPassword: "" });
    setTouched({});
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7} lg={6}>
          <Card className="shadow-sm">
            <Card.Header><h3 className="text-center mb-0">Đăng ký tài khoản</h3></Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit} noValidate>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={touched.username && !!errors.username}
                    placeholder="vd: phuc.nguyen"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={touched.email && !!errors.email}
                    placeholder="vd: you@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={touched.password && !!errors.password}
                    placeholder="********"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                    placeholder="Nhập lại mật khẩu"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" className="flex-grow-1" disabled={!isValid}>
                    Submit
                  </Button>
                  <Button type="button" variant="outline-secondary" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast success */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Register</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal hiển thị dữ liệu đã submit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="border-0">
            <Card.Body>
              <div className="mb-2"><strong>Username:</strong> {form.username}</div>
              <div className="mb-2"><strong>Email:</strong> {form.email}</div>
              <div className="text-muted" style={{ fontSize: 13 }}>
                (Mật khẩu không hiển thị vì lý do bảo mật)
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
