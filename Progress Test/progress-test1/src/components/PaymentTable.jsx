import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ViewDetailsModal from './ViewDetailsModal';
import EditPaymentModal from './EditPaymentModal';
import ConfirmModal from './ConfirmModal';

const PaymentTable = () => {
    const { payments, isLoading, error, totalAmount, deletePayment } = usePayment();
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);

    // Format số tiền
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    // Format ngày
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setShowViewModal(true);
    };

    const handleEdit = (payment) => {
        setSelectedPayment(payment);
        setShowEditModal(true);
    };

    const handleDeleteClick = (payment) => {
        setPaymentToDelete(payment);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (paymentToDelete) {
            const result = await deletePayment(paymentToDelete.id);
            if (result.success) {
                setShowDeleteModal(false);
                setPaymentToDelete(null);
            }
        }
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
        setSelectedPayment(null);
    };

    if (isLoading) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Body className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 mb-0">Đang tải dữ liệu...</p>
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
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                    <span>Danh sách Thanh toán</span>
                    <Badge bg="success" className="fs-6">
                        Tổng: {formatCurrency(totalAmount)}
                    </Badge>
                </Card.Header>
                <Card.Body>
                    {payments.length === 0 ? (
                        <Alert variant="info" className="mb-0">
                            Không có dữ liệu thanh toán nào.
                        </Alert>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Semester</th>
                                    <th>Course</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Badge bg="primary">{payment.semester}</Badge>
                                        </td>
                                        <td>{payment.courseName}</td>
                                        <td className="text-end fw-bold text-success">
                                            {formatCurrency(payment.amount)}
                                        </td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button
                                                    variant="info"
                                                    onClick={() => handleViewDetails(payment)}
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </Button>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleEdit(payment)}
                                                    title="Edit"
                                                >
                                                    <FaPencilAlt />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDeleteClick(payment)}
                                                    title="Delete"
                                                >
                                                    <FaTrashAlt />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="table-info">
                                    <td colSpan="3" className="text-end fw-bold">Total Amount:</td>
                                    <td className="text-end fw-bold text-success fs-5">
                                        {formatCurrency(totalAmount)}
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            {/* View Details Modal */}
            {selectedPayment && (
                <ViewDetailsModal
                    show={showViewModal}
                    onHide={() => {
                        setShowViewModal(false);
                        setSelectedPayment(null);
                    }}
                    payment={selectedPayment}
                />
            )}

            {/* Edit Payment Modal */}
            {selectedPayment && (
                <EditPaymentModal
                    show={showEditModal}
                    onHide={() => {
                        setShowEditModal(false);
                        setSelectedPayment(null);
                    }}
                    payment={selectedPayment}
                    onSuccess={handleEditSuccess}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setPaymentToDelete(null);
                }}
                title="Xác nhận xóa"
                message={paymentToDelete ? `Bạn có chắc chắn muốn xóa thanh toán "${paymentToDelete.courseName}" không?` : ''}
                onConfirm={handleConfirmDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                confirmVariant="danger"
                showCancel={true}
            />
        </>
    );
};

export default PaymentTable;