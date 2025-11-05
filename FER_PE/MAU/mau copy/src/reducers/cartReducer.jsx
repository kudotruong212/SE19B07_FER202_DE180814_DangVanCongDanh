// Initial state
export const initialCartState = {
  items: []  // Mảng các items trong cart
};

// Reducer function
export const cartReducer = (state, action) => {
  switch (action.type) {
    // Thêm vào cart
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => String(item.id) === String(action.payload.id));
      
      if (existingItem) {
        // Nếu đã có trong cart, tăng quantity
        return {
          ...state,
          items: state.items.map(item =>
            String(item.id) === String(action.payload.id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // Nếu chưa có, thêm mới với quantity = 1
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }

    // Cập nhật quantity
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          String(item.id) === String(action.payload.id)
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    // Xóa khỏi cart
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => String(item.id) !== String(action.payload.id))
      };

    // Clear cart
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};