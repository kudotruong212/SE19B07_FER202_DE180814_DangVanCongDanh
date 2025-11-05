import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Card, Badge, Row, Col, Alert } from 'react-bootstrap';
import { useMovies } from '../contexts/MovieContext';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, genres, loading } = useMovies();

  const movie = movies.find(m => String(m.id) === String(id));

  const getGenreName = (genreId) => {
    const genre = genres.find(g => String(g.id) === String(genreId));
    return genre ? genre.name : 'Unknown';
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <p>Đang tải thông tin phim...</p>
        </div>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Không tìm thấy phim</Alert.Heading>
          <p>Phim với ID "{id}" không tồn tại.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Quay về trang chủ
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="mb-3">
        <Button variant="secondary" onClick={() => navigate('/')}>
          ← Quay lại
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Row>
            <Col md={4} className="mb-4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="img-fluid w-100"
                style={{ borderRadius: 8, objectFit: 'cover', maxHeight: '600px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                }}
              />
            </Col>
            <Col md={8}>
              <div className="mb-3">
                <h1 className="mb-2">{movie.title}</h1>
                <div className="mb-3">
                  <Badge bg="info" className="me-2">{movie.year}</Badge>
                  <Badge bg="secondary" className="me-2">{getGenreName(movie.genreId)}</Badge>
                  <Badge bg="success">{movie.duration} phút</Badge>
                </div>
              </div>

              <div className="mb-4">
                <h4>Thông tin phim</h4>
                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>ID:</strong>
                  </Col>
                  <Col sm={8}>
                    {movie.id}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Thể loại:</strong>
                  </Col>
                  <Col sm={8}>
                    {getGenreName(movie.genreId)}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Năm phát hành:</strong>
                  </Col>
                  <Col sm={8}>
                    {movie.year}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Quốc gia:</strong>
                  </Col>
                  <Col sm={8}>
                    {movie.country}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}>
                    <strong>Thời lượng:</strong>
                  </Col>
                  <Col sm={8}>
                    {movie.duration} phút
                  </Col>
                </Row>
              </div>

              <div className="mb-4">
                <h4>Mô tả</h4>
                <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                  {movie.description}
                </p>
              </div>

              <div className="d-flex gap-2">
                <Button variant="primary" onClick={() => navigate('/')}>
                  Quay về danh sách
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieDetail;

