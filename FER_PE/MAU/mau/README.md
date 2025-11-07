# Template Code Structure - Mẫu Tổ Chức Code

Template này được tạo ra dựa trên cấu trúc code của `progress-test1`, được tổng quát hóa để dễ dàng thay đổi object từ "Payment" sang "Item" hoặc bất kỳ object nào khác.

## 📁 Cấu Trúc Thư Mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── AddItemForm.jsx
│   ├── ConfirmModal.jsx
│   ├── EditItemModal.jsx
│   ├── FilterBar.jsx
│   ├── ItemTable.jsx
│   ├── LoginForm.jsx
│   ├── NavigationHeader.jsx
│   └── ViewDetailsModal.jsx
├── contexts/           # Context API cho state management
│   ├── AuthContext.jsx
│   └── ItemContext.jsx
├── pages/             # Các trang chính
│   ├── AddItemPage.jsx
│   ├── DashboardPage.jsx
│   └── LoginPage.jsx
├── routes/            # Cấu hình routing
│   └── AppRoutes.js
├── services/          # API calls
│   └── api.js
├── hooks/            # Custom hooks (nếu cần)
├── utils/            # Utility functions (nếu cần)
└── App.js            # Root component
```

## 🎯 Các Pattern Được Sử Dụng

### 1. Context API + useReducer Pattern

**ItemContext.jsx** sử dụng pattern:
- `createContext()` - Tạo context
- `useReducer()` - Quản lý state phức tạp
- Custom hook `useItem()` - Dễ dàng sử dụng trong components

**Lợi ích:**
- State management tập trung
- Dễ dàng debug với reducer
- Tách biệt logic khỏi UI

### 2. Routing Pattern

**AppRoutes.js** sử dụng:
- React Router v6
- Protected Routes với `PrivateRoute` component
- Nested routing nếu cần

**Các routes:**
- `/` - Redirect đến `/home`
- `/login` - Trang đăng nhập (public)
- `/home` - Dashboard (protected)
- `/items/add` - Thêm item mới (protected)

### 3. API Layer Pattern

**api.js** sử dụng:
- Axios instance với baseURL
- Tách biệt API calls khỏi components
- Error handling tập trung

**Các functions:**
- `getItems()` - Lấy danh sách
- `addItem(item)` - Thêm mới
- `updateItem(id, item)` - Cập nhật
- `deleteItem(id)` - Xóa

### 4. Component Pattern

**Các loại component:**
- **Page Components**: DashboardPage, AddItemPage
- **Form Components**: AddItemForm, EditItemModal
- **Table Components**: ItemTable
- **Modal Components**: ViewDetailsModal, ConfirmModal
- **Layout Components**: NavigationHeader

### 5. Form Validation Pattern

**AddItemForm.jsx** và **EditItemModal.jsx**:
- Real-time validation
- Error messages rõ ràng
- Disable submit khi đang loading

## 🔄 Cách Thay Đổi Object

Xem file **CONFIG.md** để biết chi tiết cách thay đổi từ "Item" sang object khác.

### Quick Guide:

1. **Đổi tên files**: `Item*` → `Product*` (ví dụ)
2. **Thay đổi trong code**: `Item` → `Product`, `item` → `product`, `items` → `products`
3. **Cập nhật fields**: Thay `category`, `name`, `price` theo object mới
4. **Cập nhật API endpoints**: `/items` → `/products`
5. **Cập nhật db.json**: Key `items` → `products`

## 🚀 Cách Chạy

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Chạy JSON Server (API):
```bash
npm run api
```

### 3. Chạy React App:
```bash
npm start
```

## 📝 Dữ Liệu Mẫu

File `db.json` chứa:
- **users**: Danh sách người dùng để đăng nhập
- **items**: Danh sách items mẫu

### Đăng nhập:
- Username: `nam123` / Password: `123456`
- Username: `hainguyen` / Password: `123456`

## 🎨 Tính Năng

- ✅ CRUD đầy đủ (Create, Read, Update, Delete)
- ✅ Authentication với Context API
- ✅ Protected Routes
- ✅ Filtering & Sorting
- ✅ Form Validation
- ✅ Modal Components
- ✅ Responsive Design với Bootstrap

## 📚 Các Concepts Được Áp Dụng

1. **Context API**: Quản lý global state
2. **useReducer**: Quản lý state phức tạp
3. **React Router**: Navigation và routing
4. **Axios**: HTTP client
5. **Bootstrap**: UI framework
6. **Custom Hooks**: Tái sử dụng logic
7. **Form Validation**: Client-side validation
8. **Error Handling**: Xử lý lỗi tập trung

## 🔍 File Quan Trọng

- **ItemContext.jsx**: State management chính
- **api.js**: Tất cả API calls
- **AppRoutes.js**: Cấu hình routing
- **ItemTable.jsx**: Component hiển thị danh sách
- **AddItemForm.jsx**: Form thêm mới
- **CONFIG.md**: Hướng dẫn thay đổi object

## 💡 Best Practices

1. **Tách biệt concerns**: Logic, UI, API tách riêng
2. **Reusable components**: Tái sử dụng components
3. **Error handling**: Xử lý lỗi ở mọi nơi
4. **Loading states**: Hiển thị loading khi cần
5. **Validation**: Validate input trước khi submit
6. **Comments**: Comment rõ ràng cho code phức tạp

## 🛠️ Công Nghệ Sử Dụng

- React 19
- React Router 6
- Axios
- Bootstrap 5
- React Bootstrap
- JSON Server

## 📖 Tài Liệu Tham Khảo

- [React Context API](https://react.dev/reference/react/useContext)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)

---

**Lưu ý**: Template này được thiết kế để dễ dàng customize và mở rộng. Hãy đọc kỹ CONFIG.md để biết cách thay đổi object một cách hiệu quả.
