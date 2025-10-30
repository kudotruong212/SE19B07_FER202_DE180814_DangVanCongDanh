export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'GET_MOVIES_SUCCESS':
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null
      };

    case 'GET_MOVIES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case 'GET_MOVIES_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'CREATE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: [...state.movies, action.payload],
        error: null
      };

    case 'CREATE_MOVIE_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'UPDATE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: state.movies.map(movie =>
          movie.id === action.payload.id ? action.payload : movie
        ),
        error: null
      };

    case 'UPDATE_MOVIE_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'DELETE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.payload),
        error: null
      };

    case 'DELETE_MOVIE_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'GET_GENRES_SUCCESS':
      return {
        ...state,
        genres: action.payload
      };

    case 'GET_GENRES_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'SET_CURRENT_MOVIE':
      return {
        ...state,
        currentMovie: action.payload
      };

    case 'CLEAR_CURRENT_MOVIE':
      return {
        ...state,
        currentMovie: null
      };

    default:
      return state;
  }
};

export const initialState = {
  movies: [],
  genres: [],
  currentMovie: null,
  loading: false,
  error: null
};

