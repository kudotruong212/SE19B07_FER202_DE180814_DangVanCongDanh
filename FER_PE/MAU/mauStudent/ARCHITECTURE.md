# 📚 TÓM TẮT CÁCH TỔ CHỨC CODE - Student Management System

## 🎯 Kiến Trúc Tổng Quan

Ứng dụng được tổ chức theo **layered architecture** với các lớp:

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

#### **AuthContext.jsx**
- Quản lý authentication state (login/logout)
- Sử dụng `useReducer` với các actions: `LOGIN_START`, `LOGIN_SUCCESS`, `LOGIN_FAILURE`, `LOGOUT`
- Lưu user vào localStorage để persist session
- Export `useAuth()` hook

#### **StudentContext.jsx**
- Quản lý state của students (CRUD operations)
- Sử dụng `useReducer` với các actions:
  - `FETCH_START`, `FETCH_SUCCESS`, `FETCH_FAILURE`
  - `SET_FILTER`, `SET_SORT`
  - `APPLY_FILTERS_AND_SORT`
  - `ADD_STUDENT`, `UPDATE_STUDENT`, `DELETE_STUDENT`
- Tự động filter và sort khi state thay đổi
- Export `useStudent()` hook

**Pattern sử dụng:**
```javascript
// 1. Tạo Context
const StudentContext = createContext();

// 2. Tạo Reducer
const studentReducer = (state, action) => { ... }

// 3. Tạo Provider với useReducer
export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  // ... actions
  return <StudentContext.Provider value={contextValue}>{children}</StudentContext.Provider>
}

// 4. Tạo Custom Hook
export const useStudent = () => useContext(StudentContext);
```

### 2. **`services/`** - API Service Layer

#### **api.js**
- Tách biệt logic API calls khỏi components
- Sử dụng axios để gọi JSON Server
- Các hàm: `getStudents()`, `addStudent()`, `updateStudent()`, `deleteStudent()`
- Trả về data hoặc throw error

**Pattern:**
```javascript
export const getStudents = async () => {
  try {
    const response = await API.get('/students');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch students');
  }
};
```

### 3. **`routes/`** - Router Configuration

#### **AppRoutes.js**
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
- **AddStudentPage.jsx**: Wrapper cho AddStudentForm

**Pattern:** Pages là wrapper components, logic nằm trong Components

### 5. **`components/`** - Reusable Components

#### **Forms:**
- **LoginForm.jsx**: 
  - Sử dụng `useReducer` để quản lý form state
  - Validation real-time
  - Sử dụng `useAuth()` để login

- **AddStudentForm.jsx**:
  - Sử dụng `useState` để quản lý form state
  - Validation trước khi submit
  - Sử dụng `useStudent()` để add student

#### **Display Components:**
- **StudentTable.jsx**:
  - Hiển thị danh sách students dạng table
  - Sử dụng `useStudent()` để lấy data
  - Có các actions: View, Edit, Delete (với modals)

- **FilterBar.jsx**:
  - Component filter và sort
  - Sử dụng `useStudent()` để set filter và sort
  - Filters: search, class, gpaMin, gpaMax
  - Sort options: studentId, fullName, gpa, dateOfBirth

#### **Modals:**
- **ViewDetailsModal.jsx**: Hiển thị chi tiết student
- **EditStudentModal.jsx**: Form chỉnh sửa student
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

### 2. **CRUD Flow (Student):**
```
Component gọi action từ StudentContext
  ↓
StudentContext gọi API service
  ↓
API service gọi JSON Server
  ↓
JSON Server trả về data
  ↓
StudentContext dispatch action để update state
  ↓
State thay đổi → Components re-render
```

### 3. **Filter & Sort Flow:**
```
User thay đổi filter/sort
  ↓
FilterBar gọi setFilter()/setSort()
  ↓
StudentContext dispatch SET_FILTER/SET_SORT
  ↓
useEffect trigger APPLY_FILTERS_AND_SORT
  ↓
Reducer filter và sort students
  ↓
Update filteredStudents → Component re-render với data mới
```

## 🎨 Các Pattern Được Sử Dụng

### 1. **Context API + useReducer Pattern**
- **Khi nào dùng:** Quản lý state phức tạp, nhiều actions
- **Ví dụ:** AuthContext, StudentContext

### 2. **Custom Hooks Pattern**
- **Khi nào dùng:** Tái sử dụng logic Context
- **Ví dụ:** `useAuth()`, `useStudent()`

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
- Routes: `GET /students`, `POST /students`, `PUT /students/:id`, `DELETE /students/:id`

## 📝 Student Data Model

### Fields:
- **id**: Unique identifier (string)
- **userId**: ID của user tạo student (string)
- **studentId**: Mã sinh viên (string) - required
- **fullName**: Họ và tên (string) - required
- **email**: Email (string) - required, validated
- **phone**: Số điện thoại (string) - required, 10-11 digits
- **class**: Lớp (string) - required
- **gpa**: Điểm trung bình (number) - required, 0-4
- **dateOfBirth**: Ngày sinh (date) - required

### Filters:
- **search**: Tìm kiếm trong studentId, fullName, email
- **class**: Lọc theo lớp
- **gpaMin**: GPA tối thiểu
- **gpaMax**: GPA tối đa

### Sort Options:
- `studentId_asc/desc`: Sắp xếp theo mã sinh viên
- `fullName_asc/desc`: Sắp xếp theo họ tên
- `gpa_asc/desc`: Sắp xếp theo GPA
- `dateOfBirth_asc/desc`: Sắp xếp theo ngày sinh

## 💡 Best Practices

1. **Luôn tách biệt concerns:**
   - Logic API → `services/`
   - State management → `contexts/`
   - UI components → `components/`

2. **Error handling:**
   - Luôn wrap API calls trong try-catch
   - Hiển thị error messages cho user

3. **Loading states:**
   - Hiển thị loading spinner khi fetch data
   - Disable buttons khi đang submit

4. **Validation:**
   - Validate ở client-side trước khi submit
   - Hiển thị error messages rõ ràng

5. **Code organization:**
   - Mỗi file một responsibility
   - Đặt tên rõ ràng
   - Comment các phần phức tạp

## 🔄 So Sánh với mau1 (Payment/Items)

### Những thay đổi chính:

1. **Đổi tên đối tượng:**
   - `Item` → `Student`
   - `items` → `students`

2. **Fields thay đổi:**
   - `name`, `category`, `price`, `date` 
   - → `studentId`, `fullName`, `email`, `phone`, `class`, `gpa`, `dateOfBirth`

3. **Filters thay đổi:**
   - `category`, `name` 
   - → `class`, `gpaMin`, `gpaMax`

4. **Sort options thay đổi:**
   - `name_asc/desc`, `price_asc/desc`, `date_asc/desc`
   - → `studentId_asc/desc`, `fullName_asc/desc`, `gpa_asc/desc`, `dateOfBirth_asc/desc`

### Giữ nguyên:
- Authentication system
- Router structure
- Component patterns
- API service layer structure
- Context API + useReducer pattern

---

**🎓 Học từ template này để hiểu cách tổ chức React app một cách chuyên nghiệp!**

