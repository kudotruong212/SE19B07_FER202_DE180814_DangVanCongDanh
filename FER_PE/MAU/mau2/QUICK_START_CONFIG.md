# 🚀 Quick Start: Config-Based Template

## ⚡ Cách Sử Dụng Nhanh

### Để đổi từ Item sang Entity khác (ví dụ: Student):

1. **Mở file**: `src/config/entityConfig.js`

2. **Sửa các phần sau**:

```javascript
// 1. Đổi tên entity
name: {
    singular: 'Student',    // Đổi từ 'Item'
    plural: 'Students',     // Đổi từ 'Items'
    // ...
},

// 2. Đổi routes
routes: {
    list: '/students',      // Đổi từ '/items'
    // ...
},

// 3. Đổi API endpoints
api: {
    base: '/students',      // Đổi từ '/items'
    // ...
},

// 4. Sửa fields array
fields: [
    {
        name: 'studentId',   // Field mới
        label: 'Student ID',
        type: 'text',
        required: true,
        // ...
    },
    {
        name: 'fullName',    // Thay 'name'
        label: 'Full Name',
        type: 'text',
        // ...
    },
    // Xóa fields không cần, thêm fields mới
],
```

3. **Sửa db.json**: Đổi key `"items"` → `"students"` và cập nhật data

4. **Sửa API service**: Đổi endpoints trong `services/api.js`

5. **Sửa Context**: Find & Replace `Item` → `Student`

6. **XONG!** Form tự động render fields mới từ config!

## 📝 Ví Dụ Nhanh

### Đổi sang Student (5 phút):

**File: `src/config/entityConfig.js`**
```javascript
export const entityConfig = {
    name: { singular: 'Student', plural: 'Students', /* ... */ },
    routes: { list: '/students', /* ... */ },
    api: { base: '/students', /* ... */ },
    fields: [
        { name: 'studentId', label: 'Student ID', type: 'text', required: true },
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        // ...
    ],
};
```

**File: `db.json`**
```json
{
  "students": [  // Đổi từ "items"
    {
      "id": "1",
      "studentId": "STU001",
      "fullName": "Nguyen Van A",
      "email": "a@example.com"
    }
  ]
}
```

**File: `services/api.js`**
```javascript
export const getStudents = async () => {  // Đổi từ getItems
    const response = await API.get('/students');  // Đổi từ '/items'
    return response.data;
};
```

**Sau đó Find & Replace**: `Item` → `Student`, `item` → `student`, `items` → `students`

## ✅ Lợi Ích

- ⚡ **Nhanh**: Chỉ sửa 1 file config
- 🎯 **Đơn giản**: Không cần viết lại form
- 🔄 **Tự động**: Code tự thích ứng
- 🛡️ **Ít lỗi**: Validation tự động từ config

## 📚 Xem Thêm

- `CONFIG_BASED_GUIDE.md` - Hướng dẫn chi tiết
- `src/config/EXAMPLE_STUDENT_CONFIG.js` - Ví dụ config đầy đủ
