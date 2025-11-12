import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import SuccessfulPaymentsStats from '../components/SuccessfulPaymentsStats';

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
                    <Button
                        variant="success"
                        onClick={() => navigate('/payments/add')}
                    >
                        <FaPlus className="me-2" />
                        Thêm Thanh toán
                    </Button>
                </div>

                {/* Redux Selector Demo - Successful Payments Stats */}
                <SuccessfulPaymentsStats />

                <FilterBar />
                <PaymentTable />
            </Container>    
        </>
    );
};

export default DashboardPage;