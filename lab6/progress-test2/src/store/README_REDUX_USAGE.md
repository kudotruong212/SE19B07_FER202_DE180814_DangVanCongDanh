# Hướng dẫn sử dụng Redux trong ứng dụng

## Đã tích hợp Redux vào ứng dụng

### 1. Redux Store đã được cấu hình
- File: `src/store/store.js`
- Store đã được kết nối vào App.js thông qua `Provider` từ `react-redux`

### 2. Users Slice (usersSlice.js)

#### Cách sử dụng trong Components:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleAdminStatus, selectUsers, selectUsersLoading, selectUsersError } from '../store/usersSlice';

function MyComponent() {
    const dispatch = useDispatch();
    
    // Lấy data từ Redux store
    const users = useSelector(selectUsers);
    const isLoading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);
    
    // Fetch users khi component mount
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    
    // Toggle admin status
    const handleToggleAdmin = (userId) => {
        dispatch(toggleAdminStatus(userId));
    };
    
    return (
        // Your JSX
    );
}
```

#### Actions available:
- `fetchUsers()` - Async thunk để fetch danh sách users từ API
- `toggleAdminStatus(userId)` - Toggle role admin/user của một user

#### Selectors available:
- `selectUsers` - Lấy danh sách users
- `selectUsersLoading` - Lấy trạng thái loading
- `selectUsersError` - Lấy error message

### 3. Payments Slice (paymentsSlice.js)

#### Cách sử dụng trong Components:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, selectPayments, selectPaymentsLoading, selectPaymentsError, selectSuccessfulPayments } from '../store/paymentsSlice';

function AddPaymentComponent() {
    const dispatch = useDispatch();
    
    // Lấy data từ Redux store
    const payments = useSelector(selectPayments);
    const isLoading = useSelector(selectPaymentsLoading);
    const error = useSelector(selectPaymentsError);
    const successfulPayments = useSelector(selectSuccessfulPayments); // Chỉ lấy payments có status: 'SUCCESS'
    
    // Tạo payment mới
    const handleCreatePayment = async (paymentData) => {
        try {
            const result = await dispatch(createPayment(paymentData));
            
            if (createPayment.fulfilled.match(result)) {
                // Payment được tạo thành công
                console.log('Payment created:', result.payload);
            } else if (createPayment.rejected.match(result)) {
                // Có lỗi xảy ra
                if (result.payload === 'Tài khoản không đủ tiền') {
                    // Xử lý lỗi 402 - Tài khoản không đủ tiền
                    alert('Tài khoản không đủ tiền');
                } else {
                    // Xử lý các lỗi khác
                    alert(result.payload || 'Failed to create payment');
                }
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };
    
    return (
        // Your JSX
    );
}
```

#### Actions available:
- `createPayment(paymentData)` - Async thunk để tạo payment mới
  - Tự động thêm `status: 'SUCCESS'` cho payment mới
  - Xử lý lỗi 402 với message "Tài khoản không đủ tiền"

#### Selectors available:
- `selectPayments` - Lấy danh sách tất cả payments
- `selectPaymentsLoading` - Lấy trạng thái loading
- `selectPaymentsError` - Lấy error message
- `selectSuccessfulPayments` - Reselect selector để lấy chỉ các payments có `status: 'SUCCESS'`

### 4. Ví dụ sử dụng trong AddPaymentForm

Để sử dụng Redux trong AddPaymentForm, bạn có thể cập nhật như sau:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, selectPaymentsError, clearError } from '../store/paymentsSlice';

function AddPaymentForm() {
    const dispatch = useDispatch();
    const error = useSelector(selectPaymentsError);
    const isLoading = useSelector(selectPaymentsLoading);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearError()); // Clear error trước khi submit
        
        const result = await dispatch(createPayment({
            semester: formData.semester,
            courseName: formData.courseName,
            amount: Number(formData.amount),
            date: formData.date,
            userId: currentUser.id
        }));
        
        if (createPayment.fulfilled.match(result)) {
            // Success
            setSuccess(true);
            navigate('/home');
        } else if (createPayment.rejected.match(result)) {
            // Error đã được lưu trong Redux store
            // error sẽ tự động được cập nhật từ Redux
        }
    };
    
    return (
        // Your form JSX
        {error && <Alert variant="danger">{error}</Alert>}
    );
}
```

### 5. Lưu ý

- Redux store đã được tích hợp vào App.js, tất cả components có thể sử dụng Redux hooks
- PaymentContext vẫn đang hoạt động song song với Redux (có thể migrate dần dần)
- AuthContext vẫn sử dụng Context API (chưa migrate sang Redux)
- Khi sử dụng Redux, state được quản lý tập trung và có thể dễ dàng debug với Redux DevTools

### 6. Redux DevTools

Nếu đã cài đặt Redux DevTools Extension trong browser, bạn có thể:
- Xem tất cả actions được dispatch
- Xem state changes
- Time-travel debugging
- Export/import state

