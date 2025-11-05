import React, { useReducer } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Modal } from 'react-bootstrap';

const initialState = {
  username: '',
  password: '',
  errors: {},
  submitError: '',
  showModal: false
};

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
        errors: { ...state.errors, [action.field]: action.message }
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

const Login = () => {
  const { login } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
    // Clear error when user types
    if (state.errors[name]) {
      dispatch({ type: 'CLEAR_ERRORS', field: name });
    }
    if (state.submitError) {
      dispatch({ type: 'CLEAR_SUBMIT_ERROR' });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_SUBMIT_ERROR' });
    
    // Validation
    const newErrors = {};
    if (!state.username.trim()) {
      newErrors.username = 'Tên đăng nhập không được để trống';
    }
    if (!state.password.trim()) {
      newErrors.password = 'Mật khẩu không được để trống';
    }
    
    // Set errors
    if (Object.keys(newErrors).length > 0) {
      for (const field in newErrors) {
        dispatch({ type: 'SET_ERRORS', field, message: newErrors[field] });
      }
      return;
    }
    
    try {
      const user = await login(state.username, state.password);
      // Show success modal
      dispatch({ type: 'SHOW_MODAL' });
    } catch (err) {
      dispatch({ 
        type: 'SET_SUBMIT_ERROR', 
        message: err.message || 'Tài khoản hoặc mật khẩu sai!' 
      });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <Card style={{maxWidth:'400px',margin:'0 auto'}}>
        <Card.Body>
          <h2 className="mb-3">Đăng nhập</h2>
          {state.submitError && <Alert variant="danger">{state.submitError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control 
                type="text" 
                name="username"
                value={state.username} 
                onChange={handleChange} 
                isInvalid={!!state.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control 
                type="password" 
                name="password"
                value={state.password} 
                onChange={handleChange} 
                isInvalid={!!state.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Đăng nhập</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal báo đăng nhập thành công */}
      <Modal show={state.showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="mb-3">
              <i className="bi bi-check-circle-fill text-success" style={{fontSize: '3rem'}}></i>
            </div>
            <p className="text-success fw-bold">Chào mừng, {state.username}!</p>
            <p>Bạn đã đăng nhập thành công.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Login;
