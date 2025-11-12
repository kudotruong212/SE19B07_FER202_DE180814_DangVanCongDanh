import React, { useState, useEffect, useMemo } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { createPayment, clearError, selectPayments, selectPaymentsLoading, selectPaymentsError } from '../store/paymentsSlice';
import { usePayment } from '../contexts/PaymentContext'; // Vẫn dùng để lấy unique semesters/courses
import NavigationHeader from './NavigationHeader';

const AddPaymentForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: currentUser } = useAuth();
    
    // Redux state
    const payments = useSelector(selectPayments);
    const isLoading = useSelector(selectPaymentsLoading);
    const error = useSelector(selectPaymentsError);
    
    // Vẫn dùng PaymentContext để lấy unique semesters và courses (có thể migrate sau)
    const { getUniqueSemesters, getUniqueCourses } = usePayment();
    
    const [formData, setFormData] = useState({
        semester: '',
        courseName: '',
        amount: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const semesters = getUniqueSemesters();
    const courses = getUniqueCourses();
    
    // Clear error khi component mount
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

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
        dispatch(clearError()); // Clear error trước khi submit
        setSuccess(false);

        if (!validate()) {
            return;
        }

        // Sử dụng Redux createPayment action
        try {
            const result = await dispatch(createPayment({
                semester: formData.semester,
                courseName: formData.courseName,
                amount: Number(formData.amount),
                date: formData.date,
                userId: currentUser?.id, // Thêm userId từ current user
            }));

            // Kiểm tra kết quả
            if (createPayment.fulfilled.match(result)) {
                // Payment được tạo thành công
                console.log('✅ Payment created successfully:', result.payload);
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else if (createPayment.rejected.match(result)) {
                // Có lỗi xảy ra - error đã được lưu trong Redux store
                console.error('❌ Payment creation failed:', result.payload);
                console.error('❌ Error details:', result);
                // Error đã được lưu trong Redux state và sẽ hiển thị qua useSelector
            }
        } catch (err) {
            // Lỗi không mong đợi
            console.error('❌ Unexpected error:', err);
        }
    };

    const handleReset = () => {
        setFormData({
            semester: '',
            courseName: '',
            amount: '',
            date: '',
        });
        setErrors({});
        dispatch(clearError());
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
                                <h3 className="text-center mb-0">Thêm Thanh toán Mới</h3>
                            </Card.Header>
                            <Card.Body>
                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
                                        <Alert.Heading>❌ Lỗi!</Alert.Heading>
                                        <p className="mb-0">
                                            <strong>{error}</strong>
                                        </p>
                                        {error === 'Tài khoản không đủ tiền' && (
                                            <>
                                                <hr />
                                                <p className="mb-0 small">
                                                    💡 <strong>Lưu ý:</strong> Đây là lỗi 402 (Payment Required) được xử lý bằng <code>rejectWithValue</code> trong Redux Toolkit.
                                                </p>
                                            </>
                                        )}
                                    </Alert>
                                )}
                                {success && (
                                    <Alert variant="success">
                                        <Alert.Heading>✅ Thành công!</Alert.Heading>
                                        <p className="mb-0">Thêm thanh toán thành công! Đang chuyển hướng...</p>
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit} noValidate>
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
                                                'Thêm Thanh toán'
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

export default AddPaymentForm;
