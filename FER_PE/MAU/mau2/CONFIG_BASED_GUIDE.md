# 🎯 Hướng Dẫn Sử Dụng Config-Based Template

## 📋 Tổng Quan

Template này sử dụng **Configuration-Based** approach, nghĩa là bạn chỉ cần sửa **1 file config** (`entityConfig.js`) để thay đổi toàn bộ entity và fields. Code sẽ tự động thích ứng!

## 🚀 Cách Sử Dụng

### Bước 1: Hiểu Cấu Trúc

```
src/
├── config/
│   └── entityConfig.js          ⭐ CHỈ SỬA FILE NÀY!
├── components/
│   ├── generic/
│   │   ├── DynamicForm.jsx      (Tự động render form)
│   │   └── DynamicEditModal.jsx (Tự động render edit modal)
│   └── EditItemModal.jsx        (Wrapper sử dụng DynamicEditModal)
└── ...
```

### Bước 2: Sửa entityConfig.js

Mở file `src/config/entityConfig.js` và sửa:

```javascript
export const entityConfig = {
    name: {
        singular: 'Item',        // Đổi tên entity
        plural: 'Items',
        // ...
    },
    fields: [
        {
            name: 'name',        // Đổi fields
            label: 'Name',
            type: 'text',
            // ...
        },
        // Thêm/xóa fields
    ],
};
```

### Bước 3: Code Tự Động Thích Ứng!

- ✅ Form tự động render fields mới
- ✅ Validation tự động theo config
- ✅ Hiển thị tự động cập nhật

## 📝 Ví Dụ: Đổi từ Item → Student

### Trước (Item):

```javascript
// entityConfig.js
fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'stock', label: 'Stock', type: 'number' },
]
```

### Sau (Student):

```javascript
// entityConfig.js - CHỈ SỬA FILE NÀY!
export const entityConfig = {
    name: {
        singular: 'Student',     // Đổi
        plural: 'Students',      // Đổi
        lowerSingular: 'student',
        lowerPlural: 'students',
    },
    routes: {
        list: '/students',        // Đổi
        // ...
    },
    api: {
        base: '/students',        // Đổi
        // ...
    },
    fields: [
        {
            name: 'studentId',    // Field mới
            label: 'Student ID',
            type: 'text',
            required: true,
            validation: {
                required: 'Student ID is required',
            },
            displayInList: true,
            displayInDetail: true,
            searchable: true,
        },
        {
            name: 'fullName',     // Thay name
            label: 'Full Name',
            type: 'text',
            required: true,
            validation: {
                required: 'Full name is required',
            },
            displayInList: true,
            searchable: true,
        },
        {
            name: 'email',        // Thay category
            label: 'Email',
            type: 'email',
            required: true,
            validation: {
                required: 'Email is required',
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                patternMessage: 'Invalid email format',
            },
            displayInList: true,
            searchable: true,
        },
        {
            name: 'phone',        // Thay price
            label: 'Phone',
            type: 'tel',
            required: false,
            displayInList: false,
            displayInDetail: true,
        },
        {
            name: 'dateOfBirth',  // Thay stock
            label: 'Date of Birth',
            type: 'date',
            required: true,
            validation: {
                required: 'Date of birth is required',
            },
            displayInDetail: true,
        },
        {
            name: 'className',    // Thêm mới
            label: 'Class',
            type: 'text',
            required: true,
            validation: {
                required: 'Class is required',
            },
            displayInList: true,
            searchable: true,
        },
        {
            name: 'address',      // Thay description
            label: 'Address',
            type: 'textarea',
            required: false,
            displayInDetail: true,
        },
    ],
    ui: {
        title: 'Student Management',
        listTitle: 'Student List',
        editTitle: 'Chỉnh sửa Student',
        // ...
    },
};
```

**XONG!** Code tự động thích ứng, không cần sửa components!

## 🎨 Các Loại Field Type Hỗ Trợ

### 1. Text
```javascript
{
    name: 'fullName',
    type: 'text',
    // ...
}
```

### 2. Number
```javascript
{
    name: 'price',
    type: 'number',
    validation: {
        min: 0,
        minMessage: 'Price must be greater than 0',
    },
    // ...
}
```

### 3. Email
```javascript
{
    name: 'email',
    type: 'email',
    validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: 'Invalid email',
    },
    // ...
}
```

### 4. Date
```javascript
{
    name: 'dateOfBirth',
    type: 'date',
    // ...
}
```

### 5. Textarea
```javascript
{
    name: 'description',
    type: 'textarea',
    // ...
}
```

### 6. Tel (Phone)
```javascript
{
    name: 'phone',
    type: 'tel',
    validation: {
        pattern: /^[0-9]{10,11}$/,
        patternMessage: 'Phone must be 10-11 digits',
    },
    // ...
}
```

### 7. Select (Dropdown)
```javascript
{
    name: 'status',
    type: 'select',
    options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ],
    // ...
}
```

## 🔧 Validation Options

### Required
```javascript
validation: {
    required: 'Field is required',
}
```

### Pattern (Regex)
```javascript
validation: {
    pattern: /^[A-Z0-9]+$/,
    patternMessage: 'Must be uppercase letters and numbers',
}
```

### Min/Max (cho number)
```javascript
validation: {
    min: 0,
    minMessage: 'Must be at least 0',
    max: 100,
    maxMessage: 'Must be at most 100',
}
```

## 📊 Field Properties

| Property | Type | Mô tả |
|----------|------|-------|
| `name` | string | Tên field trong DB (bắt buộc) |
| `label` | string | Label hiển thị (bắt buộc) |
| `type` | string | Loại input (text, number, email, date, textarea, tel, select) |
| `required` | boolean | Có bắt buộc không |
| `validation` | object | Rules validation |
| `placeholder` | string | Placeholder text |
| `displayInList` | boolean | Hiển thị trong list |
| `displayInDetail` | boolean | Hiển thị trong detail |
| `searchable` | boolean | Có thể search |
| `sortable` | boolean | Có thể sort |

## 🎯 Workflow Khi Đổi Entity

### Ví dụ: Item → Student

1. **Sửa entityConfig.js** (5 phút):
   - Đổi `name.singular` → 'Student'
   - Đổi `routes.list` → '/students'
   - Đổi `api.base` → '/students'
   - Sửa `fields` array

2. **Sửa db.json** (2 phút):
   - Đổi key `"items"` → `"students"`
   - Cập nhật fields trong data

3. **Sửa API service** (2 phút):
   - Đổi endpoint `/items` → `/students`
   - Đổi hàm names

4. **Sửa Context** (5 phút):
   - Find & Replace: Item → Student
   - Đổi tên file

5. **Sửa Routes** (1 phút):
   - Đổi routes `/items` → `/students`

**Tổng: ~15 phút** (thay vì 30 phút như cách manual!)

## 💡 Tips

1. **Backup config cũ**: Lưu config hiện tại trước khi đổi
2. **Test từng bước**: Test sau mỗi thay đổi
3. **Sử dụng Git**: Commit từng bước để dễ rollback
4. **Đọc config kỹ**: Đảm bảo config đúng trước khi test

## ❓ FAQ

**Q: Có thể customize UI không?**  
A: Có, nhưng cần sửa DynamicForm component. Với hầu hết trường hợp, config đủ dùng.

**Q: Nếu cần field đặc biệt?**  
A: Có thể thêm type mới trong DynamicForm.jsx hoặc dùng type='text' và customize sau.

**Q: Có thể dùng nhiều entity cùng lúc không?**  
A: Có, tạo nhiều config files (entityConfig.student.js, entityConfig.product.js) và import theo entity.

**Q: Performance có bị ảnh hưởng không?**  
A: Không, dynamic rendering không ảnh hưởng performance đáng kể.

## 🎓 Ví Dụ Đầy Đủ

Xem file `EXAMPLE_STUDENT_CONFIG.js` để xem ví dụ config đầy đủ cho Student entity.
