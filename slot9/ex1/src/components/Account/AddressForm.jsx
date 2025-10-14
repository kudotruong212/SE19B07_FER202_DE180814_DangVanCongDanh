import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function AddressForm({ values, errors, onChange, onPrevious, onFinish }) {
  return (
    <>
      <div className="d-flex align-items-center section-title mb-3">
        <i className="bi bi-geo-alt section-title__icon me-2" />
        <h5 className="m-0">Address Information</h5>
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="form-label-with-icon">
          <i className="bi bi-signpost-split-fill label-icon" />
          Street *
        </Form.Label>
        <Form.Control
          name="street"
          value={values.street}
          onChange={onChange}
          isInvalid={!!errors.street}
        />
        <Form.Control.Feedback type="invalid">
          {errors.street}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-with-icon">
              <i className="bi bi-buildings-fill label-icon" />
              City *
            </Form.Label>
            <Form.Control
              name="city"
              value={values.city}
              onChange={onChange}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-with-icon">
              <i className="bi bi-map-fill label-icon" />
              State *
            </Form.Label>
            <Form.Control
              name="state"
              value={values.state}
              onChange={onChange}
              isInvalid={!!errors.state}
            />
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-with-icon">
              <i className="bi bi-123 label-icon" />
              Zip Code *
            </Form.Label>
            <Form.Control
              name="zip"
              value={values.zip}
              onChange={onChange}
              isInvalid={!!errors.zip}
            />
            <Form.Control.Feedback type="invalid">
              {errors.zip}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-with-icon">
              <i className="bi bi-flag-fill label-icon" />
              Country *
            </Form.Label>
            <Form.Select
              name="country"
              value={values.country}
              onChange={onChange}
              isInvalid={!!errors.country}
            >
              <option value="">Select a country</option>
              <option>Vietnam</option>
              <option>USA</option>
              <option>Japan</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Previous + Finish buttons */}
      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="success" onClick={onFinish}>
          Finish
        </Button>
      </div>
    </>
  );
}
