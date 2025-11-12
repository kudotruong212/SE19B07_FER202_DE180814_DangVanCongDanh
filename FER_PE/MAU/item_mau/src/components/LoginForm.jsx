import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
  formData: {
    identifier: '', // username hoặc email
    password: '',
  },
  errors: {},
  showSuccessModal: false,
};

// 2. Định nghĩa reducer cho form 
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'SHOW_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: true,
      };
    case 'HIDE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false,
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { login, loading, error, clearError, user } = useAuth();

  // Validation helpers
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes('@');

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });

    if (error) clearError();

    // Validation real-time
    let message = '';
    if (name === 'identifier') {
      if (!value.trim()) {
        message = 'Username or Email is required.';
      } else if (isEmail(value) && !emailRe.test(value)) {
        message = 'Email is invalid format.';
      }
    }

    if (name === 'password') {
      if (!value.trim()) {
        message = 'Password is required.';
      } else if (value.length < 6) {
        message = 'Password must be at least 6 characters.';
      }
    }

    if (message) {
      dispatch({ type: 'SET_ERROR', field: name, message });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  // Validation form
  const validateForm = () => {
    const errors = {};
    const { identifier, password } = formState.formData;

    if (!identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(identifier) && !emailRe.test(identifier)) {
      errors.identifier = 'Email is invalid format.';
    }

    if (!password.trim()) {
     errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) clearError();

    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const result = await login({
        usernameOrEmail: formState.formData.identifier.trim(), 
        password: formState.formData.password,
      });

      if (result && result.success) { 
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleReset = () => { 
    dispatch({ type: 'RESET_FORM' });
    if (error) clearError();
  };

  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    navigate('/home'); 
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login - Item Management</h3>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" className="mb-3" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label>Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.formData.identifier}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                    placeholder="Enter username or email"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.formData.password}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                    placeholder="Enter password"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ flex: 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" animation="border" role="status" className="me-2" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button 
                    variant="secondary" 
                    type="button" 
                    style={{ flex: 1 }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
                
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful!"
        message={`Welcome, ${user?.username || user?.fullName}!, login successful.`}
        onConfirm={handleCloseSuccessModal}
        onHide={handleCloseSuccessModal}
      />
    </Container>
  );
}

export default LoginForm;
