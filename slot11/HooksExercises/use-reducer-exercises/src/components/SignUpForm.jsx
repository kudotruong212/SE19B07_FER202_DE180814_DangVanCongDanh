import React, { useReducer, useMemo, useRef } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import ConfirmModalComponent from './ConfirmModalComponent';
import { useToast } from './ToastComponent';

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
// ...existing code...

const initialState = {
  form: {
    username: '',
    email: '',
    password: '',
    confirm: '',
  },
  errors: {},
};

// Reducer function để quản lý state của form đăng ký
// Nhận vào state hiện tại và action, trả về state mới
function reducer(state, action) {
  switch (action.type) {
    // Xử lý khi người dùng thay đổi giá trị trong form
    case 'change': {
      const { name, value } = action; // Lấy tên field và giá trị mới
      
      // Tạo object form mới với giá trị được cập nhật
      const nextForm = { ...state.form, [name]: value };
      
      // Validate field vừa thay đổi và lưu lỗi (nếu có)
      const fieldError = validate(name, value, nextForm);
      const nextErrors = { ...state.errors, [name]: fieldError };
      
      // Đặc biệt xử lý cho trường hợp password thay đổi:
      // Nếu password thay đổi và confirm password đã có giá trị,
      // thì cần validate lại confirm password để đảm bảo chúng khớp nhau
      if (name === 'password' && nextForm.confirm) {
        nextErrors.confirm = validate('confirm', nextForm.confirm, nextForm);
      }
      
      // Trả về state mới với form và errors đã được cập nhật
      return { ...state, form: nextForm, errors: nextErrors };
    }
    
    // Xử lý khi cần set lại toàn bộ errors (ít khi dùng)
    case 'setErrors':
      return { ...state, errors: action.errors || {} };
    
    // giữ reducer submit để không tự show modal nữa — validation sẽ xử lý ở component
    case 'submit':
      return { ...state };

    // Xử lý khi người dùng hủy form (reset về trạng thái ban đầu)
    case 'cancel':
      return { ...initialState };
    
    // Trường hợp khi thao tác submit thành công: reset form
    case 'submittedSuccess':
      return { ...state, form: initialState.form, errors: {} };
    
    // Trường hợp mặc định: trả về state hiện tại không thay đổi
    default:
      return state;
  }
}

function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const confirmRef = useRef();
  const pendingActionRef = useRef();
  const { showToast } = useToast();

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

  // Replace form submit to open ConfirmModalComponent
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate all fields
    const newErrors = {};
    Object.keys(state.form).forEach((field) => {
      const err = validate(field, state.form[field], state.form);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      dispatch({ type: 'setErrors', errors: newErrors });
      return;
    }

    // define actual async action to run when user confirms
    pendingActionRef.current = async () => {
      // simulate API call (replace with real request)
      await new Promise((r) => setTimeout(r, 1000));
      // on success reset form and show toast
      dispatch({ type: 'submittedSuccess' });
      showToast('Đăng ký thành công! Chào mừng bạn đến với hệ thống.', 'success', 3000);
    };

    // open confirm modal
    confirmRef.current?.showConfirm({
      title: 'Xác nhận đăng ký',
      message: `Bạn có muốn đăng ký với email ${state.form.email}?`,
      confirmText: 'Đăng ký',
      cancelText: 'Hủy',
      variant: 'primary'
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Sign Up</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
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

      {/* Confirm modal: will call pendingActionRef.current when confirmed */}
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

export default SignUpForm;