import React, { useReducer } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Initial state cho form
const initialState = {
  username: '',
  password: '',
  errors: {},
  submitError: '',
  showModal: false
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    
    case 'SET_ERRORS':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message
        }
      };
    
    case 'CLEAR_ERRORS':
      const { [action.field]: removed, ...rest } = state.errors;
      return {
        ...state,
        errors: rest
      };
    
    case 'SET_SUBMIT_ERROR':
      return {
        ...state,
        submitError: action.message
      };
    
    case 'CLEAR_SUBMIT_ERROR':
      return {
        ...state,
        submitError: ''
      };
    
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: true
      };
    
    case 'CLOSE_MODAL':
      return {
        ...state,
        showModal: false
      };
    
    case 'RESET_FORM':
      return initialState;
    
    default:
      return state;
  }
}

const Login = ({ setUser }) => {
  const { login } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // Xử lý khi user thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
    
    // Clear error khi user bắt đầu nhập lại
    if (state.errors[name]) {
      dispatch({ type: 'CLEAR_ERRORS', field: name });
    }
    
    // Clear submit error
    if (state.submitError) {
      dispatch({ type: 'CLEAR_SUBMIT_ERROR' });
    }
  };

  // Xử lý Cancel button
  const handleCancel = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  // Xử lý Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_SUBMIT_ERROR' });

    // Validation
    const newErrors = {};
    if (!state.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!state.password.trim()) {
      newErrors.password = 'Password is required';
    }

    // Nếu có lỗi validation, set errors và return
    if (Object.keys(newErrors).length > 0) {
      for (const field in newErrors) {
        dispatch({
          type: 'SET_ERRORS',
          field,
          message: newErrors[field]
        });
      }
      return;
    }

    // Thử login
    try {
      const user = await login(state.username, state.password);
      
      // Set user nếu có prop setUser
      if (setUser) {
        setUser(user);
      }
      
      // Hiển thị modal thành công
      dispatch({ type: 'SHOW_MODAL' });
    } catch (err) {
      // Hiển thị alert lỗi
      dispatch({
        type: 'SET_SUBMIT_ERROR',
        message: err.message || 'Invalid username or password!'
      });
    }
  };

  // Đóng modal và redirect
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    navigate('/motorbikes');
  };

  return (
    <Container className="mt-4">
      <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card.Body>
          <h2 className="mb-3">Login</h2>

          <Form onSubmit={handleSubmit}>
            {/* Username field */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
                placeholder="Enter username"
                isInvalid={!!state.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password field */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Enter password"
                isInvalid={!!state.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="flex-fill">
                Login
              </Button>
              <Button variant="secondary" onClick={handleCancel} className="flex-fill">
                Cancel
              </Button>
            </div>
          </Form>

          {/* Alert hiển thị lỗi đăng nhập */}
          {state.submitError && (
            <Alert variant="danger" className="mt-3">{state.submitError}</Alert>
          )}

        </Card.Body>
      </Card>

      {/* Modal báo đăng nhập thành công */}
      <Modal show={state.showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="mb-3">
              <span className="text-success" style={{ fontSize: '3rem' }}>
                ✓
              </span>
            </div>
            <p className="text-success fw-bold">
              Welcome, {state.username} login successful!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// PropTypes validation
Login.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default Login;