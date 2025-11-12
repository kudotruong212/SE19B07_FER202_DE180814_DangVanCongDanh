import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import BookTable from '../components/BookTable';

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />

            {/* 2. Main Dashboard Content */}
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Dashboard - Library Management</h2>
                    <Button
                        variant="success"
                        onClick={() => navigate('/books/add')}
                    >
                        <FaPlus className="me-2" />
                        Thêm Sách
                    </Button>
                </div>

                <FilterBar />
                <BookTable />
            </Container>    
        </>
    );
};

export default DashboardPage;
