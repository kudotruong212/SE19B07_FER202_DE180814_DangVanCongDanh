import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import CourseTable from '../components/CourseTable';

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content */}
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Dashboard - Course Management</h2>
                    <Button
                        variant="success"
                        onClick={() => navigate('/courses/add')}
                    >
                        <FaPlus className="me-2" />
                        Thêm Khóa Học
                    </Button>
                </div>

                <FilterBar />
                <CourseTable />
            </Container>    
        </>
    );
};

export default DashboardPage;
