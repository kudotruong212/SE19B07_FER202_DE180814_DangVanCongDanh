import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const EditPaymentModal = ({ show, onHide, payment, onSuccess }) => {
    const { updatePayment, getUniqueSemesters, getUniqueCourses } = usePayment();
    const [formData, setFormData] = useState({
        semester: '',
        courseName: '',
        amount: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (payment) {
            setFormData({
                semester: payment.semester || '',
                courseName: payment.courseName || '',
                amount: payment.amount || '',
                date: payment.date || '',
            });
            setErrors({});
            setError(null);
            setSuccess(false);
        }
    }, [payment]);

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

        if (!formData.semester.trim()) {
            newErrors.semester = 'Semester is required';
        }

        if (!formData.courseName.trim()) {
            newErrors.courseName = 'Course name is required';
        }

        if (!formData.amount || formData.amount <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
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
            const result = await updatePayment(payment.id, {
                ...formData,
                amount: Number(formData.amount),
                userId: payment.userId,
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess();
                }, 1000);
            } else {
                setError(result.error || 'Failed to update payment');
            }
        } catch (err) {
            setError('An error occurred while updating payment');
        } finally {
            setIsLoading(false);
        }
    };

    const semesters = getUniqueSemesters();
    const courses = getUniqueCourses();

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa Thanh toán</Modal.Title>
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
                            Cập nhật thanh toán thành công!
                        </Alert>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Semester *</Form.Label>
                        <Form.Control
                            type="text"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            placeholder="Enter semester (e.g., Fall 2025)"
                            list="semester-list"
                            isInvalid={!!errors.semester}
                        />
                        <datalist id="semester-list">
                            {semesters.map(semester => (
                                <option key={semester} value={semester} />
                            ))}
                        </datalist>
                        <Form.Control.Feedback type="invalid">
                            {errors.semester}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Course Name *</Form.Label>
                        <Form.Control
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            placeholder="Enter course name"
                            list="course-list"
                            isInvalid={!!errors.courseName}
                        />
                        <datalist id="course-list">
                            {courses.map(course => (
                                <option key={course} value={course} />
                            ))}
                        </datalist>
                        <Form.Control.Feedback type="invalid">
                            {errors.courseName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Amount (VND) *</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            min="0"
                            step="1000"
                            isInvalid={!!errors.amount}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.amount}
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

export default EditPaymentModal;
