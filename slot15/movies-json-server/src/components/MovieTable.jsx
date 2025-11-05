import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useMovies } from '../contexts/MovieContext';

const MovieTable = ({ onEdit, onDelete, onView, movies: propMovies }) => {
  const { movies: contextMovies, genres, loading, error } = useMovies();
  const movies = propMovies || contextMovies;

  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : 'Unknown';
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Poster</th>
          <th>Title</th>
          <th>Genre</th>
          <th>Year</th>
          <th>Country</th>
          <th>Duration (min)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie.id}>
            <td>{movie.id}</td>
            <td>
              <img 
                src={movie.poster} 
                alt={movie.title}
                style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/50x70?text=No+Image';
                }}
              />
            </td>
            <td>{movie.title}</td>
            <td><Badge bg="secondary">{getGenreName(movie.genreId)}</Badge></td>
            <td>{movie.year}</td>
            <td>{movie.country}</td>
            <td>{movie.duration}</td>
            <td>
              <div className="d-flex gap-2">
                {onView && (
                  <Button 
                    variant="info" 
                    size="sm"
                    onClick={() => onView(movie.id)}
                  >
                    Details
                  </Button>
                )}
                {onEdit && (
                  <Button 
                    variant="warning" 
                    size="sm"
                    onClick={() => onEdit(movie)}
                  >
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => onDelete(movie.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MovieTable;
