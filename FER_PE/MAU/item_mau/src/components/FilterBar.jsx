import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useItem } from '../contexts/ItemContext';

const FilterBar = () => {
    const { filters, sortBy, setFilter, setSort, getUniqueBrands, getUniqueLocations, getUniqueConditions, getUniqueStatuses } = useItem();
    
    const handleSearchChange = (e) => {
        setFilter('search', e.target.value);
    };

    const handleBrandChange = (e) => {
        setFilter('brand', e.target.value);
    };

    const handleLocationChange = (e) => {
        setFilter('location', e.target.value);
    };

    const handleConditionChange = (e) => {
        setFilter('condition', e.target.value);
    };

    const handleStatusChange = (e) => {
        setFilter('status', e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const brands = getUniqueBrands();
    const locations = getUniqueLocations();
    const conditions = getUniqueConditions();
    const statuses = getUniqueStatuses();
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by name, brand, model, serialNumber */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Name/Brand/Model/Serial)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by name, brand, model, or serial number"
                                    value={filters.search}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Brand */}
                        <Col xs={6} md={3} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Brand</Form.Label>
                                <Form.Select value={filters.brand} onChange={handleBrandChange}>
                                    <option value="">All Brands</option>
                                    {brands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Location */}
                        <Col xs={6} md={3} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Location</Form.Label>
                                <Form.Select value={filters.location} onChange={handleLocationChange}>
                                    <option value="">All Locations</option>
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Condition */}
                        <Col xs={6} md={3} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Condition</Form.Label>
                                <Form.Select value={filters.condition} onChange={handleConditionChange}>
                                    <option value="">All Conditions</option>
                                    {conditions.map(condition => (
                                        <option key={condition} value={condition}>{condition}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Status */}
                        <Col xs={6} md={3} lg={2}>
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
                    </Row>
                    <Row className="g-3 mt-2">
                        {/* Sorting */}
                        <Col xs={12} md={6} lg={4}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select value={sortBy} onChange={handleSortChange}>
                                    <option value="name_asc">Name ascending</option>
                                    <option value="name_desc">Name descending</option>
                                    <option value="brand_asc">Brand ascending</option>
                                    <option value="brand_desc">Brand descending</option>
                                    <option value="price_asc">Price ascending</option>
                                    <option value="price_desc">Price descending</option>
                                    <option value="purchaseDate_asc">Purchase Date ascending</option>
                                    <option value="purchaseDate_desc">Purchase Date descending</option>
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
