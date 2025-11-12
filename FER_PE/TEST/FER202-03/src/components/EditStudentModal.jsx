//EditStudentModal.jsx - Modal chỉnh sửa student
// TEMPLATE: Tương tự AddStudentForm, thay đổi các trường form theo đối tượng của bạn
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useStudent } from '../contexts/StudentContext';

const EditStudentModal = ({ show, onHide, student, onSuccess }) => {
    const { updateStudent, getUniqueCategories, getUniqueNames } = useStudent();

    // 📝 THAY ĐỔI: Cập nhật formData theo các trường của đối tượng của bạn
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        email: '',
        major: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (student) {
            setFormData({
                id: student.id || '',
                fullName: student.fullName || '',
                email: student.email || '',
                major: student.major || '',
            });
            setErrors({});
            setError(null);
            setSuccess(false);
        }
    }, [student]);

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

        if (!formData.id.trim()) {
            newErrors.id = 'ID is required';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!formData.major.trim()) {
            newErrors.major = 'Major is required';
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
            const result = await updateStudent(student.id, {
                ...formData,
                userId: student.userId, // Giữ nguyên userId
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess();
                }, 1000);
            } else {
                setError(result.error || 'Failed to update student');
            }
        } catch (err) {
            setError('An error occurred while updating student');
        } finally {
            setIsLoading(false);
        }
    };

    const categories = getUniqueCategories();
    const names = getUniqueNames();

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                {/* 📝 THAY ĐỔI: Thay 'Chỉnh sửa Student' */}
                <Modal.Title>Chỉnh sửa Student</Modal.Title>
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
                            Cập nhật student thành công!
                        </Alert>
                    )}

                    {/* 📝 THAY ĐỔI: Thay đổi các Form.Group theo các trường của đối tượng của bạn */}
                    <Form.Group className="mb-3">
                        <Form.Label> *</Form.Label>
                        <Form.Control
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="Enter ID"
                            isInvalid={!!errors.id}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.id}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            isInvalid={!!errors.fullName}
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
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Major *</Form.Label>
                        <Form.Control
                            type="text"
                            name="major"
                            value={formData.major}
                            onChange={handleChange}
                            placeholder="Enter major"
                            isInvalid={!!errors.major}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.major}
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

export default EditStudentModal;

