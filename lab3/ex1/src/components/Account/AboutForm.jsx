import React from "react";
import { Form, Row, Col, Image } from "react-bootstrap";

export default function AboutForm({ values, errors, onChange, onAvatarChange }) {
  return (
    <>
      {/* Section title with icon and underline */}
      <div className="d-flex align-items-center section-title mb-3">
        <i className="bi bi-person-circle section-title__icon me-2" />
        <h5 className="m-0">About Information</h5>
      </div>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-with-icon">
              <i className="bi bi-person-fill label-icon" />
              First Name *
            </Form.Label>
            <Form.Control
              name="firstName"
              value={values.firstName}
              onChange={onChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-with-icon">
              <i className="bi bi-person-fill label-icon" />
              Last Name *
            </Form.Label>
            <Form.Control
              name="lastName"
              value={values.lastName}
              onChange={onChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="form-label-with-icon">
          <i className="bi bi-envelope-fill label-icon" />
          Email *
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label-with-icon">
          <i className="bi bi-telephone-fill label-icon" />
          Phone *
        </Form.Label>
        <Form.Control
          name="phone"
          value={values.phone}
          onChange={onChange}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label-with-icon">
          <i className="bi bi-123 label-icon" />
          Age *
        </Form.Label>
        <Form.Control
          type="number"
          name="age"
          placeholder="Enter your age"
          value={values.age}
          onChange={onChange}
          isInvalid={!!errors.age}
        />
        <Form.Control.Feedback type="invalid">
          {errors.age}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Avatar */}
      <Form.Group className="mb-3">
        <Form.Label className="form-label-with-icon">
          <i className="bi bi-person-badge-fill label-icon" />
          Avatar
        </Form.Label>

        <div className="d-flex align-items-center gap-3">
          {/* Preview circle */}
          <div className="avatar-preview">
            {values.avatarUrl ? (
              <Image src={values.avatarUrl} alt="avatar" roundedCircle fluid />
            ) : (
              <i className="bi bi-person" />
            )}
          </div>

          {/* File input */}
          <div className="flex-grow-1">
            <Form.Control
              type="file"
              accept="image/png,image/jpeg"
              onChange={onAvatarChange}
              isInvalid={!!errors.avatar}
            />
            <Form.Text muted>PNG/JPG ≤ 2MB</Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.avatar}
            </Form.Control.Feedback>
          </div>
        </div>
      </Form.Group>
    </>
  );
}
