import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useCourse } from '../contexts/CourseContext';

const FilterBar = () => {
    const { filters, sortBy, setFilter, setSort, getUniqueCategories, getUniqueStatuses } = useCourse();
    
    const handleSearchChange = (e) => {
        setFilter('search', e.target.value);
    };

    const handleCategoryChange = (e) => {
        setFilter('category', e.target.value);
    };

    const handleStatusChange = (e) => {
        setFilter('status', e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const categories = getUniqueCategories();
    const statuses = getUniqueStatuses();
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by title or instructor */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Title/Instructor)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by title or instructor"
                                    value={filters.search}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Category */}
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
                        
                        {/* Filter by Status */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Status</Form.Label>
                                <Form.Select value={filters.status} onChange={handleStatusChange}>
                                    <option value="">All Status</option>
                                    {statuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        <Col xs={12} md={4} lg={4}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select value={sortBy} onChange={handleSortChange}>
                                    <option value="title_asc">Title ascending</option>
                                    <option value="title_desc">Title descending</option>
                                    <option value="instructor_asc">Instructor ascending</option>
                                    <option value="instructor_desc">Instructor descending</option>
                                    <option value="price_asc">Price ascending</option>
                                    <option value="price_desc">Price descending</option>
                                    <option value="startDate_asc">Start Date ascending</option>
                                    <option value="startDate_desc">Start Date descending</option>
                                    <option value="students_asc">Students ascending</option>
                                    <option value="students_desc">Students descending</option>
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
