import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { useBook } from '../contexts/BookContext';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ViewBookDetailsModal from './ViewBookDetailsModal';
import EditBookModal from './EditBookModal';
import ConfirmModal from './ConfirmModal';

const BookTable = () => {
    const { books, isLoading, error, totalBooks, totalValue, deleteBook } = useBook();
    const [selectedBook, setSelectedBook] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

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

    // Get status badge
    const getStatusBadge = (status) => {
        const variants = {
            available: 'success',
            borrowed: 'warning',
            reserved: 'info',
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
    };

    const handleViewDetails = (book) => {
        setSelectedBook(book);
        setShowViewModal(true);
    };

    const handleEdit = (book) => {
        setSelectedBook(book);
        setShowEditModal(true);
    };

    const handleDeleteClick = (book) => {
        setBookToDelete(book);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (bookToDelete) {
            const result = await deleteBook(bookToDelete.id);
            if (result.success) {
                setShowDeleteModal(false);
                setBookToDelete(null);
            }
        }
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
        setSelectedBook(null);
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
                    <span className="fw-bold">Danh Sách Sách</span>
                    <div className="d-flex gap-3">
                        <Badge bg="info" className="fs-6 px-3 py-2">
                            Tổng: {totalBooks} cuốn
                        </Badge>
                        <Badge bg="success" className="fs-6 px-3 py-2">
                            Tổng giá trị: {formatCurrency(totalValue)}
                        </Badge>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    {books.length === 0 ? (
                        <Alert variant="info" className="mb-0 m-3">
                            Không có dữ liệu sách nào.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0 align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center" style={{ width: '60px' }}>#</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book, index) => (
                                        <tr key={book.id}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            <td className="fw-semibold">{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>
                                                <Badge bg="secondary" className="px-2 py-1">
                                                    {book.category}
                                                </Badge>
                                            </td>
                                            <td className="text-end fw-bold text-success fs-6">
                                                {formatCurrency(book.price)}
                                            </td>
                                            <td className="text-center">
                                                {getStatusBadge(book.status)}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(book)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaEye /> View
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleEdit(book)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaPencilAlt /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(book)}
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
            {selectedBook && (
                <ViewBookDetailsModal
                    show={showViewModal}
                    onHide={() => {
                        setShowViewModal(false);
                        setSelectedBook(null);
                    }}
                    book={selectedBook}
                />
            )}

            {/* Edit Book Modal */}
            {selectedBook && (
                <EditBookModal
                    show={showEditModal}
                    onHide={() => {
                        setShowEditModal(false);
                        setSelectedBook(null);
                    }}
                    book={selectedBook}
                    onSuccess={handleEditSuccess}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setBookToDelete(null);
                }}
                title="Xác nhận xóa"
                message={bookToDelete ? `Bạn có chắc chắn muốn xóa sách "${bookToDelete.title}" không?` : ''}
                onConfirm={handleConfirmDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                confirmVariant="danger"
                showCancel={true}
            />
        </>
    );
};

export default BookTable;
