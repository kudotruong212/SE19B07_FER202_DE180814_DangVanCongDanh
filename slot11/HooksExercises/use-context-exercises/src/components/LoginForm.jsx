// LoginForm.jsx — form bằng useReducer + AuthContext (admin-only)
import React, { useReducer } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const initialForm = { username: "", password: "", errors: {}, isLoading: false };

function formReducer(state, action) {
  switch (action.type) {
    case "change": {
      const { name, value } = action;
      return { 
        ...state, 
        [name]: value,
        errors: { ...state.errors, [name]: "" } // Clear specific field error when user types
      };
    }
    case "setErrors": return { ...state, errors: action.errors || {} };
    case "setLoading": return { ...state, isLoading: action.isLoading };
    case "reset":     return { ...initialForm };
    default:          return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(formReducer, initialForm);
  const { isAuthenticated, user, error, login, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    
    // Enhanced validation
    if (!state.username.trim()) {
      errs.username = "Username không được để trống";
    } else if (state.username.trim().length < 3) {
      errs.username = "Username phải có ít nhất 3 ký tự";
    }
    
    if (!state.password.trim()) {
      errs.password = "Password không được để trống";
    } else if (state.password.trim().length < 6) {
      errs.password = "Password phải có ít nhất 6 ký tự";
    }
    
    dispatch({ type: "setErrors", errors: errs });
    
    if (Object.keys(errs).length === 0) {
      dispatch({ type: "setLoading", isLoading: true });
      // Simulate async login process
      setTimeout(() => {
        login(state.username.trim(), state.password);
        dispatch({ type: "setLoading", isLoading: false });
      }, 500);
    }
  };

  if (isAuthenticated) {
    return (
      <Card className="p-4 text-center">
        <h4 className="mb-2">Xin chào, {user.username}!</h4>
        <div className="text-muted mb-3">Role: <strong>{user.role}</strong> — Email: {user.email}</div>
        <Button variant="secondary" onClick={logout}>Logout</Button>
      </Card>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="p-4">
            <h3 className="text-center mb-3">Admin Login</h3>

            {error && <Alert variant="danger" className="py-2">{error}</Alert>}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={state.username}
                  onChange={(e) => dispatch({ type: "change", name: e.target.name, value: e.target.value })}
                  isInvalid={!!state.errors.username}
                  placeholder="admin"
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={(e) => dispatch({ type: "change", name: e.target.name, value: e.target.value })}
                  isInvalid={!!state.errors.password}
                  placeholder="123456"
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                disabled={state.isLoading}
              >
                {state.isLoading ? "Đang đăng nhập..." : "Login"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
