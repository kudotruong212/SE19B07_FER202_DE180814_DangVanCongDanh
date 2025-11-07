//AddItemForm.jsx - Component form thêm item mới
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay đổi các field trong form theo object của bạn

import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useItem } from '../contexts/ItemContext';
import NavigationHeader from './NavigationHeader';

const AddItemForm = () => {
    const navigate = useNavigate();
    const { addItem, getUniqueCategories, getUniqueNames } = useItem();
    // CẤU HÌNH: Thay đổi các field này theo object của bạn
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        price: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const categories = getUniqueCategories();
    const names = getUniqueNames();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear error khi user nhập
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        // CẤU HÌNH: Thay đổi các validation này theo object của bạn
        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!validate()) {
            return;
        }

        setIsLoading(true);
        try {
            const result = await addItem({
                ...formData,
                price: Number(formData.price),
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else {
                setError(result.error || 'Failed to add item');
            }
        } catch (err) {
            setError('An error occurred while adding item');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        // CẤU HÌNH: Thay đổi các field này theo object của bạn
        setFormData({
            category: '',
            name: '',
            price: '',
            date: '',
        });
        setErrors({});
        setError(null);
        setSuccess(false);
    };

    return (
        <>
            <NavigationHeader />
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        <Card>
                            <Card.Header>
                                <h3 className="text-center mb-0">Thêm Item Mới</h3>
                            </Card.Header>
                            <Card.Body>
                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}
                                {success && (
                                    <Alert variant="success">
                                        Thêm item thành công! Đang chuyển hướng...
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit} noValidate>
                                    {/* CẤU HÌNH: Thay đổi các Form.Group này theo object của bạn */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Category *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            placeholder="Enter category"
                                            list="category-list"
                                            isInvalid={!!errors.category}
                                        />
                                        <datalist id="category-list">
                                            {categories.map(category => (
                                                <option key={category} value={category} />
                                            ))}
                                        </datalist>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.category}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            list="name-list"
                                            isInvalid={!!errors.name}
                                        />
                                        <datalist id="name-list">
                                            {names.map(name => (
                                                <option key={name} value={name} />
                                            ))}
                                        </datalist>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Price (VND) *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="Enter price"
                                            min="0"
                                            step="1000"
                                            isInvalid={!!errors.price}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.price}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Date *</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            isInvalid={!!errors.date}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.date}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            style={{ flex: 1 }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Spinner size="sm" animation="border" className="me-2" />
                                                    Đang thêm...
                                                </>
                                            ) : (
                                                'Thêm Item'
                                            )}
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            type="button"
                                            style={{ flex: 1 }}
                                            onClick={handleReset}
                                            disabled={isLoading}
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            type="button"
                                            onClick={() => navigate('/home')}
                                            disabled={isLoading}
                                        >
                                            Hủy
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AddItemForm;


