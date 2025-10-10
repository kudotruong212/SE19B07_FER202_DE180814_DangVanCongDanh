import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function AccountStep({ values, errors, onChange }) {
  return (
    <>
      <div className="d-flex align-items-center section-title mb-3">
        <i className="bi bi-shield-lock-fill section-title__icon me-2" />
        <h5 className="m-0">Account Information</h5>
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="form-label-with-icon">
          <i className="bi bi-person-lines-fill label-icon" />
          Username *
        </Form.Label>
        <Form.Control
          name="username"
          value={values.username}
          onChange={onChange}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-with-icon">
              <i className="bi bi-lock-fill label-icon" />
              Password *
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-with-icon">
              <i className="bi bi-lock-fill label-icon" />
              Confirm Password *
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="form-label-with-icon">
          <i className="bi bi-question-circle-fill label-icon" />
          Secret Question *
        </Form.Label>
        <Form.Select
          name="question"
          value={values.question}
          onChange={onChange}
          isInvalid={!!errors.question}
        >
          <option value="">Select a question</option>
          <option>What is your first pet's name?</option>
          <option>What is your favorite color?</option>
          <option>What city were you born in?</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.question}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label-with-icon">
          <i className="bi bi-chat-square-dots-fill label-icon" />
          Answer *
        </Form.Label>
        <Form.Control
          name="answer"
          value={values.answer}
          onChange={onChange}
          isInvalid={!!errors.answer}
        />
        <Form.Control.Feedback type="invalid">
          {errors.answer}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
