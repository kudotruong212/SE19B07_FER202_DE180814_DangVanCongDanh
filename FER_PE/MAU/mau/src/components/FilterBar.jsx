//FilterBar.jsx - Component để lọc và sắp xếp items
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay đổi các field trong filters theo object của bạn

import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useItem } from '../contexts/ItemContext';

const FilterBar = () => {
    const { filters, sortBy, setFilter, setSort, getUniqueCategories, getUniqueNames } = useItem();
    
    const handleSearchChange = (e) => {
        setFilter('search', e.target.value);
    };

    // CẤU HÌNH: Thay đổi các handler này theo object của bạn
    const handleCategoryChange = (e) => {
        setFilter('category', e.target.value);
    };

    const handleNameChange = (e) => {
        setFilter('name', e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const categories = getUniqueCategories();
    const names = getUniqueNames();
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by category or name  */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Category/Name)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by category or name"
                                    value={filters.search}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Category  */}
                        {/* CẤU HÌNH: Thay đổi label và field này theo object của bạn */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Category</Form.Label>
                                <Form.Select value={filters.category} onChange={handleCategoryChange}>
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Name */}
                        {/* CẤU HÌNH: Thay đổi label và field này theo object của bạn */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Name</Form.Label>
                                <Form.Select value={filters.name} onChange={handleNameChange}>
                                    <option value="">All Names</option>
                                    {names.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        {/* CẤU HÌNH: Thay đổi các option sort theo object của bạn */}
                        <Col xs={12} md={4} lg={4}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select value={sortBy} onChange={handleSortChange}>
                                    <option value="name_asc">Name ascending</option>
                                    <option value="name_desc">Name descending</option>
                                    <option value="date_asc">Date ascending</option>
                                    <option value="date_desc">Date descending</option>
                                    <option value="price_asc">Price ascending</option>
                                    <option value="price_desc">Price descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;


