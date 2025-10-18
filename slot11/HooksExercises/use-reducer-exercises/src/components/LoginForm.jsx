import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

const initial = {
  username: '',
  password: '',
  errors: {},
  show: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'change': {
      const { name, value } = action;
      return { ...state, [name]: value };
    }
    case 'setErrors':
      return { ...state, errors: action.errors || {} };
    case 'open':
      return { ...state, show: true };
    case 'close':
      return { ...initial }; // reset toàn bộ form khi đóng
    default:
      return state;
  }
}

export default function LoginForm({ onSubmit }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!state.username.trim()) errs.username = 'Username is required';
    if (!state.password.trim()) errs.password = 'Password is required';

    dispatch({ type: 'setErrors', errors: errs });

    if (Object.keys(errs).length === 0) {
      // Optional: callback ra ngoài
      if (typeof onSubmit === 'function') {
        onSubmit({ username: state.username, password: state.password });
      }
      dispatch({ type: 'open' });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.username}
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

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.password}
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

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal hiển thị khi đăng nhập thành công */}
      <Modal show={state.show} onHide={() => dispatch({ type: 'close' })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome, {state.username}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'close' })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
