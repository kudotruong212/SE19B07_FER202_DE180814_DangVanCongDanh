import React, { useReducer, useMemo } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

// Regex helpers
const isEmail = (v) => /\S+@\S+\.[A-Za-z]{2,}/.test(v);
const isUsername = (v) => /^[A-Za-z0-9._]{3,}$/.test(v.trim());
const isStrongPassword = (v) =>
  /[A-Z]/.test(v) &&
  /[a-z]/.test(v) &&
  /\d/.test(v) &&
  /[^A-Za-z0-9]/.test(v) &&
  v.length >= 8;

// Validation helper using current form state
const validate = (field, value, currentForm) => {
  switch (field) {
    case 'username':
      if (!value.trim()) return 'Username is required';
      if (!isUsername(value))
        return '≥ 3 chars, letters/numbers/._ only, no spaces';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!isEmail(value)) return 'Invalid email format';
      return '';
    case 'password':
      if (!value) return 'Password is required';
      if (!isStrongPassword(value))
        return '≥ 8 chars, include upper, lower, number, special';
      return '';
    case 'confirm':
      if (!value) return 'Please confirm password';
      if (value !== currentForm.password) return 'Passwords do not match';
      return '';
    default:
      return '';
  }
};

const initialState = {
  form: {
    username: '',
    email: '',
    password: '',
    confirm: '',
  },
  errors: {},
  showModal: false,
  showToast: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'change': {
      const { name, value } = action;
      const nextForm = { ...state.form, [name]: value };
      const fieldError = validate(name, value, nextForm);
      const nextErrors = { ...state.errors, [name]: fieldError };
      // Keep confirm error in sync when password changes
      if (name === 'password' && nextForm.confirm) {
        nextErrors.confirm = validate('confirm', nextForm.confirm, nextForm);
      }
      return { ...state, form: nextForm, errors: nextErrors };
    }
    case 'setErrors':
      return { ...state, errors: action.errors || {} };
    case 'submit': {
      const newErrors = {};
      Object.keys(state.form).forEach((field) => {
        const err = validate(field, state.form[field], state.form);
        if (err) newErrors[field] = err;
      });
      if (Object.keys(newErrors).length === 0) {
        return { ...state, errors: {}, showModal: true, showToast: true };
      }
      return { ...state, errors: newErrors };
    }
    case 'cancel':
      return { ...initialState };
    case 'hideToast':
      return { ...state, showToast: false };
    default:
      return state;
  }
}

function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Derive form validity from current form values
  const formErrors = useMemo(() => {
    const e = {};
    Object.keys(state.form).forEach((field) => {
      const err = validate(field, state.form[field], state.form);
      if (err) e[field] = err;
    });
    return e;
  }, [state.form]);

  const isValid = Object.keys(formErrors).length === 0;

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Sign Up</h3>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch({ type: 'submit' });
                }}
              >
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.form.username}
                    onChange={(e) =>
                      dispatch({
                        type: 'change',
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                    isInvalid={!!state.errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={state.form.email}
                    onChange={(e) =>
                      dispatch({
                        type: 'change',
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                    isInvalid={!!state.errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.form.password}
                    onChange={(e) =>
                      dispatch({
                        type: 'change',
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                    isInvalid={!!state.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={state.form.confirm}
                    onChange={(e) =>
                      dispatch({
                        type: 'change',
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                    isInvalid={!!state.errors.confirm}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" disabled={!isValid} className="w-100">
                    Submit
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() => dispatch({ type: 'cancel' })}
                    className="w-100"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Toast
        show={state.showToast}
        onClose={() => dispatch({ type: 'hideToast' })}
        delay={2000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          minWidth: 220,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto text-success">Success</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>
      <Modal show={state.showModal} onHide={() => dispatch({ type: 'cancel' })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><strong>Username:</strong> {state.form.username}</p>
              <p><strong>Email:</strong> {state.form.email}</p>
              <p><strong>Password:</strong> {state.form.password}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'cancel' })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SignUpForm;

