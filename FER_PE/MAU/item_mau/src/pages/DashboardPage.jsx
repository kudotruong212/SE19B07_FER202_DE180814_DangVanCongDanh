// ============================================
// 🔄 HƯỚNG DẪN CHUYỂN ĐỔI - DashboardPage.jsx
// ============================================
// BƯỚC 1: Đổi import từ "ItemTable" -> "[Object]Table" (ví dụ: "ProductTable")
// BƯỚC 2: Đổi import path từ "../components/ItemTable" -> "../components/[Object]Table"
// BƯỚC 3: Đổi component từ "<ItemTable />" -> "<[Object]Table />"
// BƯỚC 4: Đổi route path từ "/items/add" -> "/[objects]/add"
// BƯỚC 5: Cập nhật các text "Item Management", "Thêm Item" -> text phù hợp
// ============================================

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
// ⚠️ CẦN ĐỔI: "ItemTable" -> "[Object]Table" (ví dụ: "ProductTable", "BookTable")
// ⚠️ CẦN ĐỔI: "../components/ItemTable" -> "../components/[Object]Table"
import ItemTable from '../components/ItemTable';

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content */}
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* ⚠️ CẦN ĐỔI: "Item Management" -> "[Object] Management" (ví dụ: "Product Management") */}
                    <h2>Dashboard - Item Management</h2>
                    <Button
                        variant="success"
                        // ⚠️ CẦN ĐỔI: "/items/add" -> "/[objects]/add" (ví dụ: "/products/add")
                        onClick={() => navigate('/items/add')}
                    >
                        <FaPlus className="me-2" />
                        {/* ⚠️ CẦN ĐỔI: "Thêm Item" -> "Thêm [Object]" (ví dụ: "Thêm Sản phẩm") */}
                        Thêm Item
                    </Button>
                </div>

                <FilterBar />
                {/* ⚠️ CẦN ĐỔI: "<ItemTable />" -> "<[Object]Table />" */}
                <ItemTable />
            </Container>    
        </>
    );
};

export default DashboardPage;
