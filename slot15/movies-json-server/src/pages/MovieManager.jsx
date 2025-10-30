import React, { useState, useMemo } from 'react';
import { Container, Button, Tabs, Tab } from 'react-bootstrap';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import MovieList from '../components/MovieList';
import MovieTable from '../components/MovieTable';
import MovieForm from '../components/MovieForm';
import FilterBar from '../components/FilterBar';

const MovieManager = () => {
  const { movies, addMovie, updateMovie, removeMovie, setCurrentMovie, clearCurrentMovie, currentMovie } = useMovies();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [filter, setFilter] = useState({});

  // Chỉ cho admin được CRUD (username === 'admin')
  const isAdmin = user && user.username === 'admin';

  const handleEdit = (movie) => {
    setCurrentMovie(movie);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await removeMovie(id);
    }
  };

  const handleSave = async (movieData) => {
    try {
      if (currentMovie) {
        await updateMovie(currentMovie.id, movieData);
      } else {
        await addMovie(movieData);
      }
      setShowForm(false);
      clearCurrentMovie();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    clearCurrentMovie();
  };

  const handleAddNew = () => {
    clearCurrentMovie();
    setShowForm(true);
  };

  const filteredMovies = useMemo(() => {
    let res = [...movies];
    if (filter.search) {
      res = res.filter(m => m.title.toLowerCase().includes(filter.search.toLowerCase()));
    }
    if (filter.genre) {
      res = res.filter(m => String(m.genreId) === String(filter.genre));
    }
    if (filter.minDuration) {
      res = res.filter(m => m.duration >= parseInt(filter.minDuration));
    }
    if (filter.maxDuration) {
      res = res.filter(m => m.duration <= parseInt(filter.maxDuration));
    }
    if (filter.sort === 'desc') {
      res = res.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      res = res.sort((a, b) => a.title.localeCompare(b.title));
    }
    return res;
  }, [movies, filter]);

  if (showForm && isAdmin) {
    return (
      <MovieForm
        movie={currentMovie}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Movie Management</h1>
        {isAdmin && (
          <Button variant="primary" onClick={handleAddNew}>
            Add New Movie
          </Button>
        )}
      </div>
      <FilterBar onFilterChange={setFilter} />
      <Tabs
        activeKey={viewMode}
        onSelect={(k) => setViewMode(k)}
        className="mb-4"
      >
        <Tab eventKey="list" title="Card View">
          <MovieList
            onEdit={isAdmin ? handleEdit : undefined}
            onDelete={isAdmin ? handleDelete : undefined}
            movies={filteredMovies}
          />
        </Tab>
        <Tab eventKey="table" title="Table View">
          <MovieTable
            onEdit={isAdmin ? handleEdit : undefined}
            onDelete={isAdmin ? handleDelete : undefined}
            movies={filteredMovies}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MovieManager;

