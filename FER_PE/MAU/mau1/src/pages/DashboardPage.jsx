//DashboardPage.jsx - Trang hiển thị danh sách items và filter
// TEMPLATE: Thay đổi text và route từ 'item' thành đối tượng của bạn
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import ItemTable from '../components/ItemTable';

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Dashboard</h2>
                    {/* 📝 THAY ĐỔI: Thay '/items/add' và text 'Thêm Item' thành route và text của đối tượng của bạn */}
                    <Button
                        variant="success"
                        onClick={() => navigate('/items/add')}
                    >
                        <FaPlus className="me-2" />
                        Thêm Item
                    </Button>
                </div>

                <FilterBar />
                <ItemTable />
            </Container>    
        </>
    );
};

export default DashboardPage;

