//ItemGridPage.jsx - Mẫu trang hiển thị danh sách items dạng LƯỚI (Grid)
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay đổi route path và button text theo object của bạn
// Đây là MẪU RIÊNG cho Grid View

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import SimpleFilterBar from '../components/SimpleFilterBar';
import ItemGrid from '../components/ItemGrid';

const ItemGridPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content - GRID VIEW */}
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Item List (Grid View)</h2>
                    {/* CẤU HÌNH: Thay đổi route path và button text theo object của bạn */}
                    <Button
                        variant="success"
                        onClick={() => navigate('/items/add')}
                    >
                        <FaPlus className="me-2" />
                        Thêm Item
                    </Button>
                </div>

                {/* Simple Filter Bar cho Grid View */}
                <SimpleFilterBar />

                {/* Grid Component */}
                <ItemGrid />
            </Container>    
        </>
    );
};

export default ItemGridPage;


