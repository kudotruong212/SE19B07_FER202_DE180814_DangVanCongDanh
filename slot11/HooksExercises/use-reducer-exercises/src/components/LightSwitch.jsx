// LightSwitchReducer.jsx
import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';

// 1) Định nghĩa state khởi tạo
const initialState = { isLightOn: false };

// 2) Viết reducer thuần (pure function)
function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { isLightOn: !state.isLightOn };
    case 'on':
      return { isLightOn: true };
    case 'off':
      return { isLightOn: false };
    default:
      return state;
  }
}

export default function LightSwitchReducer() {
  // 3) Khởi tạo useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // 4) Style nút như bản useState
  const buttonStyle = {  
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Đèn hiện đang: {state.isLightOn ? 'Bật' : 'Tắt'}
      </p>

      {/* Nút toggle giữ nguyên hành vi như trước */}
      <Button
        onClick={() => dispatch({ type: 'toggle' })}
        style={{
          ...buttonStyle,
          background: state.isLightOn ? 'red' : 'green',
          color: 'white'
        }}
      >
        {state.isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}
      </Button>
    </div>
  );
}
