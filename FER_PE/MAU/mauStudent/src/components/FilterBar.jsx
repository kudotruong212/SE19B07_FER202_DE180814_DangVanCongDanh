//FilterBar.jsx - Component filter và sort cho students
import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useStudent } from '../contexts/StudentContext';

const FilterBar = () => {
    const { filters, sortBy, setFilter, setSort, getUniqueClasses } = useStudent();
    
    const handleSearchChange = (e) => {
        setFilter('search', e.target.value);
    };

    const handleClassChange = (e) => {
        setFilter('class', e.target.value);
    };

    const handleGpaMinChange = (e) => {
        setFilter('gpaMin', e.target.value);
    };

    const handleGpaMaxChange = (e) => {
        setFilter('gpaMax', e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const classes = getUniqueClasses();
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by studentId, fullName, email */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Mã SV/Họ tên/Email)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by student ID, name or email"
                                    value={filters.search}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Class */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Lớp</Form.Label>
                                <Form.Select value={filters.class} onChange={handleClassChange}>
                                    <option value="">Tất cả Lớp</option>
                                    {classes.map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by GPA Min */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>GPA Tối thiểu</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="4"
                                    placeholder="0.0"
                                    value={filters.gpaMin}
                                    onChange={handleGpaMinChange}
                                />
                            </Form.Group>
                        </Col>

                        {/* Filter by GPA Max */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>GPA Tối đa</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="4"
                                    placeholder="4.0"
                                    value={filters.gpaMax}
                                    onChange={handleGpaMaxChange}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        <Col xs={12} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select value={sortBy} onChange={handleSortChange}>
                                    <option value="studentId_asc">Mã SV tăng dần</option>
                                    <option value="studentId_desc">Mã SV giảm dần</option>
                                    <option value="fullName_asc">Họ tên A-Z</option>
                                    <option value="fullName_desc">Họ tên Z-A</option>
                                    <option value="gpa_asc">GPA tăng dần</option>
                                    <option value="gpa_desc">GPA giảm dần</option>
                                    <option value="dateOfBirth_asc">Ngày sinh tăng dần</option>
                                    <option value="dateOfBirth_desc">Ngày sinh giảm dần</option>
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

