# Hướng Dẫn Thay Đổi Object Trong Template

Template này được thiết kế để dễ dàng thay đổi từ "Item" sang bất kỳ object nào khác (ví dụ: Product, Order, Payment, Course, v.v.).

## 📋 Tổng Quan

Template hiện tại sử dụng **"Item"** làm object chính. Để thay đổi sang object khác (ví dụ: **"Product"**), bạn cần thực hiện các bước sau:

## 🔄 Các Bước Thay Đổi

### 1. Xác định tên object mới

Ví dụ: Muốn thay đổi từ "Item" sang "Product":
- **Singular Capitalized**: `Product` (cho tên class, component)
- **Singular Lowercase**: `product` (cho tên biến, function)
- **Plural Lowercase**: `products` (cho mảng, collection)

### 2. Thay đổi trong các file

#### A. File Context (`src/contexts/ItemContext.jsx`)

**Đổi tên file:**
- `ItemContext.jsx` → `ProductContext.jsx`

**Trong file, thay đổi:**
- `Item` → `Product`
- `item` → `product`
- `items` → `products`
- `ItemContext` → `ProductContext`
- `ItemProvider` → `ProductProvider`
- `useItem` → `useProduct`

**Thay đổi các fields trong state:**
```javascript
// Từ:
filters: {
    search: '',
    category: '',
    name: '',
}

// Sang (ví dụ với Product):
filters: {
    search: '',
    brand: '',      // Thay category thành brand
    productName: '', // Thay name thành productName
}
```

#### B. File API (`src/services/api.js`)

**Thay đổi:**
- `getItems` → `getProducts`
- `addItem` → `addProduct`
- `updateItem` → `updateProduct`
- `deleteItem` → `deleteProduct`
- `/items` → `/products` (endpoint)

#### C. File Routes (`src/routes/AppRoutes.js`)

**Thay đổi:**
- `ItemProvider` → `ProductProvider`
- `AddItemPage` → `AddProductPage`
- `/items/add` → `/products/add`

#### D. File App.js (`src/App.js`)

**Thay đổi:**
```javascript
// Từ:
import { ItemProvider } from './contexts/ItemContext';

// Sang:
import { ProductProvider } from './contexts/ProductContext';

// Và:
<ItemProvider> → <ProductProvider>
```

#### E. Components

**1. ItemTable.jsx → ProductTable.jsx**
- `Item` → `Product`
- `item` → `product`
- `items` → `products`
- `useItem` → `useProduct`
- `deleteItem` → `deleteProduct`
- Thay đổi các cột trong bảng theo object của bạn

**2. AddItemForm.jsx → AddProductForm.jsx**
- `Item` → `Product`
- `item` → `product`
- `useItem` → `useProduct`
- `addItem` → `addProduct`
- Thay đổi các field trong form theo object của bạn

**3. EditItemModal.jsx → EditProductModal.jsx**
- Tương tự như AddItemForm

**4. ViewDetailsModal.jsx → ViewDetailsModal.jsx**
- Thay đổi các field hiển thị theo object của bạn

**5. FilterBar.jsx**
- `useItem` → `useProduct`
- Thay đổi các filter fields theo object của bạn

#### F. Pages

**1. DashboardPage.jsx**
- `ItemTable` → `ProductTable`
- `/items/add` → `/products/add`
- "Thêm Item" → "Thêm Product"

**2. AddItemPage.jsx → AddProductPage.jsx**
- `AddItemForm` → `AddProductForm`

#### G. Database (`db.json`)

**Thay đổi key trong JSON:**
```json
{
  "users": [...],
  "items": [...]  // Đổi thành "products"
}
```

**Thay đổi cấu trúc object:**
```json
{
  "id": "1",
  "userId": "1",
  "category": "Electronics",  // Có thể đổi thành "brand"
  "name": "Laptop",            // Có thể đổi thành "productName"
  "price": 15000000,
  "date": "2025-09-25"
}
```

## 📝 Checklist Thay Đổi

- [ ] Đổi tên file `ItemContext.jsx` → `ProductContext.jsx`
- [ ] Cập nhật tất cả imports/exports
- [ ] Thay đổi tên context, provider, hook
- [ ] Cập nhật các fields trong state và reducer
- [ ] Đổi tên các functions trong API
- [ ] Cập nhật endpoint API
- [ ] Đổi tên các components
- [ ] Cập nhật các pages
- [ ] Cập nhật routes
- [ ] Cập nhật db.json
- [ ] Test tất cả các chức năng CRUD

## 🎯 Ví Dụ: Thay Đổi Từ "Item" Sang "Payment"

### Bước 1: Đổi tên Context
```javascript
// ItemContext.jsx → PaymentContext.jsx
const PaymentContext = createContext();
export const PaymentProvider = ({ children }) => { ... };
export const usePayment = () => useContext(PaymentContext);
```

### Bước 2: Cập nhật Fields
```javascript
// Thay đổi fields trong state
filters: {
    search: '',
    semester: '',      // Thay category thành semester
    courseName: '',    // Thay name thành courseName
}

// Thay đổi trong reducer
item.category → payment.semester
item.name → payment.courseName
item.price → payment.amount
```

### Bước 3: Cập nhật API
```javascript
// api.js
export const getPayments = async () => {
    const response = await API.get('/payments');
    return response.data;
};
```

### Bước 4: Cập nhật Components
```javascript
// PaymentTable.jsx
const { payments, isLoading, error, totalAmount, deletePayment } = usePayment();
```

### Bước 5: Cập nhật db.json
```json
{
  "payments": [
    {
      "id": "1",
      "userId": "1",
      "semester": "Fall 2025",
      "courseName": "Web Development",
      "amount": 3500000,
      "date": "2025-09-25"
    }
  ]
}
```

## 💡 Lưu Ý

1. **Consistency**: Đảm bảo thay đổi nhất quán trong tất cả các file
2. **Fields**: Tùy chỉnh các fields theo đúng yêu cầu của object mới
3. **Validation**: Cập nhật validation trong forms theo object mới
4. **UI Labels**: Cập nhật tất cả labels, buttons, titles trong UI
5. **Search & Replace**: Sử dụng Find & Replace trong IDE để đảm bảo không bỏ sót

## 🚀 Quick Replace Commands

Nếu dùng VS Code, bạn có thể dùng Find & Replace với:
- Find: `Item` → Replace: `Product`
- Find: `item` → Replace: `product`
- Find: `items` → Replace: `products`

**Lưu ý**: Cần kiểm tra từng thay đổi để đảm bảo không thay nhầm trong strings hoặc comments không cần thiết.

## 📚 Cấu Trúc Template

Template này bao gồm:

1. **Context/Reducer Pattern**: Quản lý state với useReducer
2. **API Layer**: Tách biệt logic gọi API
3. **Routing**: Protected routes với React Router
4. **Components**: Reusable components
5. **CRUD Operations**: Create, Read, Update, Delete đầy đủ
6. **Filtering & Sorting**: Lọc và sắp xếp dữ liệu
7. **Form Validation**: Validation cho forms

Tất cả các pattern này đều có thể áp dụng cho bất kỳ object nào!


