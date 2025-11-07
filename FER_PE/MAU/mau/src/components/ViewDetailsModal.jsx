//ViewDetailsModal.jsx - Component modal xem chi tiết item
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay đổi các field hiển thị theo object của bạn

import React from 'react';
import { Modal, Table, Badge } from 'react-bootstrap';

const ViewDetailsModal = ({ show, onHide, item }) => {
    if (!item) return null;

    // Format số tiền
    // CẤU HÌNH: Thay đổi format này theo object của bạn
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
                <Modal.Title>Chi tiết Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>ID:</td>
                            <td>{item.id}</td>
                        </tr>
                        {/* CẤU HÌNH: Thay đổi các trường này theo object của bạn */}
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
                        <tr>
                            <td className="fw-bold">User ID:</td>
                            <td>{item.userId}</td>
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


