import React from 'react';
import { Card } from 'react-bootstrap';
import { useExpense } from '../contexts/ExpenseContext';

const TotalExpensesCard = () => {
    const { totalAmount } = useExpense();

    // Format currency in VND (format: 2.720.000 ₫)
    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount) || amount === 0) {
            return '0 ₫';
        }
        // Ensure amount is a number
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        if (isNaN(numAmount)) {
            return '0 ₫';
        }
        const formatted = new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numAmount);
        return `${formatted} ₫`;
    };

    return (
        <Card className="shadow-sm h-100">
            <Card.Header as="h5">Total of Expenses</Card.Header>
            <Card.Body>
                <h3 className="mb-0">{formatCurrency(totalAmount)}</h3>
            </Card.Body>
        </Card>
    );
};

export default TotalExpensesCard;

