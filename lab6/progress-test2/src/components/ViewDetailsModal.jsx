import React from 'react';
import { Modal, Table, Badge } from 'react-bootstrap';

const ViewDetailsModal = ({ show, onHide, payment }) => {
    if (!payment) return null;

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
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết Thanh toán</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>ID:</td>
                            <td>{payment.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Semester:</td>
                            <td>
                                <Badge bg="primary">{payment.semester}</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Course Name:</td>
                            <td>{payment.courseName}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Amount:</td>
                            <td className="text-success fw-bold fs-5">
                                {formatCurrency(payment.amount)}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Date:</td>
                            <td>{formatDate(payment.date)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">User ID:</td>
                            <td>{payment.userId}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>
                    Đóng
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewDetailsModal;
