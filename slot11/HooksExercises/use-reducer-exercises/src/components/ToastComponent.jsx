// tao 1 toast component dung chung cho LoginForm, SignUpForm, ConfirmModalComponent
// toast co the hien thi thong bao thanh cong, that bai, canh bao
// su dung useReducer de quan ly trang thai toast
// trang thai toast bao gom: show (hien thi hay khong), message (noi dung thong bao), variant (mau sac: success, danger, warning, info), duration (thoi gian hien thi truoc khi tu dong an di)
import React, { useReducer, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
const initialState = {
  show: false,
  message: '',
  variant: 'info',
  duration: 3000
};

function toastReducer(state, action) {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        show: true,
        message: action.payload.message,
        variant: action.payload.variant,
        duration: action.payload.duration
      };
    case 'HIDE_TOAST':
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}

// ToastContext để chia sẻ toast function giữa các component
const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  useEffect(() => {
    let timer;
    if (state.show) {
      timer = setTimeout(() => {
        dispatch({ type: 'HIDE_TOAST' });
      }, state.duration);
    }
    return () => clearTimeout(timer);
  }, [state.show, state.duration]);

  const showToast = (message, variant = 'info', duration = 3000) => {
    console.log('showToast called:', message, variant); // Debug log
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message, variant, duration }
    });
  };

  const hideToast = () => {
    dispatch({ type: 'HIDE_TOAST' });
  };

  console.log('ToastProvider state:', state); // Debug log

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer 
        position="top-end" 
        className="p-3" 
        style={{ 
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
        <Toast
          bg={state.variant}
          show={state.show}
          onClose={hideToast}
          delay={state.duration}
          autohide
          style={{
            minWidth: '300px',
            maxWidth: '400px'
          }}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body>{state.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

// Hook để sử dụng toast trong component
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Component cũ để backward compatibility
const ToastComponent = () => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  useEffect(() => {
    let timer;
    if (state.show) {
      timer = setTimeout(() => {
        dispatch({ type: 'HIDE_TOAST' });
      }, state.duration);
    }
    return () => clearTimeout(timer);
  }, [state.show, state.duration]);

  // eslint-disable-next-line no-unused-vars
  const showToast = (message, variant, duration) => {
    dispatch({
      type: 'SHOW_TOAST',
      payload: { message, variant, duration }
    });
  };

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        bg={state.variant}
        show={state.show}
        onClose={() => dispatch({ type: 'HIDE_TOAST' })}
      >
        <Toast.Body>{state.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;