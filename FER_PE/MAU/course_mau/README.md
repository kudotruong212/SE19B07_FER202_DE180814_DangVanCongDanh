# Course Management System

Hệ thống quản lý khóa học được xây dựng với React, sử dụng Context API và useReducer để quản lý state, React Router để điều hướng, và JSON Server làm backend API.

## 🚀 Tính năng

- **Đăng nhập/Đăng xuất**: Xác thực người dùng với role admin
- **Quản lý khóa học**: 
  - Xem danh sách khóa học
  - Thêm khóa học mới
  - Chỉnh sửa thông tin khóa học
  - Xóa khóa học
  - Xem chi tiết khóa học
- **Quản lý người dùng**:
  - Xem danh sách người dùng
  - Xem chi tiết người dùng
  - Khóa/Mở khóa tài khoản
  - Tìm kiếm và lọc theo role, status
- **Tìm kiếm & Lọc**:
  - Tìm kiếm theo title, instructor (khóa học)
  - Tìm kiếm theo username, full name (người dùng)
  - Lọc theo category và status (khóa học)
  - Lọc theo role và status (người dùng)
  - Sắp xếp theo nhiều tiêu chí
- **Thống kê**: 
  - Tổng số khóa học
  - Tổng số học viên
  - Tổng doanh thu (price * students)

## 📋 Yêu cầu

- Node.js (v14 trở lên)
- npm hoặc yarn

## 🔧 Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Khởi chạy JSON Server (API):
```bash
npm run api
```
Server sẽ chạy tại http://localhost:3001

3. Khởi chạy ứng dụng React (trong terminal khác):
```bash
npm start
```
Ứng dụng sẽ chạy tại http://localhost:3000

## 📁 Cấu trúc dự án

```
src/
├── components/          # Các components tái sử dụng
│   ├── AddCourseForm.jsx
│   ├── CourseTable.jsx
│   ├── ConfirmModal.jsx
│   ├── EditCourseModal.jsx
│   ├── FilterBar.jsx
│   ├── LoginForm.jsx
│   ├── NavigationHeader.jsx
│   ├── UserFilter.jsx
│   ├── UserTable.jsx
│   ├── ViewCourseDetailsModal.jsx
│   └── ViewUserDetailsModal.jsx
├── contexts/           # Context API để quản lý state
│   ├── AuthContext.jsx
│   └── CourseContext.jsx
├── pages/              # Các trang chính
│   ├── AddCoursePage.jsx
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   └── UserListPage.jsx
├── routes/             # Định nghĩa routes
│   └── AppRoutes.js
├── services/           # API services
│   └── api.js
├── App.js
└── index.js
```

## 🔐 Thông tin đăng nhập

Mặc định có 2 tài khoản admin:

1. **Username**: `admin` / **Password**: `123456`
2. **Username**: `instructor` / **Password**: `123456`

## 📚 Cấu trúc dữ liệu Course

Mỗi khóa học có các trường:
- `id`: ID duy nhất
- `title`: Tên khóa học
- `description`: Mô tả khóa học
- `instructor`: Tên giảng viên
- `category`: Thể loại (Web Development, Backend Development, Full Stack, Data Science, Mobile Development, Design, Database, DevOps, ...)
- `duration`: Thời lượng (giờ)
- `price`: Giá (VND)
- `startDate`: Ngày bắt đầu
- `endDate`: Ngày kết thúc
- `status`: Trạng thái (upcoming, ongoing, completed)
- `students`: Số lượng học viên
- `imageUrl`: URL hình ảnh (optional)

## 🛠️ Công nghệ sử dụng

- **React**: UI framework
- **React Router**: Điều hướng
- **Context API + useReducer**: State management
- **React Bootstrap**: UI components
- **Axios**: HTTP client
- **JSON Server**: Mock API server

## 📝 Scripts

- `npm start`: Khởi chạy ứng dụng React (port 3000)
- `npm run api`: Khởi chạy JSON Server (port 3001)
- `npm run build`: Build ứng dụng cho production
- `npm test`: Chạy tests

## 🎯 Cách sử dụng

### Quản lý Khóa học:
1. Đăng nhập với tài khoản admin
2. Trang Dashboard hiển thị danh sách khóa học với bộ lọc và tìm kiếm
3. Click "Thêm Khóa Học" để thêm khóa học mới
4. Click "View" để xem chi tiết khóa học
5. Click "Edit" để chỉnh sửa khóa học
6. Click "Delete" để xóa khóa học

### Quản lý Người dùng:
1. Click "User Management" trên thanh điều hướng
2. Xem danh sách tất cả người dùng
3. Click "View Details" để xem chi tiết người dùng
4. Click "Ban Account" để khóa tài khoản
5. Click "Unban Account" để mở khóa tài khoản
6. Sử dụng bộ lọc để tìm kiếm và lọc theo role, status

## 📖 Học từ dự án này

Dự án này minh họa các khái niệm:

1. **Context API**: Quản lý state toàn cục (AuthContext, CourseContext)
2. **useReducer**: Quản lý state phức tạp với actions và reducers
3. **React Router**: Điều hướng và bảo vệ routes (PrivateRoute)
4. **API Integration**: Tích hợp với REST API qua Axios
5. **Form Handling**: Xử lý form với validation
6. **Component Composition**: Tái sử dụng components
7. **State Management**: Quản lý state với filters, sorting, pagination
8. **Date Handling**: Xử lý và validation ngày tháng
9. **Revenue Calculation**: Tính toán doanh thu từ price và students

## 🔄 So sánh với library_mau

Dự án này được chuyển đổi từ hệ thống quản lý sách (books) sang hệ thống quản lý khóa học (courses):

- **Book → Course**: Thay đổi entity chính
- **BookContext → CourseContext**: Context mới với logic phù hợp
- **BookTable → CourseTable**: Table component mới
- **Fields thay đổi**: 
  - Book: title, author, isbn, category, price, publishedDate, description, status
  - Course: title, instructor, category, duration, price, startDate, endDate, description, status, students
- **Thống kê mới**: Tổng học viên và tổng doanh thu (price * students)

## 📄 License

MIT

## 👨‍💻 Author

Dự án được tạo dựa trên mẫu library_mau, chuyển đổi sang hệ thống quản lý khóa học.