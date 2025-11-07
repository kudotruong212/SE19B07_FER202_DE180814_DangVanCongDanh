//ItemTable.jsx - Component hiển thị danh sách items dạng bảng
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay đổi các field hiển thị trong bảng theo object của bạn

import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import { useItem } from '../contexts/ItemContext';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ViewDetailsModal from './ViewDetailsModal';
import EditItemModal from './EditItemModal';
import ConfirmModal from './ConfirmModal';

const ItemTable = () => {
    const { items, isLoading, error, totalAmount, deleteItem } = useItem();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Format số tiền
    // CẤU HÌNH: Thay đổi format này theo object của bạn (ví dụ: price, quantity, ...)
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

    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setShowViewModal(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            const result = await deleteItem(itemToDelete.id);
            if (result.success) {
                setShowDeleteModal(false);
                setItemToDelete(null);
            }
        }
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
        setSelectedItem(null);
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
                    <span className="fw-bold">Danh Sách Items</span>
                    {/* CẤU HÌNH: Thay đổi label và field này theo object của bạn */}
                    <Badge bg="success" className="fs-6 px-3 py-2">
                        Tổng: {formatCurrency(totalAmount)}
                    </Badge>
                </Card.Header>
                <Card.Body className="p-0">
                    {items.length === 0 ? (
                        <Alert variant="info" className="mb-0 m-3">
                            Không có dữ liệu items nào.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0 align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center" style={{ width: '60px' }}>#</th>
                                        {/* CẤU HÌNH: Thay đổi các cột này theo object của bạn */}
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            <td>
                                                <Badge bg="primary" className="px-3 py-2">
                                                    {item.category}
                                                </Badge>
                                            </td>
                                            <td className="fw-semibold">{item.name}</td>
                                            {/* CẤU HÌNH: Thay đổi field này theo object của bạn */}
                                            <td className="text-end fw-bold text-success fs-6">
                                                {formatCurrency(item.price)}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(item)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaEye /> View
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleEdit(item)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaPencilAlt /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(item)}
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
                                        {/* CẤU HÌNH: Thay đổi field này theo object của bạn */}
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
            {selectedItem && (
                <ViewDetailsModal
                    show={showViewModal}
                    onHide={() => {
                        setShowViewModal(false);
                        setSelectedItem(null);
                    }}
                    item={selectedItem}
                />
            )}

            {/* Edit Item Modal */}
            {selectedItem && (
                <EditItemModal
                    show={showEditModal}
                    onHide={() => {
                        setShowEditModal(false);
                        setSelectedItem(null);
                    }}
                    item={selectedItem}
                    onSuccess={handleEditSuccess}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                }}
                title="Xác nhận xóa"
                message={itemToDelete ? `Bạn có chắc chắn muốn xóa item "${itemToDelete.name}" không?` : ''}
                onConfirm={handleConfirmDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                confirmVariant="danger"
                showCancel={true}
            />
        </>
    );
};

export default ItemTable;


