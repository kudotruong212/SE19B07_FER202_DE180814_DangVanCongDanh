import React, { useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useMovies } from '../contexts/MovieContext';

const FilterBar = ({ onFilterChange }) => {
  const { genres } = useMovies();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [minDuration, setMinDuration] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [sort, setSort] = useState('asc');

  const handleChange = () => {
    onFilterChange({ search, genre, minDuration, maxDuration, sort });
  };

  // Gọi mỗi khi filter thay đổi
  React.useEffect(() => { handleChange(); }, [search, genre, minDuration, maxDuration, sort]);

  return (
    <Form className="mb-3">
      <Row className="align-items-end g-2">
        <Col xs={12} md={3}>
          <Form.Label>Tìm tên phim</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên phim..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={6} md={2}>
          <Form.Label>Thể loại</Form.Label>
          <Form.Select value={genre} onChange={e=>setGenre(e.target.value)}>
            <option value="">Tất cả</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Form.Label>Thời lượng từ</Form.Label>
          <Form.Control
            type="number"
            placeholder="phút min"
            value={minDuration}
            min={0}
            onChange={e=>setMinDuration(e.target.value)}
          />
        </Col>
        <Col xs={6} md={2}>
          <Form.Label>Đến</Form.Label>
          <Form.Control
            type="number"
            placeholder="phút max"
            value={maxDuration}
            min={0}
            onChange={e=>setMaxDuration(e.target.value)}
          />
        </Col>
        <Col xs={6} md={2}>
          <Form.Label>Sắp xếp tên</Form.Label>
          <Form.Select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};
export default FilterBar;
