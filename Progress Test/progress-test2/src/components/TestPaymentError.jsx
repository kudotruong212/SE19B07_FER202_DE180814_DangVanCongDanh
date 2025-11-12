// TestPaymentError.jsx - Component để test lỗi 402
import React, { useState } from 'react';
import { Card, Button, Alert, Container, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, clearError, selectPaymentsError, selectPaymentsLoading } from '../store/paymentsSlice';

const TestPaymentError = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectPaymentsError);
    const isLoading = useSelector(selectPaymentsLoading);
    
    const [testResult, setTestResult] = useState(null);

    // Test case 1: Tạo payment thành công (amount < 10 triệu)
    const testSuccess = async () => {
        setTestResult(null);
        dispatch(clearError());
        
        console.log('🧪 Starting Success test...');
        console.log('💰 Amount: 5,000,000 VND (should succeed)');
        
        try {
            const result = await dispatch(createPayment({
                semester: 'Fall 2025',
                courseName: 'Test Course - Success',
                amount: 5000000, // 5 triệu - sẽ thành công
                date: new Date().toISOString().split('T')[0],
                userId: '1',
            }));

            console.log('📊 Test result:', result);
            console.log('✅ Fulfilled?', createPayment.fulfilled.match(result));
            console.log('❌ Rejected?', createPayment.rejected.match(result));
            
            if (createPayment.fulfilled.match(result)) {
                console.log('✅ Test PASSED: Payment created successfully');
                setTestResult({ type: 'success', message: '✅ Test PASSED: Payment created successfully!', payload: result.payload });
            } else if (createPayment.rejected.match(result)) {
                console.error('⚠️ ERROR: Payment should have succeeded but it failed!');
                setTestResult({ type: 'error', message: `⚠️ Test FAILED: ${result.payload}`, payload: result });
            } else {
                console.error('⚠️ UNKNOWN result type');
                setTestResult({ type: 'error', message: 'Unknown result type', payload: result });
            }
        } catch (err) {
            console.error('❌ Unexpected error in test:', err);
            setTestResult({ type: 'error', message: `Unexpected error: ${err.message}`, payload: err });
        }
    };

    // Test case 2: Tạo payment thất bại (amount > 10 triệu) - Lỗi 402
    const testError402 = async () => {
        setTestResult(null);
        dispatch(clearError());
        
        console.log('🧪 Starting Error 402 test...');
        console.log('💰 Amount: 15,000,000 VND (should trigger 402 error)');
        
        try {
            const result = await dispatch(createPayment({
                semester: 'Fall 2025',
                courseName: 'Test Course - Error 402',
                amount: 15000000, // 15 triệu - sẽ lỗi 402
                date: new Date().toISOString().split('T')[0],
                userId: '1',
            }));

            console.log('📊 Test result:', result);
            console.log('✅ Fulfilled?', createPayment.fulfilled.match(result));
            console.log('❌ Rejected?', createPayment.rejected.match(result));
            
            if (createPayment.fulfilled.match(result)) {
                // Nếu thành công - ĐÂY LÀ LỖI! Phải reject mới đúng
                console.error('⚠️ ERROR: Payment should have failed but it succeeded!');
                setTestResult({ 
                    type: 'error', 
                    message: '⚠️ Test FAILED: Payment should have failed with 402 error but it succeeded!',
                    payload: result 
                });
            } else if (createPayment.rejected.match(result)) {
                // Đúng - phải reject
                console.log('✅ Test PASSED: Payment correctly rejected with error 402');
                console.log('📝 Error message:', result.payload);
                // Đặt type là 'success' để hiển thị màu xanh (test PASSED)
                setTestResult({ 
                    type: 'success', 
                    message: `✅ Test PASSED: Payment correctly rejected with error 402 - "${result.payload}"`, 
                    payload: result,
                    isErrorTest: true // Flag để biết đây là test error nhưng PASSED
                });
            } else {
                console.error('⚠️ UNKNOWN result type');
                setTestResult({ 
                    type: 'error', 
                    message: 'Unknown result type', 
                    payload: result 
                });
            }
        } catch (err) {
            console.error('❌ Unexpected error in test:', err);
            setTestResult({ 
                type: 'error', 
                message: `Unexpected error: ${err.message}`, 
                payload: err 
            });
        }
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-warning text-dark">
                    <h4 className="mb-0">
                        <Badge bg="danger" className="me-2">TEST</Badge>
                        Test Payment Error Handling
                    </h4>
                </Card.Header>
                <Card.Body>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Card className="border-success">
                                <Card.Header className="bg-success text-white">
                                    <h5>✅ Test Success Case</h5>
                                </Card.Header>
                                <Card.Body>
                                    <p className="text-muted">
                                        Tạo payment với amount &lt; 10,000,000 VND<br />
                                        <small>Kỳ vọng: Payment được tạo thành công</small>
                                    </p>
                                    <Button 
                                        variant="success" 
                                        onClick={testSuccess}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Testing...' : 'Test Success (5M VND)'}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="border-danger">
                                <Card.Header className="bg-danger text-white">
                                    <h5>❌ Test Error 402</h5>
                                </Card.Header>
                                <Card.Body>
                                    <p className="text-muted">
                                        Tạo payment với amount &gt; 10,000,000 VND<br />
                                        <small>Kỳ vọng: Lỗi 402 - "Tài khoản không đủ tiền"</small>
                                    </p>
                                    <Button 
                                        variant="danger" 
                                        onClick={testError402}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Testing...' : 'Test Error 402 (15M VND)'}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Hiển thị error từ Redux store */}
                    {error && (
                        <Alert variant="danger" className="mb-3">
                            <Alert.Heading>❌ Error từ Redux Store</Alert.Heading>
                            <p className="mb-0">
                                <strong>Error message:</strong> {error}
                            </p>
                            {error === 'Tài khoản không đủ tiền' && (
                                <>
                                    <hr />
                                    <p className="mb-0 small">
                                        ✅ <strong>Lỗi 402 đã được xử lý đúng!</strong><br />
                                        - Status code: 402 (Payment Required)<br />
                                        - Message: "Tài khoản không đủ tiền"<br />
                                        - Được xử lý bằng <code>rejectWithValue</code> trong Redux Toolkit
                                    </p>
                                </>
                            )}
                        </Alert>
                    )}

                    {/* Hiển thị kết quả test */}
                    {testResult && (
                        <Alert 
                            variant={testResult.message.includes('PASSED') ? 'success' : 'danger'} 
                            className="mb-3"
                        >
                            <Alert.Heading>
                                {testResult.message.includes('PASSED') 
                                    ? '✅ Test Result: PASSED' 
                                    : '❌ Test Result: FAILED'}
                            </Alert.Heading>
                            <p className="mb-0">
                                <strong>Message:</strong> {testResult.message}
                            </p>
                            {testResult.message.includes('PASSED') && testResult.isErrorTest && (
                                <>
                                    <hr />
                                    <p className="mb-0 small">
                                        💡 <strong>Lưu ý:</strong> Đây là kết quả đúng! Test Error 402 phải trả về rejected với message "Tài khoản không đủ tiền". 
                                        Nếu test trả về success thì có nghĩa là có vấn đề với server hoặc xử lý lỗi.
                                    </p>
                                </>
                            )}
                            {testResult.message.includes('FAILED') && (
                                <>
                                    <hr />
                                    <p className="mb-0 small text-danger">
                                        ⚠️ <strong>Cảnh báo:</strong> Test không hoạt động đúng! Vui lòng kiểm tra:
                                        <ul className="mt-2 mb-0">
                                            <li>API Server có đang chạy với <code>npm run api:test</code> không?</li>
                                            <li>Server có trả về lỗi 402 khi amount &gt; 10,000,000 không?</li>
                                            <li>Kiểm tra Console (F12) để xem logs chi tiết</li>
                                        </ul>
                                    </p>
                                </>
                            )}
                            <details className="mt-2">
                                <summary>Xem chi tiết (Payload)</summary>
                                <pre className="mt-2 small bg-light p-2 rounded" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                    {JSON.stringify(testResult.payload, null, 2)}
                                </pre>
                            </details>
                        </Alert>
                    )}

                    {/* Hướng dẫn */}
                    <Alert variant="info" className="mt-4">
                        <Alert.Heading>📝 Hướng dẫn kiểm tra</Alert.Heading>
                        <ol className="mb-0">
                            <li>Click "Test Success" để test trường hợp thành công</li>
                            <li>Click "Test Error 402" để test trường hợp lỗi 402</li>
                            <li>Kiểm tra error được hiển thị trong Redux store</li>
                            <li>Mở Redux DevTools để xem actions được dispatch</li>
                            <li>Mở Console (F12) để xem logs</li>
                        </ol>
                    </Alert>

                    {/* Kiểm tra Redux State */}
                    <Card className="mt-3 border-info">
                        <Card.Header className="bg-info text-white">
                            <h5>🔍 Redux State</h5>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-2">
                                <strong>Error:</strong> {error || 'null'}
                            </p>
                            <p className="mb-2">
                                <strong>Loading:</strong> {isLoading ? 'true' : 'false'}
                            </p>
                            <p className="mb-0 small text-muted">
                                💡 Mở Redux DevTools để xem chi tiết state và actions
                            </p>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TestPaymentError;

