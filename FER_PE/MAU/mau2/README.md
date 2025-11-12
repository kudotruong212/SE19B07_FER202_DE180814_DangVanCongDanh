# 📦 Template Generic - React App với Context API + Router

Đây là template chung dựa trên cấu trúc của fer202-02, sử dụng "Item" làm entity mặc định. Template này có thể dễ dàng tùy chỉnh cho bất kỳ entity nào khác (Product, Book, Car, Motorbike, etc.).

## 🎯 Tính Năng

- ✅ **Context API + useReducer**: Quản lý state global
- ✅ **React Router**: Điều hướng và bảo vệ routes
- ✅ **API Integration**: Gọi API với axios (JSON Server)
- ✅ **Authentication**: Login/Logout với AuthContext
- ✅ **Cart Management**: Quản lý giỏ hàng
- ✅ **Protected Routes**: PrivateRoute component
- ✅ **Form Handling**: useReducer cho form state
- ✅ **Bootstrap UI**: Giao diện đẹp với React Bootstrap

## 📁 Cấu Trúc Thư Mục

```
src/
├── contexts/          # State Management
│   ├── ItemContext.jsx    # Quản lý items (có thể đổi thành ProductContext, etc.)
│   ├── AuthContext.jsx    # Quản lý authentication
│   └── CartContext.jsx    # Quản lý giỏ hàng
├── services/          # API Services
│   └── api.js            # Các hàm gọi API
├── pages/             # Pages/Views
│   ├── ItemList.jsx      # Trang danh sách items
│   ├── ItemDetail.jsx    # Trang chi tiết item
│   ├── Cart.jsx          # Trang giỏ hàng
│   └── LoginPage.jsx     # Trang đăng nhập
├── components/        # Reusable Components
│   ├── NavigationHeader.jsx
│   ├── LoginForm.jsx
│   ├── ConfirmModal.jsx
│   └── NotFound.jsx
├── routes/           # Routing
│   └── AppRoutes.js     # Định nghĩa routes
└── App.js            # Root component với Providers
```

## 🚀 Cài Đặt và Chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy JSON Server (Terminal 1)

```bash
npm run api
```

Server sẽ chạy tại: `http://localhost:3001`

### 3. Chạy React App (Terminal 2)

```bash
npm start
```

App sẽ chạy tại: `http://localhost:3000`

## 🔧 Cách Tùy Chỉnh

Xem file **[CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md)** để biết cách chi tiết chuyển từ "Item" sang entity khác.

### Tóm Tắt Nhanh:

1. **Đổi tên Context**: `ItemContext` → `YourEntityContext`
2. **Đổi tên Pages**: `ItemList` → `YourEntityList`
3. **Đổi Routes**: `/items` → `/yourentities`
4. **Đổi API Endpoint**: `/items` → `/yourentities`
5. **Cập nhật db.json**: `"items"` → `"yourentities"`
6. **Cập nhật Fields**: Thay `name`, `category` bằng fields của bạn

## 📚 Các Khái Niệm Đã Học

### 1. Context API
- Tạo Context với `createContext()`
- Tạo Provider component
- Sử dụng custom hook để truy cập context

### 2. useReducer
- Quản lý state phức tạp
- Actions và Reducers
- Dispatch actions để cập nhật state

### 3. React Router
- `BrowserRouter`, `Routes`, `Route`
- `Navigate` để redirect
- `useNavigate`, `useParams` hooks
- Protected Routes với PrivateRoute

### 4. API Integration
- Axios để gọi API
- Async/await
- Error handling

### 5. Component Structure
- Pages: Các trang chính
- Components: Reusable components
- Contexts: State management
- Services: API calls

## 📝 db.json Structure

```json
{
  "items": [
    {
      "id": "1",
      "name": "Sample Item",
      "category": "Category A",
      "price": 100,
      "stock": 10,
      "image": "/images/items/item1.jpg",
      "description": "Description"
    }
  ],
  "accounts": [
    {
      "id": "1",
      "username": "admin",
      "password": "admin123"
    }
  ]
}
```

## 🔑 Default Accounts

- Username: `admin`, Password: `admin123`
- Username: `user`, Password: `user123`

## 🎨 Tùy Chỉnh Fields

Template mặc định sử dụng:
- `id`: ID
- `name`: Tên
- `category`: Danh mục
- `price`: Giá
- `stock`: Tồn kho
- `image`: Hình ảnh
- `description`: Mô tả

Bạn có thể thay đổi các field này trong:
1. `db.json` - Cấu trúc dữ liệu
2. `ItemList.jsx` - Hiển thị danh sách
3. `ItemDetail.jsx` - Hiển thị chi tiết

## 📖 Tài Liệu Tham Khảo

- [React Context API](https://react.dev/reference/react/createContext)
- [React Router](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Axios](https://axios-http.com/)
- [JSON Server](https://github.com/typicode/json-server)

## 💡 Tips

- Sử dụng Find & Replace khi đổi tên entity
- Kiểm tra console để debug
- Đảm bảo endpoint API khớp với db.json
- Test sau mỗi bước thay đổi

## 📄 License

Template này được tạo để học tập và tham khảo.