# 📚 TÓM TẮT CÁCH TỔ CHỨC CODE - Template React CRUD

## 🎯 Kiến Trúc Tổng Quan

Template này được tổ chức theo **layered architecture** với các lớp:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│   (Pages, Components, UI)            │
├─────────────────────────────────────┤
│         State Management            │
│   (Context API + useReducer)         │
├─────────────────────────────────────┤
│         Service Layer                │
│   (API calls, HTTP requests)        │
├─────────────────────────────────────┤
│         Data Layer                   │
│   (JSON Server, Database)           │
└─────────────────────────────────────┘
```

## 📂 Cấu Trúc Thư Mục và Vai Trò

### 1. **`contexts/`** - Quản Lý State Toàn Cục
- **AuthContext.jsx**: 
  - Quản lý authentication state (login/logout)
  - Sử dụng `useReducer` với các actions: `LOGIN_START`, `LOGIN_SUCCESS`, `LOGIN_FAILURE`, `LOGOUT`
  - Lưu user vào localStorage để persist session
  - Export `useAuth()` hook để sử dụng trong components

- **ItemContext.jsx**:
  - Quản lý state của items (CRUD operations)
  - Sử dụng `useReducer` với các actions: `FETCH_START`, `FETCH_SUCCESS`, `SET_FILTER`, `SET_SORT`, `ADD_ITEM`, `UPDATE_ITEM`, `DELETE_ITEM`
  - Tự động filter và sort khi state thay đổi
  - Export `useItem()` hook

**Pattern sử dụng:**
```javascript
// 1. Tạo Context
const ItemContext = createContext();

// 2. Tạo Reducer
const itemReducer = (state, action) => { ... }

// 3. Tạo Provider với useReducer
export const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);
  // ... actions
  return <ItemContext.Provider value={contextValue}>{children}</ItemContext.Provider>
}

// 4. Tạo Custom Hook
export const useItem = () => useContext(ItemContext);
```

### 2. **`services/`** - API Service Layer
- **api.js**: 
  - Tách biệt logic API calls khỏi components
  - Sử dụng axios để gọi JSON Server
  - Các hàm: `getItems()`, `addItem()`, `updateItem()`, `deleteItem()`
  - Trả về data hoặc throw error

**Pattern:**
```javascript
export const getItems = async () => {
  try {
    const response = await API.get('/items');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
};
```

### 3. **`routes/`** - Router Configuration
- **AppRoutes.js**:
  - Định nghĩa tất cả routes của ứng dụng
  - `PrivateRoute` component để bảo vệ routes cần authentication
  - Sử dụng React Router v6 (BrowserRouter, Routes, Route, Navigate)

**Pattern:**
```javascript
<PrivateRoute>
  <DashboardPage />
</PrivateRoute>
```

### 4. **`pages/`** - Page Components
- **LoginPage.jsx**: Wrapper cho LoginForm
- **DashboardPage.jsx**: Trang chính hiển thị danh sách và filter
- **AddItemPage.jsx**: Wrapper cho AddItemForm

**Pattern:** Pages là wrapper components, logic nằm trong Components

### 5. **`components/`** - Reusable Components

#### **Forms:**
- **LoginForm.jsx**: 
  - Sử dụng `useReducer` để quản lý form state
  - Validation real-time
  - Sử dụng `useAuth()` để login

- **AddItemForm.jsx**:
  - Sử dụng `useState` để quản lý form state
  - Validation trước khi submit
  - Sử dụng `useItem()` để add item

#### **Display Components:**
- **ItemTable.jsx**:
  - Hiển thị danh sách items dạng table
  - Sử dụng `useItem()` để lấy data
  - Có các actions: View, Edit, Delete (với modals)

- **FilterBar.jsx**:
  - Component filter và sort
  - Sử dụng `useItem()` để set filter và sort

#### **Modals:**
- **ViewDetailsModal.jsx**: Hiển thị chi tiết item
- **EditItemModal.jsx**: Form chỉnh sửa item (tương tự AddItemForm)
- **ConfirmModal.jsx**: Modal xác nhận hành động (reusable)

#### **Layout:**
- **NavigationHeader.jsx**: Header với thông tin user và logout button

## 🔄 Luồng Dữ Liệu (Data Flow)

### 1. **Authentication Flow:**
```
User nhập login form
  ↓
LoginForm gọi login() từ AuthContext
  ↓
AuthContext gọi api.getUsers()
  ↓
Kiểm tra credentials
  ↓
Dispatch LOGIN_SUCCESS → Lưu vào localStorage
  ↓
Navigate đến /home
```

### 2. **CRUD Flow (Item):**
```
Component gọi action từ ItemContext
  ↓
ItemContext gọi API service
  ↓
API service gọi JSON Server
  ↓
JSON Server trả về data
  ↓
ItemContext dispatch action để update state
  ↓
State thay đổi → Components re-render
```

### 3. **Filter & Sort Flow:**
```
User thay đổi filter/sort
  ↓
FilterBar gọi setFilter()/setSort()
  ↓
ItemContext dispatch SET_FILTER/SET_SORT
  ↓
useEffect trigger APPLY_FILTERS_AND_SORT
  ↓
Reducer filter và sort items
  ↓
Update filteredItems → Component re-render với data mới
```

## 🎨 Các Pattern Được Sử Dụng

### 1. **Context API + useReducer Pattern**
- **Khi nào dùng:** Quản lý state phức tạp, nhiều actions
- **Ví dụ:** AuthContext, ItemContext

### 2. **Custom Hooks Pattern**
- **Khi nào dùng:** Tái sử dụng logic Context
- **Ví dụ:** `useAuth()`, `useItem()`

### 3. **Private Route Pattern**
- **Khi nào dùng:** Bảo vệ routes cần authentication
- **Ví dụ:** `PrivateRoute` component

### 4. **Service Layer Pattern**
- **Khi nào dùng:** Tách biệt API logic khỏi components
- **Ví dụ:** `services/api.js`

### 5. **Component Composition Pattern**
- **Khi nào dùng:** Tạo components nhỏ, reusable
- **Ví dụ:** Modals, Forms, Tables

## 🔑 Các Khái Niệm Quan Trọng

### 1. **Context API**
- Cung cấp state cho nhiều components mà không cần prop drilling
- Sử dụng `createContext()`, `Provider`, `useContext()`

### 2. **useReducer**
- Quản lý state phức tạp với nhiều actions
- Reducer nhận `(state, action)` và trả về state mới
- Pattern: `dispatch({ type: 'ACTION_TYPE', payload: data })`

### 3. **React Router**
- Điều hướng giữa các trang
- `BrowserRouter`: Wrap toàn bộ app
- `Routes/Route`: Định nghĩa routes
- `Navigate`: Redirect
- `useNavigate`: Hook để điều hướng programmatically

### 4. **Axios**
- HTTP client để gọi API
- `axios.create()`: Tạo instance với baseURL
- Methods: `get()`, `post()`, `put()`, `delete()`

### 5. **JSON Server**
- Mock REST API server
- Tự động tạo REST endpoints từ JSON file
- Routes: `GET /items`, `POST /items`, `PUT /items/:id`, `DELETE /items/:id`

## 📝 Checklist Khi Thay Đổi Đối Tượng

### Files Cần Thay Đổi:
1. ✅ `services/api.js` - Thay đổi tên hàm và endpoint
2. ✅ `contexts/ItemContext.jsx` - Đổi tên và cập nhật filters/reducer
3. ✅ `components/AddItemForm.jsx` - Cập nhật formData và validation
4. ✅ `components/ItemTable.jsx` - Cập nhật columns
5. ✅ `components/EditItemModal.jsx` - Cập nhật form
6. ✅ `components/ViewDetailsModal.jsx` - Cập nhật fields hiển thị
7. ✅ `components/FilterBar.jsx` - Cập nhật filters và sort options
8. ✅ `pages/DashboardPage.jsx` - Cập nhật route và text
9. ✅ `routes/AppRoutes.js` - Cập nhật routes
10. ✅ `App.js` - Cập nhật Provider
11. ✅ `db.json` - Cập nhật database structure

### Files Giữ Nguyên:
- ❌ `contexts/AuthContext.jsx`
- ❌ `components/LoginForm.jsx`
- ❌ `pages/LoginPage.jsx`
- ❌ `components/NavigationHeader.jsx` (chỉ cần đổi brand name)
- ❌ `components/ConfirmModal.jsx`

## 🚀 Quy Trình Phát Triển

1. **Khởi tạo:**
   - Tạo `db.json` với cấu trúc data
   - Chạy `npm run api` để start JSON Server

2. **Setup Context:**
   - Tạo Context file
   - Định nghĩa initialState và reducer
   - Tạo Provider và actions
   - Export custom hook

3. **Setup API Service:**
   - Tạo các hàm API trong `services/api.js`
   - Test với Postman hoặc browser

4. **Tạo Components:**
   - Tạo form components
   - Tạo display components
   - Tạo modal components

5. **Setup Routes:**
   - Định nghĩa routes trong `AppRoutes.js`
   - Setup PrivateRoute

6. **Tích hợp:**
   - Kết nối Components với Context
   - Test CRUD operations
   - Test filter và sort

## 💡 Best Practices

1. **Luôn tách biệt concerns:**
   - Logic API → `services/`
   - State management → `contexts/`
   - UI components → `components/`

2. **Sử dụng TypeScript nếu có thể:**
   - Type safety
   - Better IDE support
   - Self-documenting code

3. **Error handling:**
   - Luôn wrap API calls trong try-catch
   - Hiển thị error messages cho user

4. **Loading states:**
   - Hiển thị loading spinner khi fetch data
   - Disable buttons khi đang submit

5. **Validation:**
   - Validate ở client-side trước khi submit
   - Hiển thị error messages rõ ràng

6. **Code organization:**
   - Mỗi file một responsibility
   - Đặt tên rõ ràng
   - Comment các phần phức tạp

---

**🎓 Học từ template này để hiểu cách tổ chức React app một cách chuyên nghiệp!**

