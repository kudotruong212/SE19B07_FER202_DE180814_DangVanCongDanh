import React from 'react';
import { useMovies } from '../contexts/MovieContext';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';

const MovieList = ({ onEdit, onDelete, onView, movies: propMovies }) => {
  const { movies: contextMovies, genres, loading, error } = useMovies();
  const movies = propMovies || contextMovies;

  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : 'Unknown';
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <p>Loading movies...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Row>
      {movies.map(movie => (
        <Col key={movie.id} md={4} className="mb-4">
          <Card style={{ height: '100%' }}>
            <Card.Img 
              variant="top" 
              src={movie.poster} 
              style={{ height: '300px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
              }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text className="flex-grow-1">
                {movie.description}
              </Card.Text>
              <div className="mb-2">
                <Badge bg="info" className="me-1">{movie.year}</Badge>
                <Badge bg="secondary">{getGenreName(movie.genreId)}</Badge>
              </div>
              <div className="d-grid gap-2">
                {onView && (
                  <Button variant="primary" onClick={() => onView(movie.id)}>
                    View Details
                  </Button>
                )}
                <div className="d-flex gap-2">
                  {onEdit && (
                    <Button 
                      variant="warning" 
                      onClick={() => onEdit(movie)}
                      style={{ flex: 1 }}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button 
                      variant="danger" 
                      onClick={() => onDelete(movie.id)}
                      style={{ flex: 1 }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;

