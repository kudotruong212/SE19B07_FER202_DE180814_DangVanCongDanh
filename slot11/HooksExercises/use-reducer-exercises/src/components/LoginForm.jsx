import React, { useReducer, useRef } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import ConfirmModalComponent from './ConfirmModalComponent';
import { useToast } from './ToastComponent';

const initial = {
  username: '',
  password: '',
  errors: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'change': {
      const { name, value } = action;
      return { ...state, [name]: value };
    }
    case 'setErrors':
      return { ...state, errors: action.errors || {} };
    case 'reset':
      return { ...initial }; // reset toàn bộ form
    default:
      return state;
  }
}

export default function LoginForm({ onSubmit }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const confirmRef = useRef();
  const pendingActionRef = useRef();
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!state.username.trim()) errs.username = 'Username is required';
    if (!state.password.trim()) errs.password = 'Password is required';

    dispatch({ type: 'setErrors', errors: errs });

    if (Object.keys(errs).length === 0) {
      // Define the action to execute when user confirms
      pendingActionRef.current = async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Call external callback if provided
        if (typeof onSubmit === 'function') {
          onSubmit({ username: state.username, password: state.password });
        }
        
        // Show success toast
        showToast(`Chào mừng ${state.username}! Đăng nhập thành công.`, 'success', 3000);
        
        // Reset form after successful login
        dispatch({ type: 'reset' });
      };

      // Show confirmation modal
      confirmRef.current?.showConfirm({
        title: 'Xác nhận đăng nhập',
        message: `Bạn có muốn đăng nhập với tài khoản "${state.username}"?`,
        confirmText: 'Đăng nhập',
        cancelText: 'Hủy',
        variant: 'success'
      });
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

      {/* Confirm Modal Component */}
      <ConfirmModalComponent
        ref={confirmRef}
        onConfirm={async () => {
          if (pendingActionRef.current) {
            await pendingActionRef.current();
            pendingActionRef.current = null;
          }
        }}
        onCancel={() => {
          pendingActionRef.current = null;
        }}
      />
    </Container>
  );
}
