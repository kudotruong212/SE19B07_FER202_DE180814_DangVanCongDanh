//SimpleFilterBar.jsx - Component filter bar đơn giản cho Grid view
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay đổi placeholder và sort options theo object của bạn

import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useItem } from '../contexts/ItemContext';

const SimpleFilterBar = () => {
    const { filters, sortBy, setFilter, setSort } = useItem();
    
    const handleSearchChange = (e) => {
        setFilter('search', e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };
    
    return (
        <Row className="mb-4">
            <Col xs={12} md={6}>
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        placeholder="Search by model" 
                        value={filters.search}
                        onChange={handleSearchChange}
                        style={{ maxWidth: '400px' }}
                    />
                </Form.Group>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-md-end">
                <Form.Group style={{ minWidth: '200px' }}>
                    <Form.Select value={sortBy} onChange={handleSortChange}>
                        <option value="name_asc">Name A-Z</option>
                        <option value="name_desc">Name Z-A</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="year_asc">Year: Oldest First</option>
                        <option value="year_desc">Year: Newest First</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default SimpleFilterBar;


