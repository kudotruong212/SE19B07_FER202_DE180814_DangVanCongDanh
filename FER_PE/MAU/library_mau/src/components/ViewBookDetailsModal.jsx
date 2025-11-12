import React from 'react';
import { Modal, Table, Badge, Row, Col } from 'react-bootstrap';

const ViewBookDetailsModal = ({ show, onHide, book }) => {
    if (!book) return null;

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
            borrowed: 'warning',
            reserved: 'info',
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết Sách</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {book.imageUrl && (
                    <div className="text-center mb-4">
                        <img 
                            src={book.imageUrl} 
                            alt={book.title}
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
                            <td>{book.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Title:</td>
                            <td>{book.title}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Author:</td>
                            <td>{book.author}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">ISBN:</td>
                            <td>{book.isbn}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Category:</td>
                            <td>
                                <Badge bg="secondary">{book.category}</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Price:</td>
                            <td className="text-success fw-bold fs-5">
                                {formatCurrency(book.price)}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Published Date:</td>
                            <td>{formatDate(book.publishedDate)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Status:</td>
                            <td>{getStatusBadge(book.status)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Description:</td>
                            <td>{book.description}</td>
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

export default ViewBookDetailsModal;
