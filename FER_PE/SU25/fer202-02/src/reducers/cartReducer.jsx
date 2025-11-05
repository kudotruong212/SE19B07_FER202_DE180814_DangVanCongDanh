// Initial state
export const initialCartState = {
    items: []
  };
  
  // Reducer function
  export const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingItem = state.items.find(item => item.id === action.payload.id);
        
        if (existingItem) {
          // Nếu đã có trong cart, tăng quantity
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id
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
  
      case 'UPDATE_QUANTITY':
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
        };
  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
  
      case 'CLEAR_CART':
        return {
          ...state,
          items: []
        };
  
      default:
        return state;
    }
  };