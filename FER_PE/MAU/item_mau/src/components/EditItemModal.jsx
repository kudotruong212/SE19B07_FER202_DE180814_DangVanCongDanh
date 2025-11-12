import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useItem } from '../contexts/ItemContext';

const EditItemModal = ({ show, onHide, item, onSuccess }) => {
    const { updateItem, getUniqueBrands, getUniqueLocations } = useItem();
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        model: '',
        serialNumber: '',
        purchaseDate: '',
        warrantyDate: '',
        location: '',
        condition: 'excellent',
        price: '',
        status: 'available',
        description: '',
        imageUrl: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const brands = getUniqueBrands();
    const locations = getUniqueLocations();
    const conditionOptions = ['excellent', 'good', 'fair', 'poor'];
    const statusOptions = ['available', 'in-use', 'maintenance', 'disposed'];

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                brand: item.brand || '',
                model: item.model || '',
                serialNumber: item.serialNumber || '',
                purchaseDate: item.purchaseDate || '',
                warrantyDate: item.warrantyDate || '',
                location: item.location || '',
                condition: item.condition || 'excellent',
                price: item.price || '',
                status: item.status || 'available',
                description: item.description || '',
                imageUrl: item.imageUrl || '',
            });
            setErrors({});
            setError(null);
            setSuccess(false);
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.brand.trim()) {
            newErrors.brand = 'Brand is required';
        }

        if (!formData.model.trim()) {
            newErrors.model = 'Model is required';
        }

        if (!formData.serialNumber.trim()) {
            newErrors.serialNumber = 'Serial Number is required';
        }

        if (!formData.purchaseDate) {
            newErrors.purchaseDate = 'Purchase Date is required';
        }

        if (!formData.warrantyDate) {
            newErrors.warrantyDate = 'Warranty Date is required';
        }

        if (formData.purchaseDate && formData.warrantyDate && new Date(formData.warrantyDate) < new Date(formData.purchaseDate)) {
            newErrors.warrantyDate = 'Warranty Date must be after Purchase Date';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
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
            const result = await updateItem(item.id, {
                ...formData,
                price: Number(formData.price),
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess();
                }, 1000);
            } else {
                setError(result.error || 'Failed to update item');
            }
        } catch (err) {
            setError('An error occurred while updating item');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa Item</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && (
                        <Alert variant="danger" dismissible onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert variant="success">
                            Cập nhật item thành công!
                        </Alert>
                    )}

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter item name"
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Brand *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="Enter brand"
                                    list="brand-list"
                                    isInvalid={!!errors.brand}
                                />
                                <datalist id="brand-list">
                                    {brands.map(brand => (
                                        <option key={brand} value={brand} />
                                    ))}
                                </datalist>
                                <Form.Control.Feedback type="invalid">
                                    {errors.brand}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Model *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    placeholder="Enter model"
                                    isInvalid={!!errors.model}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.model}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Serial Number *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serialNumber"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                    placeholder="Enter serial number"
                                    isInvalid={!!errors.serialNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.serialNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Purchase Date *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="purchaseDate"
                                    value={formData.purchaseDate}
                                    onChange={handleChange}
                                    isInvalid={!!errors.purchaseDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.purchaseDate}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Warranty Date *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="warrantyDate"
                                    value={formData.warrantyDate}
                                    onChange={handleChange}
                                    isInvalid={!!errors.warrantyDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.warrantyDate}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Location *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                    list="location-list"
                                    isInvalid={!!errors.location}
                                />
                                <datalist id="location-list">
                                    {locations.map(location => (
                                        <option key={location} value={location} />
                                    ))}
                                </datalist>
                                <Form.Control.Feedback type="invalid">
                                    {errors.location}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
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
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Condition *</Form.Label>
                                <Form.Select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                >
                                    {conditionOptions.map(condition => (
                                        <option key={condition} value={condition}>
                                            {condition.charAt(0).toUpperCase() + condition.slice(1)}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Status *</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Description *</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter item description"
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL (optional)"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={isLoading}>
                        Hủy
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner size="sm" animation="border" className="me-2" />
                                Đang cập nhật...
                            </>
                        ) : (
                            'Cập nhật'
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditItemModal;
