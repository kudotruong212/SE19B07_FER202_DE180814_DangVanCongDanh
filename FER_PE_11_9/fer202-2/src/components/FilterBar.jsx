import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useExpense } from '../contexts/ExpenseContext';

const FilterBar = () => {
    const { filters, setFilter, getUniqueCategories } = useExpense();
    
    const handleCategoryChange = (e) => {
        setFilter('category', e.target.value);
    };

    const categories = getUniqueCategories ? getUniqueCategories() : [];
    
    return (
        <Card className="shadow-sm h-100">
            <Card.Header as="h5">Filter</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        <Col xs={12} md={6} lg={4}>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Select value={filters.category || ''} onChange={handleCategoryChange}>
                                    <option value="">All categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
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