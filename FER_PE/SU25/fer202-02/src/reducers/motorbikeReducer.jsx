// Initial state
export const initialMotorbikeState = {
    motorbikes: [],
    loading: false,
    error: null
  };
  
  // Reducer function
  export const motorbikeReducer = (state, action) => {
    switch (action.type) {
      case 'GET_MOTORBIKES_LOADING':
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case 'GET_MOTORBIKES_SUCCESS':
        return {
          ...state,
          motorbikes: action.payload,
          loading: false,
          error: null
        };
  
      case 'GET_MOTORBIKES_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      case 'UPDATE_MOTORBIKE':
        return {
          ...state,
          motorbikes: state.motorbikes.map(m =>
            m.id === action.payload.id ? action.payload : m
          )
        };
  
      default:
        return state;
    }
  };