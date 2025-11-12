// SuccessfulPaymentsStats.jsx - Component demo sử dụng selectSuccessfulPayments selector
import React, { useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectSuccessfulPayments, selectPayments, setPayments } from '../store/paymentsSlice';
import { usePayment } from '../contexts/PaymentContext';

const SuccessfulPaymentsStats = () => {
    const dispatch = useDispatch();
    // Lấy payments từ PaymentContext để sync vào Redux
    const { allPayments: contextPayments } = usePayment();
    
    // Sử dụng reselect selector để lấy chỉ các payments có status: 'SUCCESS'
    const successfulPayments = useSelector(selectSuccessfulPayments);
    const allPayments = useSelector(selectPayments);
    
    // Sync payments từ PaymentContext vào Redux store khi component mount hoặc payments thay đổi
    useEffect(() => {
        if (contextPayments && contextPayments.length > 0) {
            // Đảm bảo tất cả payments có status (mặc định là 'SUCCESS' nếu chưa có)
            const paymentsWithStatus = contextPayments.map(payment => ({
                ...payment,
                status: payment.status || 'SUCCESS'
            }));
            dispatch(setPayments(paymentsWithStatus));
        }
    }, [contextPayments, dispatch]);
    
    // Tính tổng số tiền của successful payments
    const totalSuccessfulAmount = successfulPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
    
    // Format số tiền
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    return (
        <Card className="mb-4 shadow-sm border-success">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                    <Badge bg="light" text="dark" className="me-2">
                        Redux Selector Demo
                    </Badge>
                    Successful Payments Statistics
                </h5>
            </Card.Header>
            <Card.Body>
                <div className="row text-center">
                    <div className="col-md-4">
                        <h6 className="text-muted">Total Payments</h6>
                        <h4 className="text-primary">{allPayments.length}</h4>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-muted">Successful Payments</h6>
                        <h4 className="text-success">
                            {successfulPayments.length}
                            <Badge bg="success" className="ms-2">
                                {allPayments.length > 0 
                                    ? Math.round((successfulPayments.length / allPayments.length) * 100) 
                                    : 0}%
                            </Badge>
                        </h4>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-muted">Total Successful Amount</h6>
                        <h4 className="text-success">{formatCurrency(totalSuccessfulAmount)}</h4>
                    </div>
                </div>
                <div className="mt-3">
                    <small className="text-muted">
                        <strong>Note:</strong> This component uses <code>selectSuccessfulPayments</code> selector 
                        from Redux to filter only payments with status: 'SUCCESS'. 
                        The selector is memoized using reselect for performance optimization.
                    </small>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SuccessfulPaymentsStats;

