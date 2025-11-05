import React, { useReducer } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

// 1. Định nghĩa Initial State
const initialState = {
  username: '',
  password: '',
  errors: {},           // Lỗi validation cho từng field
  submitError: '',      // Lỗi khi login thất bại
  showModal: false      // Hiển thị modal thành công
};

// 2. Định nghĩa Reducer Function
function reducer(state, action) {
  switch (action.type) {
    // Set giá trị cho field (username hoặc password)
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    
    // Set lỗi cho field cụ thể
    case 'SET_ERRORS':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message
        }
      };
    
    // Clear lỗi của field
    case 'CLEAR_ERRORS':
      const { [action.field]: removed, ...rest } = state.errors;
      return {
        ...state,
        errors: rest
      };
    
    // Set lỗi submit (login sai)
    case 'SET_SUBMIT_ERROR':
      return {
        ...state,
        submitError: action.message
      };
    
    // Clear lỗi submit
    case 'CLEAR_SUBMIT_ERROR':
      return {
        ...state,
        submitError: ''
      };
    
    // Hiển thị modal thành công
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: true
      };
    
    // Đóng modal
    case 'CLOSE_MODAL':
      return {
        ...state,
        showModal: false
      };
    
    // Reset form về trạng thái ban đầu
    case 'RESET_FORM':
      return initialState;
    
    default:
      return state;
  }
}

// 3. Login Component
const Login = ({ setUser }) => {
  const { login } = useAuth();        // Lấy hàm login từ AuthContext
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();      // Để điều hướng sau khi login thành công

  // 4. Handle Change - Khi user nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Đảm bảo value là string
    const stringValue = String(value);
    
    // Update state
    dispatch({ type: 'SET_FIELD', field: name, value: stringValue });
    
    // Clear error của field này nếu có
    if (state.errors[name]) {
      dispatch({ type: 'CLEAR_ERRORS', field: name });
    }
    
    // Clear submit error
    if (state.submitError) {
      dispatch({ type: 'CLEAR_SUBMIT_ERROR' });
    }
  };

  // 5. Handle Cancel - Xóa tất cả input và errors
  const handleCancel = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  // 6. Handle Submit - Khi user click Login
  const handleSubmit = async (e) => {
    e.preventDefault();  // Ngăn form submit mặc định
    dispatch({ type: 'CLEAR_SUBMIT_ERROR' });

    // VALIDATION: Đảm bảo username và password là string và required
    const newErrors = {};
    
    // Validate username: phải là string và không được để trống
    if (typeof state.username !== 'string' || !state.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    // Validate password: phải là string và không được để trống
    if (typeof state.password !== 'string' || !state.password.trim()) {
      newErrors.password = 'Password is required';
    }

    // Nếu có lỗi validation, hiển thị và dừng lại
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

    // Convert sang string và trim
    const username = String(state.username).trim();
    const password = String(state.password).trim();

    // THỬ LOGIN
    try {
      const user = await login(username, password);
      
      // Nếu login thành công
      if (setUser) {
        setUser(user);
      }
      
      // Hiển thị modal thành công
      dispatch({ type: 'SHOW_MODAL' });
    } catch (err) {
      // Nếu login thất bại, hiển thị alert lỗi
      dispatch({
        type: 'SET_SUBMIT_ERROR',
        message: err.message || 'Invalid username or password!'
      });
    }
  };

  // 7. Handle Close Modal - Đóng modal và redirect
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    navigate('/home');  
  };

  // 8. Render UI
  return (
    <Container className="mt-4">
      <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card.Body>
          <h2 className="mb-3 text-center">Login</h2>

          <Form onSubmit={handleSubmit}>
            {/* Username Field */}
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

            {/* Password Field */}
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
            <Alert variant="danger" className="mt-3 mb-0">
              {state.submitError}
            </Alert>
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

// 9. PropTypes Validation
Login.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default Login;