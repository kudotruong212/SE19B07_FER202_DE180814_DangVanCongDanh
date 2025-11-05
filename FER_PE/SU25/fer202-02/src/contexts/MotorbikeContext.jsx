import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { motorbikeReducer, initialMotorbikeState } from '../reducers/motorbikeReducer';
import * as motorbikeAPI from '../api/motorbikeAPI';

const MotorbikeContext = createContext();

export const MotorbikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(motorbikeReducer, initialMotorbikeState);

  // Load motorbikes khi component mount
  useEffect(() => {
    loadMotorbikes();
  }, []);

  // Load motorbikes từ API
  const loadMotorbikes = async () => {
    dispatch({ type: 'GET_MOTORBIKES_LOADING' });
    try {
      const motorbikes = await motorbikeAPI.getMotorbikes();
      dispatch({ type: 'GET_MOTORBIKES_SUCCESS', payload: motorbikes });
    } catch (error) {
      dispatch({ type: 'GET_MOTORBIKES_ERROR', payload: error.message });
    }
  };

  // Cập nhật stock của motorbike
  const updateMotorbikeStock = async (id, stock) => {
    try {
      const motorbike = state.motorbikes.find(m => m.id === id);
      if (motorbike) {
        const updated = await motorbikeAPI.updateMotorbike(id, { ...motorbike, stock });
        dispatch({ type: 'UPDATE_MOTORBIKE', payload: updated });
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const value = {
    ...state,
    updateMotorbikeStock
  };

  return (
    <MotorbikeContext.Provider value={value}>
      {children}
    </MotorbikeContext.Provider>
  );
};

export const useMotorbikes = () => {
  const context = useContext(MotorbikeContext);
  if (!context) {
    throw new Error('useMotorbikes must be used within MotorbikeProvider');
  }
  return context;
};