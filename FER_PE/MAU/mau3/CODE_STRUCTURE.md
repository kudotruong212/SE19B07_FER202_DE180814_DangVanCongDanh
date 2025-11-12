# 📖 Tóm Tắt Cấu Trúc Code - Template Generic

## 🎯 Tổng Quan

Template này minh họa cách tổ chức code React với:
- **Context API + useReducer** cho state management
- **React Router** cho routing
- **Axios** cho API calls
- **Bootstrap** cho UI

## 📁 Chi Tiết Cấu Trúc

### 1. Contexts (State Management)

#### ItemContext.jsx
```javascript
// Quản lý state của items
- Initial State: { items: [], isLoading: false, error: null }
- Reducer Actions:
  * FETCH_START: Bắt đầu fetch data
  * FETCH_SUCCESS: Fetch thành công
  * FETCH_FAILURE: Fetch thất bại
  * UPDATE_ITEM: Cập nhật item
- Provider: ItemProvider
- Custom Hook: useItems()
```

**Cách hoạt động:**
1. Component mount → `useEffect` gọi `fetchItems()`
2. `fetchItems()` → dispatch `FETCH_START`
3. Gọi API → dispatch `FETCH_SUCCESS` hoặc `FETCH_FAILURE`
4. Components sử dụng `useItems()` để lấy data

#### AuthContext.jsx
```javascript
// Quản lý authentication
- Initial State: { isAuthenticated: false, user: null, isLoading: false, error: null }
- Reducer Actions:
  * LOGIN_START: Bắt đầu login
  * LOGIN_SUCCESS: Login thành công
  * LOGIN_FAILURE: Login thất bại
  * LOGOUT: Đăng xuất
  * CLEAR_ERROR: Xóa lỗi
- Provider: AuthProvider
- Custom Hook: useAuth()
- Lưu user vào localStorage
```

#### CartContext.jsx
```javascript
// Quản lý giỏ hàng
- Initial State: { items: [] }
- Reducer Actions:
  * ADD_TO_CART: Thêm vào cart
  * UPDATE_QUANTITY: Cập nhật số lượng
  * REMOVE_FROM_CART: Xóa khỏi cart
  * CLEAR_CART: Xóa toàn bộ cart
- Provider: CartProvider
- Custom Hook: useCart()
```

### 2. Services (API)

#### api.js
```javascript
// Các hàm gọi API
- getAccounts(): Lấy danh sách accounts
- getItems(): Lấy danh sách items
- getItemById(id): Lấy item theo ID
- updateItem(id, item): Cập nhật item
```

**Cách hoạt động:**
- Sử dụng axios với baseURL: `http://localhost:3001`
- Tất cả hàm đều async/await
- Throw error nếu có lỗi

### 3. Pages (Views)

#### ItemList.jsx
```javascript
// Trang danh sách items
- Sử dụng: useItems(), useCart()
- State: searchTerm, sortOrder, successMessage
- Features:
  * Hiển thị danh sách items
  * Search theo name
  * Sort theo price
  * Add to cart
  * Navigate to detail
```

**Flow:**
1. Load items từ context
2. Filter và sort với useMemo
3. Click "Add to Cart" → gọi API update stock → update context
4. Click "View Details" → navigate to `/view/:id`

#### ItemDetail.jsx
```javascript
// Trang chi tiết item
- Sử dụng: useParams(), useItems(), useCart()
- State: item, loading
- Features:
  * Hiển thị chi tiết item
  * Add to cart
  * Navigate back to list
```

**Flow:**
1. Lấy `id` từ URL params
2. Fetch item từ API
3. Hiển thị thông tin
4. Add to cart → update stock

#### Cart.jsx
```javascript
// Trang giỏ hàng
- Sử dụng: useCart(), useItems()
- State: showCheckoutModal, checkoutSuccess, checkoutTotal
- Features:
  * Hiển thị items trong cart
  * Update quantity
  * Remove item (restore stock)
  * Checkout
```

**Flow:**
1. Load items từ cart context
2. Update quantity → update stock trong API
3. Remove item → restore stock
4. Checkout → clear cart → redirect

#### LoginPage.jsx
```javascript
// Trang đăng nhập
- Component đơn giản, chỉ render LoginForm
```

### 4. Components

#### NavigationHeader.jsx
```javascript
// Thanh điều hướng
- Sử dụng: useAuth(), useNavigate()
- Features:
  * Hiển thị username
  * Links: Items, Cart
  * Logout button
```

#### LoginForm.jsx
```javascript
// Form đăng nhập
- Sử dụng: useReducer() cho form state
- Sử dụng: useAuth() cho authentication
- Features:
  * Validation real-time
  * Submit form
  * Success modal
  * Redirect sau login
```

**Form State Management:**
```javascript
// Sử dụng useReducer thay vì useState
const [formState, dispatch] = useReducer(formReducer, initialFormState);

// Actions:
- SET_FIELD: Cập nhật field value
- SET_ERROR: Set error cho field
- CLEAR_ERROR: Xóa error
- SET_ERRORS: Set nhiều errors
- RESET_FORM: Reset form
```

#### ConfirmModal.jsx
```javascript
// Modal xác nhận
- Props: show, title, message, onConfirm, onHide, etc.
- Reusable component
```

#### NotFound.jsx
```javascript
// Trang 404
- Hiển thị khi route không tồn tại
- Button back to list
```

### 5. Routes

#### AppRoutes.js
```javascript
// Định nghĩa routes
- BrowserRouter: Wrap toàn bộ app
- Routes: Container cho các route
- Route: Định nghĩa từng route
- PrivateRoute: Component bảo vệ routes
- Navigate: Redirect
```

**Routes:**
```
/ → Redirect to /items
/login → LoginPage (public)
/items → ItemList (protected)
/view/:id → ItemDetail (protected)
/cart → Cart (protected)
* → NotFound
```

**PrivateRoute:**
```javascript
// Kiểm tra isAuthenticated
// Nếu chưa login → redirect to /login
// Nếu đã login → render children
```

### 6. App.js

```javascript
// Root component
- Wrap app với các Providers:
  * AuthProvider (ngoài cùng)
  * ItemProvider
  * CartProvider (trong cùng)
- Render AppRoutes
```

**Provider Hierarchy:**
```
AuthProvider
  └── ItemProvider
      └── CartProvider
          └── AppRoutes
```

## 🔄 Data Flow

### Fetch Items Flow:
```
1. App.js mount
2. ItemProvider mount
3. useEffect trong ItemProvider
4. fetchItems() được gọi
5. dispatch FETCH_START
6. api.getItems()
7. dispatch FETCH_SUCCESS với data
8. ItemList component render với data
```

### Add to Cart Flow:
```
1. User click "Add to Cart"
2. handleAddToCart() được gọi
3. addToCart(item) → dispatch ADD_TO_CART
4. api.updateItem() → update stock trong server
5. updateItemStock() → dispatch UPDATE_ITEM
6. Success message hiển thị
```

### Login Flow:
```
1. User nhập username/password
2. handleSubmit() được gọi
3. Validate form
4. login() từ AuthContext
5. api.getAccounts()
6. Tìm account matching
7. dispatch LOGIN_SUCCESS
8. Lưu user vào localStorage
9. Navigate to /items
```

## 🎨 Pattern Sử Dụng

### 1. Context + Reducer Pattern
```javascript
// Tạo Context
const MyContext = createContext();

// Reducer
const myReducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, ...updates };
    default:
      return state;
  }
};

// Provider
const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(myReducer, initialState);
  // ... logic
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

// Custom Hook
const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

### 2. Protected Routes Pattern
```javascript
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
```

### 3. Form with useReducer Pattern
```javascript
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, formData: { ...state.formData, [action.field]: action.value } };
    // ... other actions
  }
};

const [formState, dispatch] = useReducer(formReducer, initialFormState);
```

## 📝 Best Practices

1. **Separation of Concerns:**
   - Contexts: State management
   - Services: API calls
   - Pages: Views
   - Components: Reusable UI

2. **Custom Hooks:**
   - Tạo custom hooks cho mỗi context
   - Kiểm tra context được dùng đúng Provider

3. **Error Handling:**
   - Try-catch trong API calls
   - Error state trong contexts
   - Hiển thị error messages

4. **Loading States:**
   - Loading state trong contexts
   - Hiển thị spinner khi loading

5. **Optimization:**
   - useMemo cho filtered/sorted data
   - useCallback cho functions (nếu cần)

## 🔍 Key Concepts

### useReducer vs useState
- **useState**: Đơn giản, tốt cho state đơn giản
- **useReducer**: Phức tạp, tốt cho state phức tạp, nhiều actions

### Context API
- Giải pháp cho prop drilling
- Tốt cho state global
- Kết hợp với useReducer để quản lý state phức tạp

### React Router
- Client-side routing
- Protected routes với PrivateRoute
- URL parameters với useParams
- Navigation với useNavigate

### Async Operations
- async/await trong API calls
- Loading states
- Error handling
- Update UI sau khi API success

## 🎯 Tóm Tắt

Template này minh họa:
1. ✅ Context API + useReducer cho state management
2. ✅ React Router cho routing và protected routes
3. ✅ API integration với axios
4. ✅ Component structure rõ ràng
5. ✅ Form handling với useReducer
6. ✅ Error handling và loading states
7. ✅ Reusable components

Tất cả được tổ chức trong một cấu trúc rõ ràng, dễ maintain và mở rộng.
