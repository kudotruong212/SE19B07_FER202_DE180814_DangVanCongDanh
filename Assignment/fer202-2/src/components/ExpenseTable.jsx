import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { useExpense } from '../contexts/ExpenseContext';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ViewDetailsModal from './ViewDetailsModal';
import ConfirmModal from './ConfirmModal';

const ExpenseTable = ({ onEditClick }) => {
    const { expenses, isLoading, error, totalAmount, deleteExpense } = useExpense();
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    // Format số tiền (format: 85.000 ₫)
    const formatCurrency = (amount) => {
        const formatted = new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
        return `${formatted} ₫`;
    };

    // Format ngày theo định dạng DD-MM-YYYY
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleViewDetails = (expense) => {
        setSelectedExpense(expense);
        setShowViewModal(true);
    };

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        if (onEditClick) {
            onEditClick(expense);
        }
    };

    const handleDeleteClick = (expense) => {
        setExpenseToDelete(expense);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (expenseToDelete) {
            const result = await deleteExpense(expenseToDelete.id);
            if (result.success) {
                setShowDeleteModal(false);
                setExpenseToDelete(null);
            }
        }
    };


    if (isLoading) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Body className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 mb-0">Loading data...</p>
                </Card.Body>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Alert variant="danger">{error}</Alert>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card className="shadow-lg h-100" style={{ borderRadius: '8px', border: '1px solid #dee2e6' }}>
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center text-black" style={{ borderRadius: '8px 8px 0 0', borderBottom: '1px solid #dee2e6' }}>
                    <span className="fw-bold">Expense Management</span>
                </Card.Header>
                <Card.Body className="p-0" style={{ borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
                    {expenses.length === 0 ? (
                        <Alert variant="info" className="mb-0 m-3">
                            No expenses found.
                        </Alert>
                    ) : (
                        <div className="table-responsive" style={{ borderRadius: '0 0 8px 8px' }}>
                            <Table striped bordered hover className="mb-0 align-middle" style={{ marginBottom: 0, border: '1px solid #dee2e6' }}>
                                <thead className="table-dark">
                                    <tr>
                                        
                                        <th>Name</th>
                                        <th className="text-end">Amount</th>
                                        <th>Category</th>
                                        <th>Date</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map((expense, index) => (
                                        <tr key={expense.id}>
                                            
                                            <td className="fw-semibold">{expense.name}</td>
                                            <td className="text-end  fs-6">
                                                {formatCurrency(expense.amount)}
                                            </td>
                                            <td>{expense.category}</td>
                                            <td>{formatDate(expense.date)}</td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleEdit(expense)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaPencilAlt /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(expense)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaTrashAlt /> Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* View Details Modal */}
            {selectedExpense && (
                <ViewDetailsModal
                    show={showViewModal}
                    onHide={() => {
                        setShowViewModal(false);
                        setSelectedExpense(null);
                    }}
                    expense={selectedExpense}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setExpenseToDelete(null);
                }}
                title="Confirm Delete"
                message={expenseToDelete ? `Are you sure you want to delete expense "${expenseToDelete.name}"?` : ''}
                onConfirm={handleConfirmDelete}
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="danger"
                showCancel={true}
            />
        </>
    );
};

export default ExpenseTable;