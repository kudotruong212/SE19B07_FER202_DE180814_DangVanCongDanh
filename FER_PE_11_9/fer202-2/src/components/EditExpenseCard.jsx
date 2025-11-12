import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useExpense } from '../contexts/ExpenseContext';

const EditExpenseCard = ({ expense, onReset, onSuccess }) => {
    const { updateExpense, addExpense, getUniqueCategories } = useExpense();
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

    // Get categories safely
    const categories = getUniqueCategories ? getUniqueCategories() : [];

    // Format date from YYYY-MM-DD to dd/MM/yyyy
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Parse date from dd/MM/yyyy to YYYY-MM-DD
    const parseDateFromDisplay = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            const year = parts[2];
            // Validate date
            const dateObj = new Date(year, month - 1, day);
            if (dateObj.getDate() == day && dateObj.getMonth() == month - 1 && dateObj.getFullYear() == year) {
                return `${year}-${month}-${day}`;
            }
        }
        // If format is already YYYY-MM-DD, return as is
        if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dateString;
        }
        return '';
    };

    useEffect(() => {
        if (expense) {
            setFormData({
                name: expense.name || '',
                category: expense.category || '',
                amount: expense.amount || '',
                date: formatDateForDisplay(expense.date),
            });
            setErrors({});
            setError(null);
            setSuccess(false);
        } else {
            // Reset form when no expense selected
            setFormData({
                name: '',
                amount: '',
                category: '',
                date: '',
            });
            setErrors({});
            setError(null);
            setSuccess(false);
        }
    }, [expense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Auto-format date input (dd/MM/yyyy)
        let processedValue = value;
        if (name === 'date' && value) {
            // Remove all non-digits
            const digits = value.replace(/\D/g, '');
            // Format as dd/MM/yyyy
            if (digits.length <= 2) {
                processedValue = digits;
            } else if (digits.length <= 4) {
                processedValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
            } else {
                processedValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
            }
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        const amountValue = typeof formData.amount === 'string' ? parseFloat(formData.amount) : formData.amount;
        if (!formData.amount || isNaN(amountValue) || amountValue <= 0) {
            newErrors.amount = 'Amount must be a valid number greater than 0';
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
        } else {
            // Validate date format dd/MM/yyyy
            const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            if (!dateRegex.test(formData.date)) {
                newErrors.date = 'Date must be in format dd/MM/yyyy';
            } else {
                const [, day, month, year] = formData.date.match(dateRegex);
                const dateObj = new Date(year, month - 1, day);
                if (dateObj.getDate() != day || dateObj.getMonth() != month - 1 || dateObj.getFullYear() != year) {
                    newErrors.date = 'Invalid date';
                }
            }
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
            // Parse date from dd/MM/yyyy to YYYY-MM-DD
            const formattedDate = parseDateFromDisplay(formData.date);
            
            if (!formattedDate) {
                setError('Invalid date format. Please use dd/MM/yyyy');
                setIsLoading(false);
                return;
            }
            
            let result;
            if (expense) {
                // Update existing expense
                result = await updateExpense(expense.id, {
                    name: formData.name.trim(),
                    category: formData.category.trim(),
                    amount: Number(formData.amount),
                    date: formattedDate,
                    userId: expense.userId,
                });
            } else {
                // Add new expense
                result = await addExpense({
                    name: formData.name.trim(),
                    category: formData.category.trim(),
                    amount: Number(formData.amount),
                    date: formattedDate,
                });
            }

            if (result && result.success) {
                setSuccess(true);
                // Reset form after success
                setFormData({
                    name: '',
                    amount: '',
                    category: '',
                    date: '',
                });
                setTimeout(() => {
                    setSuccess(false);
                    if (onSuccess) onSuccess();
                }, 1500);
            } else {
                setError(result?.error || (expense ? 'Failed to update expense' : 'Failed to add expense'));
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || (expense ? 'An error occurred while updating expense' : 'An error occurred while adding expense'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        if (expense) {
            setFormData({
                name: expense.name || '',
                category: expense.category || '',
                amount: expense.amount || '',
                date: formatDateForDisplay(expense.date),
            });
        } else {
            setFormData({
                name: '',
                amount: '',
                category: '',
                date: '',
            });
        }
        setErrors({});
        setError(null);
        setSuccess(false);
        if (onReset) onReset();
    };

    return (
        <Card className="shadow-sm h-100">
            <Card.Header as="h5">{expense ? 'Edit Expense' : 'Add Expense'}</Card.Header>
            <Card.Body>
                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert variant="success">
                        {expense ? 'Expense updated successfully!' : 'Expense added successfully!'}
                    </Alert>
                )}

                {!expense && (
                    <Alert variant="info">
                        Fill the form to add a new expense, or select an expense from the table to edit
                    </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter expense name"
                            isInvalid={!!errors.name}
                            disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            min="0"
                            step="1000"
                            isInvalid={!!errors.amount}
                            disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.amount}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            isInvalid={!!errors.category}
                            disabled={isLoading}
                        >
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.category}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder="dd/MM/yyyy (e.g., 10/03/2025)"
                            isInvalid={!!errors.date}
                            disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.date}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Format: dd/MM/yyyy
                        </Form.Text>
                    </Form.Group>

                    <div className="d-flex gap-2">
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
                            variant="primary"
                            type="submit"
                            style={{ flex: 1 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner size="sm" animation="border" className="me-2" />
                                    {expense ? 'Saving...' : 'Adding...'}
                                </>
                            ) : (
                                expense ? 'Save' : 'Add expense'
                            )}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EditExpenseCard;

