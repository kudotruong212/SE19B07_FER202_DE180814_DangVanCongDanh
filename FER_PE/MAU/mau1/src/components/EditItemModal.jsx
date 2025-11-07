//EditItemModal.jsx - Modal chỉnh sửa item
// TEMPLATE: Tương tự AddItemForm, thay đổi các trường form theo đối tượng của bạn
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useItem } from '../contexts/ItemContext';

const EditItemModal = ({ show, onHide, item, onSuccess }) => {
    const { updateItem, getUniqueCategories, getUniqueNames } = useItem();
    
    // 📝 THAY ĐỔI: Cập nhật formData theo các trường của đối tượng của bạn
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                category: item.category || '',
                price: item.price || '',
                date: item.date || '',
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

    // 📝 THAY ĐỔI: Cập nhật validation theo các trường của đối tượng của bạn
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
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
            const result = await updateItem(item.id, {
                ...formData,
                price: Number(formData.price),
                userId: item.userId, // Giữ nguyên userId
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

    const categories = getUniqueCategories();
    const names = getUniqueNames();

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                {/* 📝 THAY ĐỔI: Thay 'Chỉnh sửa Item' */}
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

                    {/* 📝 THAY ĐỔI: Thay đổi các Form.Group theo các trường của đối tượng của bạn */}
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
                        <Form.Label>Price *</Form.Label>
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

