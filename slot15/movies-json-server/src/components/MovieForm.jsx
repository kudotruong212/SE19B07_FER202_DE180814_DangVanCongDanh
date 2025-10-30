import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useMovies } from '../contexts/MovieContext';

const MovieForm = ({ movie = null, onSave, onCancel }) => {
  const { genres, currentMovie } = useMovies();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    poster: '',
    genreId: '',
    year: '',
    country: '',
    duration: ''
  });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (movie || currentMovie) {
      const m = movie || currentMovie;
      setFormData({
        title: m.title || '',
        description: m.description || '',
        poster: m.poster || '',
        genreId: m.genreId || '',
        year: m.year || '',
        country: m.country || '',
        duration: m.duration || ''
      });
    }
  }, [movie, currentMovie]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, poster: reader.result }));
    };
    reader.readAsDataURL(file);
    if (errors.poster) setErrors(prev => ({ ...prev, poster: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.poster) newErrors.poster = 'Vui lòng chọn ảnh hoặc nhập URL';
    if (!formData.title.trim()) newErrors.title = 'Tên phim không được để trống';
    if (!formData.description.trim()) newErrors.description = 'Mô tả không được để trống';
    if (!formData.genreId) newErrors.genreId = 'Vui lòng chọn thể loại';
    if (!formData.duration) newErrors.duration = 'Thời lượng không được để trống';
    if (!formData.year) newErrors.year = 'Năm không được để trống';
    if (!formData.country.trim()) newErrors.country = 'Quốc gia không được để trống';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    try {
      const payload = {
        ...formData,
        genreId: parseInt(formData.genreId, 10),
        year: parseInt(formData.year, 10),
        duration: parseInt(formData.duration, 10)
      };
      if (onSave) await onSave(payload);
    } catch (err) {
      setSubmitError(err.message || 'Đã xảy ra lỗi khi lưu phim');
    }
  };

  const invalid = (name) => (errors[name] ? 'is-invalid' : '');

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h2>{movie || currentMovie ? 'Chỉnh sửa Phim' : 'Thêm Phim Mới'}</h2>
        </Card.Header>
        <Card.Body>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh Avatar Phim</Form.Label>
              <div className="d-flex gap-3">
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                <Form.Control
                  type="text"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  placeholder="Hoặc nhập URL hình ảnh"
                  className={invalid('poster')}
                />
              </div>
              {errors.poster && <div className="invalid-feedback d-block">{errors.poster}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên Phim</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={invalid('title')}
              />
              {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={invalid('description')}
              />
              {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thể loại</Form.Label>
              <Form.Select
                name="genreId"
                value={formData.genreId}
                onChange={handleChange}
                className={invalid('genreId')}
              >
                <option value="">Chọn thể loại</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </Form.Select>
              {errors.genreId && <div className="invalid-feedback d-block">{errors.genreId}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thời lượng (phút)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                className={invalid('duration')}
              />
              {errors.duration && <div className="invalid-feedback d-block">{errors.duration}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Năm</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max="2030"
                className={invalid('year')}
              />
              {errors.year && <div className="invalid-feedback d-block">{errors.year}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quốc gia</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={invalid('country')}
              />
              {errors.country && <div className="invalid-feedback d-block">{errors.country}</div>}
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="success" type="submit" className="flex-grow-1">
                {movie || currentMovie ? 'Cập nhật Phim' : 'Thêm Phim'}
              </Button>
              {onCancel && (
                <Button variant="secondary" onClick={onCancel}>Hủy</Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieForm;

