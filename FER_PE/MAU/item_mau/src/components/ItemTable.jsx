// ============================================
// 🔄 HƯỚNG DẪN CHUYỂN ĐỔI - ItemTable.jsx
// ============================================
// BƯỚC 1: Đổi tên file từ "ItemTable.jsx" -> "[Object]Table.jsx" (ví dụ: "ProductTable.jsx")
// BƯỚC 2: Đổi tên component từ "ItemTable" -> "[Object]Table"
// BƯỚC 3: Đổi import từ "useItem" -> "use[Object]" (ví dụ: "useProduct")
// BƯỚC 4: Đổi import từ "ItemContext" -> "[Object]Context"
// BƯỚC 5: Cập nhật các fields hiển thị trong table columns
// BƯỚC 6: Cập nhật các hàm formatCurrency, formatDate, getStatusBadge, getConditionBadge
// BƯỚC 7: Cập nhật các text và labels cho phù hợp với đối tượng mới
// ============================================

import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Badge, Button } from 'react-bootstrap';
// ⚠️ CẦN ĐỔI: "useItem" -> "use[Object]" (ví dụ: "useProduct", "useBook")
import { useItem } from '../contexts/ItemContext';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
// ⚠️ CẦN ĐỔI: "ViewItemDetailsModal" -> "View[Object]DetailsModal"
import ViewItemDetailsModal from './ViewItemDetailsModal';
// ⚠️ CẦN ĐỔI: "EditItemModal" -> "Edit[Object]Modal"
import EditItemModal from './EditItemModal';
import ConfirmModal from './ConfirmModal';

// ⚠️ CẦN ĐỔI: "ItemTable" -> "[Object]Table" (ví dụ: "ProductTable", "BookTable")
const ItemTable = () => {
    // ⚠️ CẦN ĐỔI: "useItem" -> "use[Object]"
    // ⚠️ CẦN ĐỔI: "items", "totalItems", "totalValue", "deleteItem" -> tên phù hợp
    const { items, isLoading, error, totalItems, totalValue, deleteItem } = useItem();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

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

    // ⚠️ CẦN ĐỔI: Get status badge - cập nhật các status values theo đối tượng mới
    // Ví dụ: nếu là "books" -> "available", "borrowed", "reserved", "damaged"
    // Ví dụ: nếu là "products" -> "in-stock", "out-of-stock", "discontinued"
    const getStatusBadge = (status) => {
        const variants = {
            available: 'success',
            'in-use': 'primary',
            maintenance: 'warning',
            disposed: 'secondary',
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
    };

    // ⚠️ CẦN ĐỔI: Get condition badge - có thể xóa nếu đối tượng không có "condition"
    // Hoặc thay bằng badge khác (ví dụ: "rating", "quality", "grade")
    const getConditionBadge = (condition) => {
        const variants = {
            excellent: 'success',
            good: 'info',
            fair: 'warning',
            poor: 'danger',
        };
        return <Badge bg={variants[condition] || 'secondary'}>{condition}</Badge>;
    };

    // ⚠️ CẦN ĐỔI: Tham số "item" -> tên phù hợp (ví dụ: "product", "book")
    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setShowViewModal(true);
    };

    // ⚠️ CẦN ĐỔI: Tham số "item" -> tên phù hợp
    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    // ⚠️ CẦN ĐỔI: Tham số "item" -> tên phù hợp
    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    // ⚠️ CẦN ĐỔI: "deleteItem" -> "delete[Object]" (ví dụ: "deleteProduct")
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
                    {/* ⚠️ CẦN ĐỔI: "Danh Sách Items" -> "Danh Sách [Objects]" (ví dụ: "Danh Sách Sản phẩm") */}
                    <span className="fw-bold">Danh Sách Items</span>
                    <div className="d-flex gap-3">
                        {/* ⚠️ CẦN ĐỔI: "items" -> tên phù hợp (ví dụ: "sản phẩm", "sách") */}
                        <Badge bg="info" className="fs-6 px-3 py-2">
                            Tổng: {totalItems} items
                        </Badge>
                        {/* ⚠️ CẦN ĐỔI: "Tổng giá trị" -> có thể xóa nếu không cần, hoặc đổi thành "Tổng số lượng" */}
                        <Badge bg="success" className="fs-6 px-3 py-2">
                            Tổng giá trị: {formatCurrency(totalValue)}
                        </Badge>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    {/* ⚠️ CẦN ĐỔI: "items" -> tên phù hợp */}
                    {items.length === 0 ? (
                        <Alert variant="info" className="mb-0 m-3">
                            {/* ⚠️ CẦN ĐỔI: "items" -> tên phù hợp */}
                            Không có dữ liệu items nào.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0 align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center" style={{ width: '60px' }}>#</th>
                                        {/* ⚠️ CẦN ĐỔI: Các columns theo fields mới của đối tượng */}
                                        {/* Ví dụ: nếu là "books" -> "Title", "Author", "ISBN", "Category", "Price", "Status" */}
                                        {/* Ví dụ: nếu là "products" -> "Name", "SKU", "Category", "Brand", "Price", "Stock", "Status" */}
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Serial Number</th>
                                        <th>Location</th>
                                        <th className="text-center">Condition</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* ⚠️ CẦN ĐỔI: "items" -> tên phù hợp, "item" -> tên phù hợp */}
                                    {items.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            {/* ⚠️ CẦN ĐỔI: Các fields hiển thị theo đối tượng mới */}
                                            {/* Ví dụ: item.name -> item.title, item.brand -> item.author, etc. */}
                                            <td className="fw-semibold">{item.name}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.model}</td>
                                            <td className="text-muted">{item.serialNumber}</td>
                                            <td>{item.location}</td>
                                            {/* ⚠️ CẦN ĐỔI: Có thể xóa nếu không có "condition" */}
                                            <td className="text-center">
                                                {getConditionBadge(item.condition)}
                                            </td>
                                            <td className="text-end fw-bold text-success fs-6">
                                                {formatCurrency(item.price)}
                                            </td>
                                            <td className="text-center">
                                                {getStatusBadge(item.status)}
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
                                        <td colSpan="7" className="text-end fw-bold fs-5">Tổng kết:</td>
                                        <td className="text-end fw-bold fs-5 text-success">
                                            {formatCurrency(totalValue)}
                                        </td>
                                        <td className="text-center fw-bold fs-6">
                                            {totalItems} items
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* ⚠️ CẦN ĐỔI: "ViewItemDetailsModal" -> "View[Object]DetailsModal" */}
            {/* View Details Modal */}
            {selectedItem && (
                <ViewItemDetailsModal
                    show={showViewModal}
                    onHide={() => {
                        setShowViewModal(false);
                        setSelectedItem(null);
                    }}
                    item={selectedItem}
                />
            )}

            {/* ⚠️ CẦN ĐỔI: "EditItemModal" -> "Edit[Object]Modal" */}
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
            {/* ⚠️ CẦN ĐỔI: "item" -> tên phù hợp (ví dụ: "sản phẩm", "sách") */}
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
