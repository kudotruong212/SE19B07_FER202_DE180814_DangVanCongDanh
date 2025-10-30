import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { movieReducer, initialState } from '../reducers/movieReducers';
import * as movieAPI from '../api/movieAPI';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    loadMovies();
    loadGenres();
  }, []);

  const loadMovies = async () => {
    dispatch({ type: 'GET_MOVIES_LOADING' });
    try {
      const movies = await movieAPI.getMovies();
      dispatch({ type: 'GET_MOVIES_SUCCESS', payload: movies });
    } catch (error) {
      dispatch({ type: 'GET_MOVIES_ERROR', payload: error.message });
    }
  };

  const loadGenres = async () => {
    try {
      const genres = await movieAPI.getGenres();
      dispatch({ type: 'GET_GENRES_SUCCESS', payload: genres });
    } catch (error) {
      dispatch({ type: 'GET_GENRES_ERROR', payload: error.message });
    }
  };

  const addMovie = async (movie) => {
    try {
      const newMovie = await movieAPI.createMovie(movie);
      dispatch({ type: 'CREATE_MOVIE_SUCCESS', payload: newMovie });
      return newMovie;
    } catch (error) {
      dispatch({ type: 'CREATE_MOVIE_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateMovie = async (id, movie) => {
    try {
      const updatedMovie = await movieAPI.updateMovie(id, movie);
      dispatch({ type: 'UPDATE_MOVIE_SUCCESS', payload: updatedMovie });
      return updatedMovie;
    } catch (error) {
      dispatch({ type: 'UPDATE_MOVIE_ERROR', payload: error.message });
      throw error;
    }
  };

  const removeMovie = async (id) => {
    try {
      await movieAPI.deleteMovie(id);
      dispatch({ type: 'DELETE_MOVIE_SUCCESS', payload: id });
    } catch (error) {
      dispatch({ type: 'DELETE_MOVIE_ERROR', payload: error.message });
      throw error;
    }
  };

  const setCurrentMovie = (movie) => {
    dispatch({ type: 'SET_CURRENT_MOVIE', payload: movie });
  };

  const clearCurrentMovie = () => {
    dispatch({ type: 'CLEAR_CURRENT_MOVIE' });
  };

  const value = {
    ...state,
    addMovie,
    updateMovie,
    removeMovie,
    setCurrentMovie,
    clearCurrentMovie
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

