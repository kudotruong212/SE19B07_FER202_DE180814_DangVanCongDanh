//DashboardPage.jsx - Trang hiển thị danh sách students và filter
// TEMPLATE: Thay đổi text và route từ 'student' thành đối tượng của bạn
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import StudentTable from '../components/StudentTable';

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container>
                <div className="d-flex justify-content-between align-students-center mb-3">
                    <h2>Dashboard</h2>
                    {/* 📝 THAY ĐỔI: Thay '/students/add' và text 'Thêm Student' thành route và text của đối tượng của bạn */}
                    <Button
                        variant="success"
                        onClick={() => navigate('/students/add')}
                    >
                        <FaPlus className="me-2" />
                        Thêm Student
                    </Button>
                </div>

                <FilterBar />
                <StudentTable />
            </Container>    
        </>
    );
};

export default DashboardPage;

