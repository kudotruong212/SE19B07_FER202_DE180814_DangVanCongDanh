//ViewDetailsModal.jsx - Modal xem chi tiết item
// TEMPLATE: Thay đổi các trường hiển thị theo đối tượng của bạn
import React from 'react';
import { Modal, Table, Badge } from 'react-bootstrap';

const ViewDetailsModal = ({ show, onHide, item }) => {
    if (!item) return null;

    // 📝 THAY ĐỔI: Format theo định dạng của đối tượng của bạn
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

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
                {/* 📝 THAY ĐỔI: Thay 'Chi tiết Item' */}
                <Modal.Title>Chi tiết Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered>
                    <tbody>
                        {/* 📝 THAY ĐỔI: Thay các dòng hiển thị theo các trường của đối tượng của bạn */}
                        <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>ID:</td>
                            <td>{item.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Category:</td>
                            <td>
                                <Badge bg="primary">{item.category}</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Name:</td>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Price:</td>
                            <td className="text-success fw-bold fs-5">
                                {formatCurrency(item.price)}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Date:</td>
                            <td>{formatDate(item.date)}</td>
                        </tr>
                        {item.userId && (
                            <tr>
                                <td className="fw-bold">User ID:</td>
                                <td>{item.userId}</td>
                            </tr>
                        )}
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

