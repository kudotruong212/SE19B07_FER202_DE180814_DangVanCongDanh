# Template React App - Mẫu Chung cho CRUD Operations

Đây là một template React app được tổ chức dựa trên mẫu **progress-test1** (quản lý Payment), nhưng được thiết kế để dễ dàng thay đổi đối tượng từ **Item** sang bất kỳ đối tượng nào khác.

## 📋 Cấu trúc Dự án

```
mau1/
├── src/
│   ├── components/          # Các component UI
│   │   ├── LoginForm.jsx
│   │   ├── NavigationHeader.jsx
│   │   ├── FilterBar.jsx
│   │   ├── AddItemForm.jsx
│   │   ├── ItemTable.jsx
│   │   ├── ViewDetailsModal.jsx
│   │   ├── EditItemModal.jsx
│   │   └── ConfirmModal.jsx
│   ├── contexts/            # Context API + useReducer
│   │   ├── AuthContext.jsx   # Quản lý authentication (GIỮ NGUYÊN)
│   │   └── ItemContext.jsx    # Quản lý items (THAY ĐỔI THEO ĐỐI TƯỢNG)
│   ├── pages/                # Các trang
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── AddItemPage.jsx
│   ├── routes/               # Router configuration
│   │   └── AppRoutes.js
│   ├── services/             # API services
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── db.json                    # JSON Server database
└── package.json
```

## 🎯 Cách Tổ Chức Code

### 1. **Context API + useReducer Pattern**
- **AuthContext**: Quản lý authentication (login/logout)
- **ItemContext**: Quản lý state của items (CRUD operations, filters, sorting)

### 2. **Router với PrivateRoute**
- Sử dụng React Router v6
- `PrivateRoute` component để bảo vệ các route cần authentication
- Routes: `/login`, `/home`, `/items/add`

### 3. **API Service Pattern**
- Tách biệt logic API vào `services/api.js`
- Sử dụng axios để gọi JSON Server
- Các hàm: `getItems()`, `addItem()`, `updateItem()`, `deleteItem()`

### 4. **Component Structure**
- **Pages**: Wrapper components cho routes
- **Components**: Reusable UI components
- **Forms**: Sử dụng useReducer hoặc useState để quản lý form state

## 🔄 Hướng Dẫn Thay Đổi từ Item sang Đối Tượng Khác

Giả sử bạn muốn thay đổi từ **Item** sang **Product**:

### Bước 1: Thay đổi trong `services/api.js`
```javascript
// Tìm và thay: 'item' -> 'product', 'items' -> 'products'
export const getProducts = async () => { ... }
export const addProduct = async (product) => { ... }
export const updateProduct = async (id, product) => { ... }
export const deleteProduct = async (id) => { ... }
```

### Bước 2: Đổi tên và cập nhật `contexts/ItemContext.jsx`
- Đổi tên file: `ItemContext.jsx` → `ProductContext.jsx`
- Thay đổi:
  - `ItemContext` → `ProductContext`
  - `ItemProvider` → `ProductProvider`
  - `useItem` → `useProduct`
  - `item` → `product`
  - `items` → `products`
- Cập nhật các trường filter và sort theo Product

### Bước 3: Cập nhật `contexts/ItemContext.jsx` (hoặc ProductContext.jsx)
- Thay đổi các trường trong `initialItemState.filters`:
  ```javascript
  filters: {
      search: '',
      category: '',      // Thay đổi nếu Product không có category
      brand: '',         // Thêm trường mới nếu cần
  }
  ```
- Cập nhật reducer: `APPLY_FILTERS_AND_SORT` để filter theo các trường của Product
- Cập nhật các hàm: `getUniqueCategories()` → `getUniqueBrands()` (nếu cần)

### Bước 4: Cập nhật Components
- `AddItemForm.jsx` → `AddProductForm.jsx`
  - Thay đổi `formData` theo các trường của Product
  - Cập nhật validation
  - Thay `useItem()` → `useProduct()`

- `ItemTable.jsx` → `ProductTable.jsx`
  - Thay đổi các cột trong bảng
  - Cập nhật format hiển thị

- `EditItemModal.jsx` → `EditProductModal.jsx`
  - Tương tự AddProductForm

- `ViewDetailsModal.jsx`
  - Cập nhật các trường hiển thị

- `FilterBar.jsx`
  - Cập nhật các filter dropdown và sort options

### Bước 5: Cập nhật Pages
- `AddItemPage.jsx` → `AddProductPage.jsx`
- `DashboardPage.jsx`: Thay text và route `/items/add` → `/products/add`

### Bước 6: Cập nhật Routes
- `AppRoutes.js`: Thay route `/items/add` → `/products/add`

### Bước 7: Cập nhật `App.js`
```javascript
import { ProductProvider } from './contexts/ProductContext';

<AuthProvider>
  <ProductProvider>
    <AppRoutes />
  </ProductProvider>
</AuthProvider>
```

### Bước 8: Cập nhật `db.json`
```json
{
  "users": [...],
  "products": [
    {
      "id": "1",
      "userId": "1",
      "name": "Product Name",
      "brand": "Brand Name",
      "price": 1000000,
      "date": "2025-01-15"
    }
  ]
}
```

## 📝 Checklist Thay Đổi

Khi thay đổi từ Item sang đối tượng mới (ví dụ: Product):

- [ ] `services/api.js`: Thay `getItems`, `addItem`, `updateItem`, `deleteItem`
- [ ] `contexts/ItemContext.jsx`: Đổi tên và cập nhật filters, reducer
- [ ] `components/AddItemForm.jsx`: Cập nhật formData và validation
- [ ] `components/ItemTable.jsx`: Cập nhật columns và hiển thị
- [ ] `components/EditItemModal.jsx`: Cập nhật form
- [ ] `components/ViewDetailsModal.jsx`: Cập nhật fields hiển thị
- [ ] `components/FilterBar.jsx`: Cập nhật filters và sort options
- [ ] `pages/DashboardPage.jsx`: Cập nhật route và text
- [ ] `pages/AddItemPage.jsx`: Đổi tên file
- [ ] `routes/AppRoutes.js`: Cập nhật routes
- [ ] `App.js`: Cập nhật Provider
- [ ] `db.json`: Cập nhật database structure

## 🚀 Cách Chạy Dự Án

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy JSON Server (port 3001):**
```bash
npm run api
```

3. **Chạy React App (port 3000):**
```bash
npm start
```

4. **Truy cập ứng dụng:**
- Frontend: http://localhost:3000
- API: http://localhost:3001

## 🔐 Thông Tin Đăng Nhập Mặc Định

- Username: `admin` hoặc `user1`
- Password: `123456`

Hoặc:
- Email: `test@example.com`
- Password: `123456`

## 📚 Các Kiến Thức Đã Áp Dụng

1. **Context API + useReducer**: Quản lý global state
2. **React Router**: Navigation và route protection
3. **Axios**: HTTP client cho API calls
4. **React Bootstrap**: UI components
5. **JSON Server**: Mock REST API
6. **Form Validation**: Client-side validation
7. **CRUD Operations**: Create, Read, Update, Delete
8. **Filter & Sort**: Filtering và sorting dữ liệu

## 💡 Mẹo Quan Trọng

1. **Tìm kiếm và thay thế**: Sử dụng Find & Replace trong IDE để thay đổi nhanh:
   - `item` → `product` (hoặc tên đối tượng của bạn)
   - `items` → `products`
   - `Item` → `Product` (cho component names)

2. **Giữ nguyên**: Các file sau KHÔNG cần thay đổi khi chuyển đổi đối tượng:
   - `AuthContext.jsx`
   - `LoginForm.jsx`
   - `LoginPage.jsx`
   - `NavigationHeader.jsx` (chỉ cần đổi brand name)
   - `ConfirmModal.jsx`

3. **Chú ý**: Luôn kiểm tra các comments `📝 THAY ĐỔI` trong code để biết phần nào cần thay đổi.

## 📖 Ví Dụ Thay Đổi

### Ví dụ: Trường hợp đối tượng là "Order"

**Các trường của Order:**
- `orderId` (string)
- `customerName` (string)
- `orderDate` (date)
- `totalAmount` (number)
- `status` (string: "pending", "completed", "cancelled")

**Thay đổi cần thiết:**
1. `ItemContext` → `OrderContext`
2. Filters: `category`, `name` → `status`, `customerName`
3. Sort options: Thêm sort theo `totalAmount`, `orderDate`
4. Form fields: `name`, `category`, `price`, `date` → `customerName`, `orderDate`, `totalAmount`, `status`

## 🎓 Học Từ Template Này

Template này giúp bạn hiểu:
- Cách tổ chức code React theo pattern Context API + useReducer
- Cách sử dụng React Router với route protection
- Cách tách biệt API service layer
- Cách xây dựng CRUD operations hoàn chỉnh
- Cách implement filter và sort
- Cách tạo reusable components

---

**Chúc bạn học tốt! 🚀**
