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
            <Card className="mb-4 shadow-lg border-0">
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center bg-primary text-white">
                    <span className="fw-bold">Danh Sách Thanh Toán</span>
                    <Badge bg="success" className="fs-6 px-3 py-2">
                        Tổng: {formatCurrency(totalAmount)}
                    </Badge>
                </Card.Header>
                <Card.Body className="p-0">
                    {payments.length === 0 ? (
                        <Alert variant="info" className="mb-0 m-3">
                            Không có dữ liệu thanh toán nào.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0 align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center" style={{ width: '60px' }}>#</th>
                                        <th>Semester</th>
                                        <th>Course</th>
                                        <th className="text-end">Amount</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={payment.id}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            <td>
                                                <Badge bg="primary" className="px-3 py-2">
                                                    {payment.semester}
                                                </Badge>
                                            </td>
                                            <td className="fw-semibold">{payment.courseName}</td>
                                            <td className="text-end fw-bold text-success fs-6">
                                                {formatCurrency(payment.amount)}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(payment)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaEye /> View
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleEdit(payment)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaPencilAlt /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(payment)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaTrashAlt /> Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="table-info">
                                        <td colSpan="3" className="text-end fw-bold fs-5">Total Amount:</td>
                                        <td className="text-end fw-bold text-success fs-4">
                                            {formatCurrency(totalAmount)}
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
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