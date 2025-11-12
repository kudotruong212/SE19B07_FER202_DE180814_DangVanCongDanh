import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import TotalExpensesCard from '../components/TotalExpensesCard';
import EditExpenseCard from '../components/EditExpenseCard';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const DashboardPage = () => {
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleExpenseSelect = (expense) => {
        setSelectedExpense(expense);
    };

    const handleEditSuccess = () => {
        setSelectedExpense(null);
    };

    const handleReset = () => {
        setSelectedExpense(null);
    };

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content */}
            <Container className="mt-4">
                {/* Row 1: Total of Expenses và Filter ngang hàng */}
                <Row className="mb-5">
                    {/* Total of Expenses - 3 parts */}
                    <Col md={3}>
                        <TotalExpensesCard />
                    </Col>

                    {/* Filter - 9 parts */}
                    <Col md={9}>
                        <FilterBar />
                    </Col>
                </Row>
                
                {/* Row 2: Edit Expense và Expense Management ngang hàng */}
                <Row>
                    {/* Form Thao tác: Edit Expense - 3 parts */}
                    <Col md={3}>
                        <EditExpenseCard 
                            expense={selectedExpense}
                            onReset={handleReset}
                            onSuccess={handleEditSuccess}
                        />
                    </Col>

                    {/* Bảng Quản lý Chi phí: Expense Management - 9 parts */}
                    <Col md={9}>
                        <ExpenseTable onEditClick={handleExpenseSelect} />
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className="mt-5 py-3 bg-light text-center">
                <Container>
                    <Row>
                        <Col className="text-start">
                            <small>©2025 PersonalBudget Demo</small>
                        </Col>
                        <Col className="text-end">
                            <small>Built with React, Redux Toolkit & JSON Server</small>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default DashboardPage;