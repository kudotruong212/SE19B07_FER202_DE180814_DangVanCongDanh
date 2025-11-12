//AddStudentForm.jsx - Form thêm student mới
import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../contexts/StudentContext';
import NavigationHeader from './NavigationHeader';

const AddStudentForm = () => {
    const navigate = useNavigate();
    const { addStudent, getUniqueClasses } = useStudent();
    
    const [formData, setFormData] = useState({
        studentId: '',
        fullName: '',
        email: '',
        phone: '',
        class: '',
        gpa: '',
        dateOfBirth: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const classes = getUniqueClasses();

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

        if (!formData.studentId.trim()) {
            newErrors.studentId = 'Mã sinh viên là bắt buộc';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ và tên là bắt buộc';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
        }

        if (!formData.class.trim()) {
            newErrors.class = 'Lớp là bắt buộc';
        }

        if (!formData.gpa || formData.gpa < 0 || formData.gpa > 4) {
            newErrors.gpa = 'GPA phải từ 0 đến 4';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
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
            const result = await addStudent({
                ...formData,
                gpa: Number(formData.gpa),
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else {
                setError(result.error || 'Thêm sinh viên thất bại');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi thêm sinh viên');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            studentId: '',
            fullName: '',
            email: '',
            phone: '',
            class: '',
            gpa: '',
            dateOfBirth: '',
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
                                <h3 className="text-center mb-0">Thêm Sinh Viên Mới</h3>
                            </Card.Header>
                            <Card.Body>
                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}
                                {success && (
                                    <Alert variant="success">
                                        Thêm sinh viên thành công! Đang chuyển hướng...
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit} noValidate>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mã Sinh Viên *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="studentId"
                                            value={formData.studentId}
                                            onChange={handleChange}
                                            placeholder="Nhập mã sinh viên"
                                            isInvalid={!!errors.studentId}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.studentId}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Họ và Tên *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Nhập họ và tên"
                                            isInvalid={!!errors.fullName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Nhập email"
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Số Điện Thoại *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Nhập số điện thoại"
                                            isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Lớp *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="class"
                                            value={formData.class}
                                            onChange={handleChange}
                                            placeholder="Nhập lớp"
                                            list="class-list"
                                            isInvalid={!!errors.class}
                                        />
                                        <datalist id="class-list">
                                            {classes.map(cls => (
                                                <option key={cls} value={cls} />
                                            ))}
                                        </datalist>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.class}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>GPA (0-4) *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="gpa"
                                            value={formData.gpa}
                                            onChange={handleChange}
                                            placeholder="Nhập GPA"
                                            min="0"
                                            max="4"
                                            step="0.1"
                                            isInvalid={!!errors.gpa}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.gpa}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Ngày Sinh *</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            isInvalid={!!errors.dateOfBirth}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dateOfBirth}
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
                                                'Thêm Sinh Viên'
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

export default AddStudentForm;

