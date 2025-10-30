const API_URL = 'http://localhost:3001';

export const getGenres = async () => {
  const response = await fetch(`${API_URL}/genres`);
  if (!response.ok) throw new Error('Failed to fetch genres');
  return await response.json();
};

export const getMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return await response.json();
};

export const getMovieById = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) throw new Error('Failed to fetch movie');
  return await response.json();
};

export const createMovie = async (movie) => {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) throw new Error('Failed to create movie');
  return await response.json();
};

export const updateMovie = async (id, movie) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) throw new Error('Failed to update movie');
  return await response.json();
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete movie');
  return id;
};


