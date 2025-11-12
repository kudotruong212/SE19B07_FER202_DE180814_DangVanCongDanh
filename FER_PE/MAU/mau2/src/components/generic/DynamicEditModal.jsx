// DynamicEditModal.jsx - Edit Modal động dựa trên entityConfig
// Component này tự động tạo edit modal từ config, không cần viết lại form
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { entityConfig, getFieldByName } from '../../config/entityConfig';
import DynamicForm from './DynamicForm';

const DynamicEditModal = ({ show, onHide, item, onSuccess, updateItem }) => {
    const { fields, ui } = entityConfig;
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Khởi tạo formData từ fields config
    useEffect(() => {
        if (item) {
            const initialData = {};
            fields.forEach(field => {
                initialData[field.name] = item[field.name] || '';
            });
            setFormData(initialData);
            setErrors({});
            setError(null);
            setSuccess(false);
        }
    }, [item, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const field = getFieldByName(name);
        
        // Xử lý type conversion
        let processedValue = value;
        if (field?.type === 'number') {
            processedValue = value === '' ? '' : Number(value);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));
        
        // Clear error khi user nhập
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    // Validation tự động dựa trên config
    const validate = () => {
        const newErrors = {};
        
        fields.forEach(field => {
            const value = formData[field.name];
            
            // Required validation
            if (field.required) {
                if (!value || (typeof value === 'string' && !value.trim())) {
                    newErrors[field.name] = field.validation.required || `${field.label} is required`;
                }
            }
            
            // Pattern validation
            if (field.validation.pattern && value) {
                if (!field.validation.pattern.test(value)) {
                    newErrors[field.name] = field.validation.patternMessage || 'Invalid format';
                }
            }
            
            // Min validation (cho number)
            if (field.type === 'number' && field.validation.min !== undefined && value !== '') {
                if (Number(value) < field.validation.min) {
                    newErrors[field.name] = field.validation.minMessage || `Value must be at least ${field.validation.min}`;
                }
            }
            
            // Max validation (cho number)
            if (field.type === 'number' && field.validation.max !== undefined && value !== '') {
                if (Number(value) > field.validation.max) {
                    newErrors[field.name] = field.validation.maxMessage || `Value must be at most ${field.validation.max}`;
                }
            }
        });
        
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
            // Chuẩn bị data với type conversion
            const submitData = { id: item.id };
            fields.forEach(field => {
                let value = formData[field.name];
                
                // Convert type nếu cần
                if (field.type === 'number' && value !== '') {
                    value = Number(value);
                }
                
                submitData[field.name] = value;
            });

            const result = await updateItem(item.id, submitData);

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    if (onSuccess) onSuccess();
                }, 1000);
            } else {
                setError(result.error || 'Failed to update');
            }
        } catch (err) {
            setError('An error occurred while updating');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setError(null);
            setSuccess('');
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{ui.editTitle}</Modal.Title>
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
                            Cập nhật {entityConfig.name.lowerSingular} thành công!
                        </Alert>
                    )}

                    {/* Sử dụng DynamicForm - tự động render từ config */}
                    <DynamicForm
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                        disabled={isLoading}
                        layout="two-column"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
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

export default DynamicEditModal;
