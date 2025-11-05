// Initial state
export const initialMotorbikeState = {
    motorbikes: [],      // Danh sách motorbikes
    loading: false,      // Đang load data
    error: null         // Lỗi nếu có
  };
  
  // Reducer function
  export const motorbikeReducer = (state, action) => {
    switch (action.type) {
      // Bắt đầu load motorbikes
      case 'GET_MOTORBIKES_LOADING':
        return {
          ...state,
          loading: true,
          error: null
        };
  
      // Load motorbikes thành công
      case 'GET_MOTORBIKES_SUCCESS':
        return {
          ...state,
          motorbikes: action.payload,  // action.payload là mảng motorbikes
          loading: false,
          error: null
        };
  
      // Load motorbikes thất bại
      case 'GET_MOTORBIKES_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload  // action.payload là error message
        };
  
      // Cập nhật một motorbike (ví dụ: giảm stock)
      case 'UPDATE_MOTORBIKE':
        return {
          ...state,
          motorbikes: state.motorbikes.map(m =>
            m.id === action.payload.id ? action.payload : m
          )
        };

      // Cập nhật stock của motorbike (chỉ cần id và stock)
      case 'UPDATE_MOTORBIKE_STOCK':
        return {
          ...state,
          motorbikes: state.motorbikes.map(m =>
            String(m.id) === String(action.payload.id)
              ? { ...m, stock: action.payload.stock }
              : m
          )
        };

  
      default:
        return state;
    }
  };