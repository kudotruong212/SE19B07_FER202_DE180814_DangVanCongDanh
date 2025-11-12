# 📚 Hướng Dẫn Sử Dụng Template Generic

## 🎯 Mục Đích

Template này được tạo dựa trên cấu trúc code của **fer202-02**, nhưng sử dụng **"Item"** làm entity chung thay vì "Motorbike". Điều này giúp bạn dễ dàng thay đổi sang bất kỳ entity nào khác.

## 📦 Những Gì Đã Được Tạo

### ✅ Cấu Trúc Thư Mục Hoàn Chỉnh

```
mau2/
├── src/
│   ├── contexts/           # State Management
│   │   ├── ItemContext.jsx     # Quản lý items (generic)
│   │   ├── AuthContext.jsx     # Quản lý authentication
│   │   └── CartContext.jsx     # Quản lý giỏ hàng
│   ├── services/           # API Services
│   │   └── api.js              # Các hàm gọi API
│   ├── pages/              # Pages/Views
│   │   ├── ItemList.jsx        # Trang danh sách items
│   │   ├── ItemDetail.jsx      # Trang chi tiết item
│   │   ├── Cart.jsx            # Trang giỏ hàng
│   │   └── LoginPage.jsx       # Trang đăng nhập
│   ├── components/         # Reusable Components
│   │   ├── NavigationHeader.jsx
│   │   ├── LoginForm.jsx
│   │   ├── ConfirmModal.jsx
│   │   └── NotFound.jsx
│   ├── routes/            # Routing
│   │   └── AppRoutes.js       # Định nghĩa routes
│   ├── App.js             # Root component
│   └── App.css            # Styles
├── db.json                # Database mẫu (JSON Server)
├── README.md              # Hướng dẫn tổng quan
├── CUSTOMIZATION_GUIDE.md # Hướng dẫn tùy chỉnh chi tiết
├── CODE_STRUCTURE.md      # Giải thích cấu trúc code
└── HUONG_DAN.md          # File này
```

## 🚀 Cách Chạy

### Bước 1: Cài Đặt Dependencies

```bash
cd FER_PE/MAU/mau2
npm install
```

### Bước 2: Chạy JSON Server (Terminal 1)

```bash
npm run api
```

Server sẽ chạy tại: `http://localhost:3001`

### Bước 3: Chạy React App (Terminal 2)

```bash
npm start
```

App sẽ mở tại: `http://localhost:3000`

### Bước 4: Đăng Nhập

- Username: `admin`
- Password: `admin123`

Hoặc:
- Username: `user`
- Password: `user123`

## 🔄 Cách Thay Đổi Entity

### Ví Dụ: Chuyển từ "Item" sang "Product"

#### 1. Đổi Tên Files

```bash
# Đổi tên files
ItemContext.jsx → ProductContext.jsx
ItemList.jsx → ProductList.jsx
ItemDetail.jsx → ProductDetail.jsx
```

#### 2. Find & Replace Trong Tất Cả Files

Sử dụng Find & Replace trong IDE:

- `ItemContext` → `ProductContext`
- `ItemProvider` → `ProductProvider`
- `useItems` → `useProducts`
- `items` → `products` (cẩn thận với "items" trong CartContext)
- `item` → `product`
- `/items` → `/products`
- `ItemList` → `ProductList`
- `ItemDetail` → `ProductDetail`

#### 3. Cập Nhật API Endpoint

**File: `src/services/api.js`**

```javascript
// Đổi từ
export const getItems = async () => {
    const response = await API.get('/items');
    return response.data;
};

// Thành
export const getProducts = async () => {
    const response = await API.get('/products');
    return response.data;
};
```

#### 4. Cập Nhật db.json

```json
{
  "products": [  // Đổi từ "items"
    {
      "id": "1",
      "productName": "Sample Product",  // Có thể đổi field name
      "brand": "Brand A",
      "price": 100,
      "stock": 10,
      "image": "/images/products/product1.jpg",
      "description": "Description"
    }
  ]
}
```

#### 5. Cập Nhật Fields Hiển Thị

**File: `src/pages/ProductList.jsx`**

```javascript
// Thay các field theo entity của bạn
<Card.Title>{product.productName}</Card.Title>  // Thay vì item.name
<Badge bg="info">Brand: {product.brand}</Badge>  // Thay vì item.category
```

#### 6. Cập Nhật Routes

**File: `src/routes/AppRoutes.js`**

```javascript
// Đổi routes
<Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
<Route path="/" element={<Navigate to="/products" replace />} />
```

## 📚 Tài Liệu Tham Khảo

1. **README.md**: Tổng quan về template
2. **CUSTOMIZATION_GUIDE.md**: Hướng dẫn chi tiết cách tùy chỉnh
3. **CODE_STRUCTURE.md**: Giải thích cấu trúc code và các pattern

## 🎓 Kiến Thức Đã Học

Template này minh họa:

1. **Context API**: Quản lý state global
2. **useReducer**: Quản lý state phức tạp
3. **React Router**: Điều hướng và bảo vệ routes
4. **API Integration**: Gọi API với axios
5. **Component Structure**: Tổ chức code rõ ràng
6. **Form Handling**: useReducer cho form state
7. **Protected Routes**: PrivateRoute component

## 💡 Tips

- ✅ Luôn test sau mỗi bước thay đổi
- ✅ Sử dụng Find & Replace cẩn thận
- ✅ Kiểm tra console để tìm lỗi
- ✅ Đảm bảo endpoint API khớp với db.json
- ✅ Cập nhật tất cả imports khi đổi tên file

## ❓ Câu Hỏi Thường Gặp

**Q: Tại sao dùng "Item" thay vì "Motorbike"?**  
A: "Item" là tên chung, dễ dàng thay đổi sang bất kỳ entity nào.

**Q: Có thể dùng nhiều entity cùng lúc không?**  
A: Có, tạo thêm Context và Provider cho entity mới.

**Q: Làm sao thêm field mới?**  
A: Thêm field vào db.json, sau đó cập nhật components hiển thị.

**Q: CartContext có cần đổi không?**  
A: Không, CartContext dùng chung cho mọi entity.

## 🎯 Checklist Khi Tùy Chỉnh

- [ ] Đổi tên files (Context, Pages)
- [ ] Find & Replace tất cả references
- [ ] Cập nhật API endpoints
- [ ] Cập nhật db.json
- [ ] Cập nhật routes
- [ ] Cập nhật fields hiển thị
- [ ] Cập nhật NavigationHeader
- [ ] Test ứng dụng

## 📞 Hỗ Trợ

Nếu có vấn đề, kiểm tra:
1. Console errors
2. Network tab (API calls)
3. React DevTools (state)
4. File CUSTOMIZATION_GUIDE.md

---

**Chúc bạn học tập tốt! 🚀**
