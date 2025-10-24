# React Router Exercises - Slot 14

## Tổng Quan
Dự án này thực hiện 3 bài tập về React Router để học cách sử dụng định tuyến trong React ứng dụng.

## Cài Đặt
```bash
npm install react-router-dom@6
```

## Cấu Trúc Dự Án
```
src/
├── components/
│   └── Navigation.jsx          # Thanh điều hướng chính
├── pages/
│   ├── Home.jsx               # Trang chủ
│   ├── Products.jsx           # Danh sách sản phẩm
│   ├── Contact.jsx            # Trang liên hệ
│   ├── ProductDetail.jsx      # Chi tiết sản phẩm (Dynamic Route)
│   ├── DashboardLayout.jsx    # Layout cho Dashboard
│   ├── DashboardHome.jsx       # Trang chủ Dashboard
│   ├── Settings.jsx            # Trang cài đặt
│   ├── Reports.jsx             # Trang báo cáo
│   └── NotFound.jsx            # Trang 404
├── App.js                      # Cấu hình routing chính
└── index.js                    # Entry point với BrowserRouter
```

## Bài Tập 1: Routing Cơ Bản và Điều Hướng
**Mục tiêu:** Hiểu cách định nghĩa Route và sử dụng Link.

### Các Route:
- `/` → Trang Chủ (Home)
- `/san-pham` → Danh Sách Sản Phẩm (Products)
- `/lien-he` → Liên Hệ (Contact)

### Tính năng:
- Thanh điều hướng với NavLink
- Highlight trang hiện tại với class `active`
- Styling responsive và đẹp mắt

## Bài Tập 2: Dynamic Routing và Programmatic Navigation
**Mục tiêu:** Sử dụng tham số động (useParams) và điều hướng bằng code (useNavigate).

### Các Route:
- `/san-pham/:productId` → Chi Tiết Sản Phẩm (ProductDetail)

### Tính năng:
- Dynamic routing với tham số `productId`
- Sử dụng `useParams()` để lấy ID sản phẩm
- Sử dụng `useNavigate()` để điều hướng programmatically
- Danh sách sản phẩm với Link đến trang chi tiết
- Nút "Quay lại" trong trang chi tiết

### Sản phẩm mẫu:
- ID: 101 - Sản phẩm A
- ID: 102 - Sản phẩm B  
- ID: 103 - Sản phẩm C

## Bài Tập 3: Nested Routes và Layout
**Mục tiêu:** Áp dụng Nested Routes để xây dựng một layout quản trị (Dashboard).

### Các Route:
- `/dashboard` → DashboardLayout + DashboardHome (index route)
- `/dashboard/settings` → DashboardLayout + Settings
- `/dashboard/reports` → DashboardLayout + Reports

### Tính năng:
- Nested routes với DashboardLayout làm parent
- Sử dụng `Outlet` để render các route con
- Sidebar navigation trong Dashboard
- Layout chia sẻ giữa các trang con
- Styling chuyên nghiệp cho admin panel

## Các Hook và Component Được Sử Dụng

### Components:
- `BrowserRouter`: Bọc toàn bộ ứng dụng
- `Routes`: Container cho tất cả routes
- `Route`: Định nghĩa từng route cụ thể
- `NavLink`: Navigation với active state
- `Link`: Điều hướng đơn giản
- `Outlet`: Render nested routes

### Hooks:
- `useParams()`: Lấy tham số từ URL
- `useNavigate()`: Điều hướng programmatically

## Cách Chạy Ứng Dụng
```bash
cd use-context-exercises
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## Demo Các Tính Năng

### 1. Basic Navigation
- Click vào các link trong navbar để điều hướng
- Quan sát active state của link hiện tại

### 2. Dynamic Routing
- Vào trang "Sản Phẩm"
- Click "Xem chi tiết" trên bất kỳ sản phẩm nào
- Quan sát URL thay đổi thành `/san-pham/[ID]`
- Sử dụng nút "Quay lại" để test programmatic navigation

### 3. Nested Routes
- Click vào "Dashboard" trong navbar
- Quan sát sidebar navigation
- Click vào các menu con (Settings, Reports)
- Quan sát URL thay đổi nhưng layout vẫn giữ nguyên

## Lợi Ích Của Nested Routes
1. **Chia sẻ Layout**: DashboardLayout được chia sẻ cho tất cả trang con
2. **Quản lý Code**: Không cần lặp lại code layout
3. **URL Structure**: URL có cấu trúc rõ ràng `/dashboard/settings`
4. **Maintainability**: Dễ bảo trì và mở rộng
5. **User Experience**: Navigation mượt mà, không reload trang

## Kết Luận
Ba bài tập này bao gồm:
- ✅ Basic routing với NavLink
- ✅ Dynamic routing với useParams
- ✅ Programmatic navigation với useNavigate  
- ✅ Nested routes với Outlet
- ✅ Responsive design và styling đẹp mắt
- ✅ Error handling với 404 page

Ứng dụng demo đầy đủ các tính năng cơ bản và nâng cao của React Router v6.