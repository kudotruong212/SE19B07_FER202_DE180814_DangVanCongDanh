//useReducer for Login Form
import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
const initialState = {
  user: { username: '', password: '' },
  errors: {},
  showModal: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        user: { ...state.user, [action.field]: action.value }
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
    case 'SET_SHOW_MODAL':
      return {
        ...state,
        showModal: true
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        showModal: false,
        user: { username: '', password: '' },
        errors: {}
      };
    case 'RESET_FORM':  
      return initialState;
    default:
      return state;
  }
}

function LoginForm2() {
  const [state, dispatch] = useReducer(reducer, initialState);
  

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
    // Kiểm tra lỗi cho từng trường
    if (value.trim() === '') {
      dispatch({ type: 'SET_ERRORS', field: name, message: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` });
    } else {
      dispatch({ type: 'CLEAR_ERRORS', field: name });
    }
  };
  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (state.user.username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (state.user.password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    //cập nhật lỗi
    if (Object.keys(newErrors).length > 0) {
      for (const field in newErrors) {
        dispatch({ type: 'SET_ERRORS', field, message: newErrors[field] });
      } 
    }
    // Nếu không có lỗi, hiển thị modal
    if (Object.keys(newErrors).length === 0) {
      dispatch({ type: 'SET_SHOW_MODAL' });
    }
  };
  // Đóng modal và reset form
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login Form with useReducer</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.user.username}
                    onChange={handleChange}
                    isInvalid={!!state.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username  }
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.user.password}
                    onChange={handleChange} 
                    isInvalid={!!state.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">  
                    {state.errors.password}

                  </Form.Control.Feedback>
                </Form.Group>
                {/* Button Login và Cancel */}
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="flex-fill">    
                  Login
                </Button>
                  <Button variant="secondary" type="button" className='flex-fill' onClick={() => dispatch({ type: 'RESET_FORM' })}>
                    Cancel
                  </Button>
                </div>  
              </Form>   
            </Card.Body>
          </Card>
        </Col>
      </Row>  
      <Modal show={state.showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome, {state.user.username}! You have successfully logged in!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button> 
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm2;
