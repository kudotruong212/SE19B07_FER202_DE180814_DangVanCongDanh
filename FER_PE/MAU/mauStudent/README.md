# Student Management System - React CRUD Application

Đây là ứng dụng quản lý sinh viên được xây dựng dựa trên template từ `mau1` (quản lý Payment/Items), được chuyển đổi để quản lý Students với các trường dữ liệu phù hợp.

## 📋 Cấu trúc Dự án

```
mauStudent/
├── src/
│   ├── components/          # Các component UI
│   │   ├── LoginForm.jsx
│   │   ├── NavigationHeader.jsx
│   │   ├── FilterBar.jsx
│   │   ├── AddStudentForm.jsx
│   │   ├── StudentTable.jsx
│   │   ├── ViewDetailsModal.jsx
│   │   ├── EditStudentModal.jsx
│   │   └── ConfirmModal.jsx
│   ├── contexts/            # Context API + useReducer
│   │   ├── AuthContext.jsx   # Quản lý authentication
│   │   └── StudentContext.jsx # Quản lý students
│   ├── pages/                # Các trang
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── AddStudentPage.jsx
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
- **StudentContext**: Quản lý state của students (CRUD operations, filters, sorting)

### 2. **Router với PrivateRoute**
- Sử dụng React Router v6
- `PrivateRoute` component để bảo vệ các route cần authentication
- Routes: `/login`, `/home`, `/students/add`

### 3. **API Service Pattern**
- Tách biệt logic API vào `services/api.js`
- Sử dụng axios để gọi JSON Server
- Các hàm: `getStudents()`, `addStudent()`, `updateStudent()`, `deleteStudent()`

### 4. **Component Structure**
- **Pages**: Wrapper components cho routes
- **Components**: Reusable UI components
- **Forms**: Sử dụng useState để quản lý form state

## 📊 Các Trường Dữ Liệu của Student

- **studentId** (string): Mã sinh viên
- **fullName** (string): Họ và tên
- **email** (string): Email
- **phone** (string): Số điện thoại (10-11 chữ số)
- **class** (string): Lớp
- **gpa** (number): Điểm trung bình (0-4)
- **dateOfBirth** (date): Ngày sinh
- **userId** (string): ID của user tạo student

## 🔍 Tính Năng

### 1. **Authentication**
- Đăng nhập với username/email và password
- Lưu session trong localStorage
- Protected routes

### 2. **CRUD Operations**
- **Create**: Thêm sinh viên mới
- **Read**: Xem danh sách và chi tiết sinh viên
- **Update**: Chỉnh sửa thông tin sinh viên
- **Delete**: Xóa sinh viên (có xác nhận)

### 3. **Filter & Sort**
- Tìm kiếm theo mã SV, họ tên, email
- Lọc theo lớp
- Lọc theo GPA (min-max)
- Sắp xếp theo:
  - Mã sinh viên (tăng/giảm)
  - Họ tên (A-Z / Z-A)
  - GPA (tăng/giảm)
  - Ngày sinh (tăng/giảm)

### 4. **Validation**
- Validation form phía client
- Kiểm tra email format
- Kiểm tra số điện thoại (10-11 chữ số)
- Kiểm tra GPA (0-4)

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

## 🔄 So Sánh với mau1 (Payment/Items)

### Thay đổi chính:
1. **Item** → **Student**
2. **Fields thay đổi:**
   - `name`, `category`, `price`, `date` → `studentId`, `fullName`, `email`, `phone`, `class`, `gpa`, `dateOfBirth`
3. **Filters thay đổi:**
   - `category`, `name` → `class`, `gpaMin`, `gpaMax`
4. **Sort options thay đổi:**
   - `name_asc/desc`, `price_asc/desc`, `date_asc/desc` → `studentId_asc/desc`, `fullName_asc/desc`, `gpa_asc/desc`, `dateOfBirth_asc/desc`

### Giữ nguyên:
- Authentication system
- Router structure
- Component patterns
- API service layer structure

## 💡 Các Pattern Được Sử Dụng

1. **Context API + useReducer Pattern**: Quản lý state phức tạp
2. **Custom Hooks Pattern**: Tái sử dụng logic Context (`useAuth`, `useStudent`)
3. **Private Route Pattern**: Bảo vệ routes cần authentication
4. **Service Layer Pattern**: Tách biệt API logic khỏi components
5. **Component Composition Pattern**: Tạo components nhỏ, reusable

## 🎓 Học Từ Project Này

Project này giúp bạn hiểu:
- Cách tổ chức code React theo pattern Context API + useReducer
- Cách sử dụng React Router với route protection
- Cách tách biệt API service layer
- Cách xây dựng CRUD operations hoàn chỉnh
- Cách implement filter và sort
- Cách tạo reusable components
- Cách chuyển đổi một ứng dụng từ đối tượng này sang đối tượng khác

---

**Chúc bạn học tốt! 🚀**
