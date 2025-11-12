# 🎯 Hướng Dẫn Tùy Chỉnh Template Generic

Template này là một mẫu chung dựa trên cấu trúc của fer202-02, sử dụng "Item" làm entity mặc định. Bạn có thể dễ dàng thay đổi thành bất kỳ entity nào khác (Product, Book, Car, Motorbike, etc.).

## 📁 Cấu Trúc Code

### 1. **Contexts (State Management)**
- **ItemContext.jsx**: Quản lý state của items bằng Context API + useReducer
- **AuthContext.jsx**: Quản lý authentication
- **CartContext.jsx**: Quản lý giỏ hàng

### 2. **Services (API)**
- **api.js**: Các hàm gọi API tới JSON Server

### 3. **Pages (Views)**
- **ItemList.jsx**: Trang danh sách items
- **ItemDetail.jsx**: Trang chi tiết item
- **Cart.jsx**: Trang giỏ hàng
- **LoginPage.jsx**: Trang đăng nhập

### 4. **Components (Reusable)**
- **NavigationHeader.jsx**: Thanh điều hướng
- **LoginForm.jsx**: Form đăng nhập
- **ConfirmModal.jsx**: Modal xác nhận
- **NotFound.jsx**: Trang 404

### 5. **Routes**
- **AppRoutes.js**: Định nghĩa các routes với React Router

## 🔄 Cách Tùy Chỉnh: Từ "Item" Sang Entity Khác

Ví dụ: Chuyển từ "Item" sang "Product"

### Bước 1: Đổi tên Context và Hook

**File: `src/contexts/ItemContext.jsx` → `ProductContext.jsx`**

1. Đổi tên file: `ItemContext.jsx` → `ProductContext.jsx`
2. Thay thế toàn bộ:
   - `ItemContext` → `ProductContext`
   - `ItemProvider` → `ProductProvider`
   - `useItems` → `useProducts`
   - `items` → `products`
   - `item` → `product`

**Ví dụ:**
```javascript
// Trước
const ItemContext = createContext();
export const useItems = () => { ... }

// Sau
const ProductContext = createContext();
export const useProducts = () => { ... }
```

### Bước 2: Cập nhật API Service

**File: `src/services/api.js`**

1. Đổi endpoint API:
```javascript
// Trước
export const getItems = async () => {
    const response = await API.get('/items');
    return response.data;
};

// Sau
export const getProducts = async () => {
    const response = await API.get('/products');
    return response.data;
};
```

2. Đổi các hàm tương ứng: `getItemById` → `getProductById`, `updateItem` → `updateProduct`

### Bước 3: Đổi tên Pages

**File: `src/pages/ItemList.jsx` → `ProductList.jsx`**

1. Đổi tên file
2. Thay thế:
   - `ItemList` → `ProductList`
   - `useItems` → `useProducts`
   - `items` → `products`
   - `item` → `product`

3. **QUAN TRỌNG**: Cập nhật các field hiển thị theo entity của bạn:
   - Thay `item.name` bằng field tương ứng (ví dụ: `product.productName`, `book.title`)
   - Thay `item.category` bằng field phù hợp
   - Cập nhật các Badge và thông tin hiển thị

**Ví dụ cho Product:**
```javascript
// Thay
<Card.Title>{item.name}</Card.Title>
<Badge bg="info">Category: {item.category}</Badge>

// Bằng
<Card.Title>{product.productName}</Card.Title>
<Badge bg="info">Brand: {product.brand}</Badge>
```

**File: `src/pages/ItemDetail.jsx` → `ProductDetail.jsx`**

Tương tự như trên, đổi tên và cập nhật fields.

### Bước 4: Cập nhật Routes

**File: `src/routes/AppRoutes.js`**

1. Đổi import:
```javascript
// Trước
import ItemList from '../pages/ItemList';
import ItemDetail from '../pages/ItemDetail';

// Sau
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
```

2. Đổi routes:
```javascript
// Trước
<Route path="/items" element={<PrivateRoute><ItemList /></PrivateRoute>} />
<Route path="/view/:id" element={<PrivateRoute><ItemDetail /></PrivateRoute>} />

// Sau
<Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
<Route path="/view/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
```

3. Cập nhật redirect:
```javascript
// Trước
<Route path="/" element={<Navigate to="/items" replace />} />

// Sau
<Route path="/" element={<Navigate to="/products" replace />} />
```

### Bước 5: Cập nhật Components

**File: `src/components/NavigationHeader.jsx`**

```javascript
// Trước
<Navbar.Brand as={Link} to="/items">Item Shop</Navbar.Brand>
<Nav.Link as={Link} to="/items">Items</Nav.Link>

// Sau
<Navbar.Brand as={Link} to="/products">Product Shop</Navbar.Brand>
<Nav.Link as={Link} to="/products">Products</Nav.Link>
```

**File: `src/components/LoginForm.jsx`**

```javascript
// Trước
navigate('/items');

// Sau
navigate('/products');
```

**File: `src/components/NotFound.jsx`**

```javascript
// Trước
<Button variant="primary" onClick={() => navigate('/items')}>
  Back to Item List
</Button>

// Sau
<Button variant="primary" onClick={() => navigate('/products')}>
  Back to Product List
</Button>
```

### Bước 6: Cập nhật App.js

**File: `src/App.js`**

```javascript
// Trước
import { ItemProvider } from './contexts/ItemContext';

<ItemProvider>
  ...
</ItemProvider>

// Sau
import { ProductProvider } from './contexts/ProductContext';

<ProductProvider>
  ...
</ProductProvider>
```

### Bước 7: Cập nhật db.json

**File: `db.json`**

```json
{
  "products": [
    {
      "id": "1",
      "productName": "Sample Product",
      "brand": "Brand A",
      "price": 100,
      "stock": 10,
      "image": "/images/products/product1.jpg",
      "description": "Product description"
    }
  ],
  "accounts": [...]
}
```

**LƯU Ý**: Key trong JSON phải khớp với endpoint trong API service!

## 📋 Checklist Tùy Chỉnh Nhanh

Khi chuyển từ "Item" sang entity mới (ví dụ: "Product"):

- [ ] Đổi tên file: `ItemContext.jsx` → `ProductContext.jsx`
- [ ] Đổi tên file: `ItemList.jsx` → `ProductList.jsx`
- [ ] Đổi tên file: `ItemDetail.jsx` → `ProductDetail.jsx`
- [ ] Cập nhật tất cả imports
- [ ] Thay `ItemContext` → `ProductContext`
- [ ] Thay `ItemProvider` → `ProductProvider`
- [ ] Thay `useItems` → `useProducts`
- [ ] Thay `items` → `products`
- [ ] Thay `item` → `product`
- [ ] Thay `/items` → `/products` (routes)
- [ ] Cập nhật endpoint API: `/items` → `/products`
- [ ] Cập nhật db.json: `"items"` → `"products"`
- [ ] Cập nhật các field hiển thị (name, category, etc.)
- [ ] Cập nhật NavigationHeader (brand name, links)
- [ ] Cập nhật NotFound (route và message)
- [ ] Cập nhật App.js (Provider)

## 🎨 Tùy Chỉnh Fields Hiển Thị

Template mặc định sử dụng các field:
- `id`: ID của item
- `name`: Tên item
- `category`: Danh mục
- `price`: Giá
- `stock`: Tồn kho
- `image`: Hình ảnh
- `description`: Mô tả

**Cách thay đổi:**

1. **Trong db.json**: Đổi tên các field theo ý bạn
2. **Trong ItemList.jsx**: Cập nhật các dòng hiển thị:
   ```javascript
   // Thay item.name bằng field của bạn
   <Card.Title>{item.yourFieldName}</Card.Title>
   
   // Thay item.category bằng field của bạn
   <Badge bg="info">{item.yourCategoryField}</Badge>
   ```
3. **Trong ItemDetail.jsx**: Tương tự cập nhật các field
4. **Trong api.js**: Không cần đổi (API chỉ trả về data từ server)

## 🔍 Tìm và Thay Thế Nhanh

Sử dụng Find & Replace trong IDE:

1. **ItemContext** → **ProductContext**
2. **ItemProvider** → **ProductProvider**
3. **useItems** → **useProducts**
4. **items** → **products** (cẩn thận với "items" trong CartContext - giữ nguyên!)
5. **item** → **product**
6. **/items** → **/products**
7. **ItemList** → **ProductList**
8. **ItemDetail** → **ProductDetail**

**LƯU Ý**: Khi thay thế, cẩn thận với:
- `items` trong CartContext (giữ nguyên vì đó là items trong cart)
- `item` trong các hàm map/filter (có thể đổi thành `product`)

## 📝 Ví Dụ: Chuyển Sang "Motorbike"

Nếu muốn chuyển về "Motorbike" như trong fer202-02:

1. Đổi `ItemContext` → `MotorbikeContext`
2. Đổi `ItemList` → `MotorbikeList`
3. Đổi `ItemDetail` → `MotorbikeDetail`
4. Đổi `/items` → `/motorbikes`
5. Đổi endpoint API: `/items` → `/motorbikes`
6. Đổi db.json: `"items"` → `"motorbikes"`
7. Cập nhật fields: `name` → `model`, `category` → `brand`, thêm `year`

## 🚀 Chạy Ứng Dụng

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy JSON Server (terminal 1):**
   ```bash
   npm run api
   ```

3. **Chạy React App (terminal 2):**
   ```bash
   npm start
   ```

4. Truy cập: `http://localhost:3000`

## 📚 Kiến Thức Đã Học

Template này minh họa:

1. **Context API**: Quản lý state global
2. **useReducer**: Quản lý state phức tạp
3. **React Router**: Điều hướng và bảo vệ routes
4. **API Integration**: Gọi API với axios
5. **Component Structure**: Tổ chức code rõ ràng
6. **State Management**: Kết hợp Context + Reducer
7. **Protected Routes**: PrivateRoute component
8. **Form Handling**: useReducer cho form state

## 💡 Tips

- Luôn test sau mỗi bước thay đổi
- Sử dụng Find & Replace cẩn thận
- Kiểm tra console để tìm lỗi
- Đảm bảo endpoint API khớp với db.json
- Cập nhật tất cả imports khi đổi tên file

## ❓ Câu Hỏi Thường Gặp

**Q: Có cần đổi tên CartContext không?**  
A: Không, CartContext dùng chung cho mọi entity.

**Q: Làm sao thêm field mới?**  
A: Thêm field vào db.json, sau đó cập nhật các component hiển thị.

**Q: Làm sao thay đổi màu sắc/UI?**  
A: Sửa các Badge variant và Bootstrap classes trong components.

**Q: Có thể dùng nhiều entity cùng lúc không?**  
A: Có, tạo thêm Context và Provider cho entity mới, thêm routes mới.
