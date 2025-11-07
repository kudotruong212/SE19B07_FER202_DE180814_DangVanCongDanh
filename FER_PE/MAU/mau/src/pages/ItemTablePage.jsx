//ItemTablePage.jsx - Mẫu trang hiển thị danh sách items dạng BẢNG (Table)
// CÁCH SỬ DỤNG: Thay "Item" bằng tên object của bạn (ví dụ: Product, Order, ...)
// Thay đổi route path và button text theo object của bạn
// Đây là MẪU RIÊNG cho Table View

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import ItemTable from '../components/ItemTable';

const ItemTablePage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content - TABLE VIEW */}
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Item List (Table View)</h2>
                    {/* CẤU HÌNH: Thay đổi route path và button text theo object của bạn */}
                    <Button
                        variant="success"
                        onClick={() => navigate('/items/add')}
                    >
                        <FaPlus className="me-2" />
                        Thêm Item
                    </Button>
                </div>

                {/* Filter Bar cho Table View */}
                <FilterBar />

                {/* Table Component */}
                <ItemTable />
            </Container>    
        </>
    );
};

export default ItemTablePage;


