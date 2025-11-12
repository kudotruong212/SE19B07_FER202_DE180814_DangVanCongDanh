import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useExpense } from '../contexts/ExpenseContext';
import NavigationHeader from './NavigationHeader';

const AddExpenseForm = () => {
    const navigate = useNavigate();
    const { addExpense, getUniqueCategories } = useExpense();
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const categories = getUniqueCategories ? getUniqueCategories() : [];

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

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!formData.amount || formData.amount <= 0) {
            newErrors.amount = 'Amount must be a valid number greater than 0';
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
            // Format date to YYYY-MM-DD for storage
            const dateObj = new Date(formData.date);
            const formattedDate = dateObj.toISOString().split('T')[0];
            
            const result = await addExpense({
                name: formData.name.trim(),
                category: formData.category.trim(),
                amount: Number(formData.amount),
                date: formattedDate,
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            } else {
                setError(result.error || 'Failed to add expense');
            }
        } catch (err) {
            setError('An error occurred while adding expense');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            amount: '',
            category: '',
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
                                <h3 className="text-center mb-0">Add Expense</h3>
                            </Card.Header>
                            <Card.Body>
                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}
                                {success && (
                                    <Alert variant="success">
                                        Expense added successfully! Redirecting...
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit} noValidate>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter expense name"
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Amount *</Form.Label>
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
                                        <Form.Label>Category *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            placeholder="Enter category (e.g., Food)"
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
                                                    Adding...
                                                </>
                                            ) : (
                                                'Add expense'
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

export default AddExpenseForm;
