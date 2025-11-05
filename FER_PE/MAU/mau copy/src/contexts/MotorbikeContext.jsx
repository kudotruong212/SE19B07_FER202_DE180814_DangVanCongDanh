import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { motorbikeReducer, initialMotorbikeState } from '../reducers/motorbikeReducer';
import * as motorbikeAPI from '../api/motorbikeAPI';

const MotorbikeContext = createContext();

export const MotorbikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(motorbikeReducer, initialMotorbikeState);

  // Load motorbikes khi component mount (khi app khởi động)
  useEffect(() => {
    loadMotorbikes();
  }, []);

  // Hàm load motorbikes từ API
  const loadMotorbikes = async () => {
    dispatch({ type: 'GET_MOTORBIKES_LOADING' });
    try {
      const motorbikes = await motorbikeAPI.getMotorbikes();
      dispatch({ type: 'GET_MOTORBIKES_SUCCESS', payload: motorbikes });
    } catch (error) {
      dispatch({ type: 'GET_MOTORBIKES_ERROR', payload: error.message });
    }
  };

    // Hàm cập nhật stock của motorbike (khi add to cart)
      // Hàm cập nhật stock của motorbike (khi add to cart)
  const updateMotorbikeStock = (id, stock) => {
    // Dispatch action trực tiếp với payload chứa id và stock mới
    dispatch({ 
      type: 'UPDATE_MOTORBIKE_STOCK', 
      payload: { id, stock } 
    });
  };

  // Value để chia sẻ cho các components con
  const value = {
    ...state,                    // motorbikes, loading, error
    updateMotorbikeStock         // hàm để update stock
  };

  return (
    <MotorbikeContext.Provider value={value}>
      {children}
    </MotorbikeContext.Provider>
  );
};

// Custom Hook
export const useMotorbikes = () => {
  const context = useContext(MotorbikeContext);
  if (!context) {
    throw new Error('useMotorbikes must be used within MotorbikeProvider');
  }
  return context;
};