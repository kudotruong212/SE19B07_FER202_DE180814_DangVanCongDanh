//AddStudentForm.jsx - Form thêm student mới
// TEMPLATE: Thay đổi các trường form theo đối tượng của bạn
import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../contexts/StudentContext';
import NavigationHeader from './NavigationHeader';

const AddStudentForm = () => {
    const navigate = useNavigate();
    const { addStudent, getUniqueCategories, getUniqueNames } = useStudent();
    
    // 📝 THAY ĐỔI: Cập nhật formData theo các trường của đối tượng của bạn
    // Ví dụ: Nếu là Product: { name, price, category, description, stock }
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

    const categories = getUniqueCategories();
    const names = getUniqueNames();

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
            const result = await addStudent({
                ...formData,
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else {
                setError(result.error || 'Failed to add student');
            }
        } catch (err) {
            setError('An error occurred while adding student');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        // 📝 THAY ĐỔI: Reset về giá trị ban đầu của các trường
        setFormData({
            id: '',
            fullName: '',
            email: '',
            major: '',
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
                                {/* 📝 THAY ĐỔI: Thay text 'Thêm Student Mới' */}
                                <h3 className="text-center mb-0">Thêm Student Mới</h3>
                            </Card.Header>
                            <Card.Body>
                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}
                                {success && (
                                    <Alert variant="success">
                                        Thêm student thành công! Đang chuyển hướng...
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit} noValidate>
                                    {/* 📝 THAY ĐỔI: Thay đổi các Form.Group theo các trường của đối tượng của bạn */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>ID *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleChange}
                                            placeholder="Enter ID"
                                            list="id-list"
                                            isInvalid={!!errors.id}
                                        />
                                        <datalist id="id-list">
                                            {ids.map(id => (
                                                <option key={id} value={id} />
                                            ))}
                                        </datalist>
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
                                            list="fullName-list"
                                            isInvalid={!!errors.fullName}
                                        />
                                        <datalist id="fullName-list">
                                            {names.map(name => (
                                                <option key={name} value={name} />
                                            ))}
                                        </datalist>
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
                                            isInvalid={!!errors.major}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.major}
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
                                                'Thêm Student'
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

