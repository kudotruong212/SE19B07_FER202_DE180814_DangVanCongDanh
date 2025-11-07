//ItemGrid.jsx - Component hiển thị danh sách items dạng lưới (grid layout)
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay đổi các field hiển thị trong card theo object của bạn

import React, { useState } from 'react';
import { Card, Spinner, Alert, Badge, Button, Row, Col } from 'react-bootstrap';
import { useItem } from '../contexts/ItemContext';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import ViewDetailsModal from './ViewDetailsModal';

const ItemGrid = () => {
    const { items, isLoading, error } = useItem();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // Format số tiền
    // CẤU HÌNH: Thay đổi format này theo object của bạn (ví dụ: price, quantity, ...)
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    // Format giá USD (nếu cần)
    const formatUSD = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setShowViewModal(true);
    };

    const handleAddToCart = (item) => {
        // CẤU HÌNH: Thêm logic add to cart ở đây
        // Ví dụ: dispatch({ type: 'ADD_TO_CART', payload: item });
        alert(`Added ${item.name} to cart!`);
    };

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 mb-0">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">{error}</Alert>
        );
    }

    if (items.length === 0) {
        return (
            <Alert variant="info" className="mb-0">
                Không có dữ liệu items nào.
            </Alert>
        );
    }

    return (
        <>
            <Row className="g-4">
                {items.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="h-100 shadow-sm" style={{ transition: 'transform 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {/* Image */}
                            <div style={{ 
                                height: '200px', 
                                overflow: 'hidden',
                                backgroundColor: '#f8f9fa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {item.image ? (
                                    <Card.Img 
                                        variant="top" 
                                        src={item.image} 
                                        alt={item.name}
                                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '3rem'
                                    }}>
                                        {item.name?.charAt(0) || '?'}
                                    </div>
                                )}
                            </div>

                            <Card.Body className="d-flex flex-column">
                                {/* Name */}
                                <Card.Title className="fw-bold mb-3" style={{ minHeight: '48px' }}>
                                    {item.name}
                                </Card.Title>

                                {/* Specifications */}
                                <div className="mb-3 flex-grow-1">
                                    {/* CẤU HÌNH: Thay đổi các field này theo object của bạn */}
                                    {/* Year */}
                                    {item.year && (
                                        <p className="mb-2">
                                            <strong>Year:</strong> {item.year}
                                        </p>
                                    )}
                                    
                                    {/* Price */}
                                    <p className="mb-2">
                                        <strong>Price:</strong> 
                                        <span className="text-success fw-bold ms-2">
                                            {item.price ? formatCurrency(item.price) : formatUSD(item.priceUSD || 0)}
                                        </span>
                                    </p>
                                    
                                    {/* Stock */}
                                    {item.stock !== undefined && (
                                        <p className="mb-0">
                                            <strong>Stock:</strong> 
                                            <Badge 
                                                bg={item.stock > 5 ? 'success' : item.stock > 0 ? 'warning' : 'danger'} 
                                                className="ms-2"
                                            >
                                                {item.stock}
                                            </Badge>
                                        </p>
                                    )}

                                    {/* Category (nếu cần hiển thị) */}
                                    {item.category && (
                                        <Badge bg="secondary" className="mt-2">
                                            {item.category}
                                        </Badge>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex gap-2 mt-auto">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleViewDetails(item)}
                                        className="flex-fill d-flex align-items-center justify-content-center gap-1"
                                    >
                                        <FaEye /> View Details
                                    </Button>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => handleAddToCart(item)}
                                        className="flex-fill d-flex align-items-center justify-content-center gap-1"
                                    >
                                        <FaShoppingCart /> Add to Cart
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

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
        </>
    );
};

export default ItemGrid;


