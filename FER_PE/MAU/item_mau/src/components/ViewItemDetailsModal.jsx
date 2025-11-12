import React from 'react';
import { Modal, Table, Badge, Row, Col } from 'react-bootstrap';

const ViewItemDetailsModal = ({ show, onHide, item }) => {
    if (!item) return null;

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

    // Get status badge
    const getStatusBadge = (status) => {
        const variants = {
            available: 'success',
            'in-use': 'primary',
            maintenance: 'warning',
            disposed: 'secondary',
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
    };

    // Get condition badge
    const getConditionBadge = (condition) => {
        const variants = {
            excellent: 'success',
            good: 'info',
            fair: 'warning',
            poor: 'danger',
        };
        return <Badge bg={variants[condition] || 'secondary'}>{condition}</Badge>;
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {item.imageUrl && (
                    <div className="text-center mb-4">
                        <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="img-fluid"
                            style={{ maxHeight: '200px', objectFit: 'cover', border: '3px solid #0d6efd', borderRadius: '8px' }}
                            onError={(e) => {
                                e.target.src = '/logo192.png';
                            }}
                        />
                    </div>
                )}
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>ID:</td>
                            <td>{item.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Name:</td>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Brand:</td>
                            <td>{item.brand}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Model:</td>
                            <td>{item.model}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Serial Number:</td>
                            <td>{item.serialNumber}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Purchase Date:</td>
                            <td>{formatDate(item.purchaseDate)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Warranty Date:</td>
                            <td>{formatDate(item.warrantyDate)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Location:</td>
                            <td>{item.location}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Condition:</td>
                            <td>{getConditionBadge(item.condition)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Price:</td>
                            <td className="text-success fw-bold fs-5">
                                {formatCurrency(item.price)}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Status:</td>
                            <td>{getStatusBadge(item.status)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Description:</td>
                            <td>{item.description}</td>
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

export default ViewItemDetailsModal;
