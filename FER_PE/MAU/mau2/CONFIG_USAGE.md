# 📖 Hướng Dẫn Sử Dụng Config-Based Template

## 🎯 Tổng Quan

Template này sử dụng **Configuration-Based Approach**, nghĩa là bạn chỉ cần sửa **1 file config** (`src/config/entityConfig.js`) để thay đổi toàn bộ entity và fields. Code sẽ tự động thích ứng!

## ✨ Tính Năng

✅ **Tự động render form** từ config  
✅ **Tự động validation** từ config  
✅ **Tự động hiển thị fields** từ config  
✅ **Chỉ cần sửa 1 file** để đổi entity  
✅ **Hỗ trợ nhiều field types**: text, number, email, date, textarea, tel, select  

## 📁 Cấu Trúc Files

```
src/
├── config/
│   ├── entityConfig.js              ⭐ CHỈ SỬA FILE NÀY!
│   └── EXAMPLE_STUDENT_CONFIG.js    (Ví dụ config cho Student)
├── components/
│   ├── generic/
│   │   ├── DynamicForm.jsx          (Form động - tự động render)
│   │   └── DynamicEditModal.jsx     (Edit Modal động)
│   └── EditItemModal.jsx            (Wrapper - sử dụng DynamicEditModal)
└── ...
```

## 🚀 Cách Sử Dụng

### Bước 1: Hiểu Config File

Mở `src/config/entityConfig.js`:

```javascript
export const entityConfig = {
    // 1. Tên entity
    name: {
        singular: 'Item',
        plural: 'Items',
        // ...
    },
    
    // 2. Routes
    routes: {
        list: '/items',
        // ...
    },
    
    // 3. API endpoints
    api: {
        base: '/items',
        // ...
    },
    
    // 4. Fields - ĐỊNH NGHĨA TẠI ĐÂY!
    fields: [
        {
            name: 'name',           // Tên field trong DB
            label: 'Name',          // Label hiển thị
            type: 'text',           // Loại input
            required: true,         // Bắt buộc
            validation: {
                required: 'Name is required',
            },
            displayInList: true,    // Hiển thị trong list
            displayInDetail: true,  // Hiển thị trong detail
            searchable: true,       // Có thể search
        },
        // ... các fields khác
    ],
};
```

### Bước 2: Đổi Entity

**Ví dụ: Đổi từ Item → Student**

#### 2.1. Sửa `entityConfig.js`:

```javascript
// Đổi tên
name: {
    singular: 'Student',    // Đổi từ 'Item'
    plural: 'Students',
    // ...
},

// Đổi routes
routes: {
    list: '/students',      // Đổi từ '/items'
    // ...
},

// Đổi API
api: {
    base: '/students',      // Đổi từ '/items'
    // ...
},

// Đổi fields
fields: [
    {
        name: 'studentId',   // Field mới
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
        name: 'fullName',    // Thay 'name'
        label: 'Full Name',
        type: 'text',
        required: true,
        // ...
    },
    {
        name: 'email',       // Thay 'category'
        label: 'Email',
        type: 'email',
        required: true,
        validation: {
            required: 'Email is required',
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            patternMessage: 'Invalid email format',
        },
        // ...
    },
    // Xóa fields không cần (price, stock)
    // Thêm fields mới (phone, dateOfBirth, className, address)
],
```

#### 2.2. Sửa `db.json`:

```json
{
  "students": [  // Đổi từ "items"
    {
      "id": "1",
      "studentId": "STU001",
      "fullName": "Nguyen Van A",
      "email": "a@example.com",
      "phone": "0123456789",
      "dateOfBirth": "2000-01-15",
      "className": "K21",
      "address": "123 Main St"
    }
  ]
}
```

#### 2.3. Sửa `services/api.js`:

```javascript
// Đổi endpoints
export const getStudents = async () => {  // getItems → getStudents
    const response = await API.get('/students');  // /items → /students
    return response.data;
};

export const getStudentById = async (id) => {
    const response = await API.get(`/students/${id}`);
    return response.data;
};

export const updateStudent = async (id, student) => {
    const response = await API.put(`/students/${id}`, student);
    return response.data;
};
```

#### 2.4. Find & Replace (trong toàn bộ project):

- `Item` → `Student`
- `item` → `student`
- `items` → `students`
- `ItemContext` → `StudentContext`
- `ItemProvider` → `StudentProvider`
- `useItems` → `useStudents`
- `ItemList` → `StudentList`
- `ItemDetail` → `StudentDetail`
- `EditItemModal` → `EditStudentModal`

#### 2.5. Đổi tên files:

- `ItemContext.jsx` → `StudentContext.jsx`
- `ItemList.jsx` → `StudentList.jsx`
- `ItemDetail.jsx` → `StudentDetail.jsx`
- `EditItemModal.jsx` → `EditStudentModal.jsx`

#### 2.6. XONG!

Form tự động render fields mới từ config! Không cần sửa `DynamicForm` hay `DynamicEditModal`!

## 📋 Field Types Hỗ Trợ

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

## 🎨 Field Properties

| Property | Type | Required | Mô tả |
|----------|------|----------|-------|
| `name` | string | ✅ | Tên field trong DB |
| `label` | string | ✅ | Label hiển thị |
| `type` | string | ✅ | Loại input (text, number, email, date, textarea, tel, select) |
| `required` | boolean | ❌ | Có bắt buộc không (default: false) |
| `validation` | object | ❌ | Rules validation |
| `placeholder` | string | ❌ | Placeholder text |
| `displayInList` | boolean | ❌ | Hiển thị trong list (default: false) |
| `displayInDetail` | boolean | ❌ | Hiển thị trong detail (default: false) |
| `searchable` | boolean | ❌ | Có thể search (default: false) |
| `sortable` | boolean | ❌ | Có thể sort (default: false) |

## 💡 Ví Dụ Thực Tế

### Ví dụ 1: Item → Product

```javascript
// entityConfig.js
fields: [
    { name: 'productName', label: 'Product Name', type: 'text', required: true },
    { name: 'brand', label: 'Brand', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'stock', label: 'Stock', type: 'number', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
]
```

### Ví dụ 2: Item → Book

```javascript
// entityConfig.js
fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'author', label: 'Author', type: 'text', required: true },
    { name: 'isbn', label: 'ISBN', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'publishedDate', label: 'Published Date', type: 'date' },
    { name: 'description', label: 'Description', type: 'textarea' },
]
```

### Ví dụ 3: Item → Student

Xem file `src/config/EXAMPLE_STUDENT_CONFIG.js` để xem ví dụ đầy đủ.

## ⚡ Workflow Nhanh

1. **Sửa entityConfig.js** (5 phút)
2. **Sửa db.json** (2 phút)
3. **Sửa API service** (2 phút)
4. **Find & Replace** (5 phút)
5. **Đổi tên files** (2 phút)

**Tổng: ~15 phút** (thay vì 30 phút manual!)

## 🎯 Lợi Ích

✅ **Nhanh**: Chỉ sửa 1 file config  
✅ **Đơn giản**: Không cần viết lại form  
✅ **Tự động**: Code tự thích ứng  
✅ **Ít lỗi**: Validation tự động  
✅ **Dễ maintain**: Tất cả config ở 1 chỗ  

## ❓ FAQ

**Q: Có thể customize UI không?**  
A: Có, nhưng cần sửa `DynamicForm.jsx`. Với hầu hết trường hợp, config đủ dùng.

**Q: Nếu cần field đặc biệt?**  
A: Có thể thêm type mới trong `DynamicForm.jsx` hoặc dùng `type='text'` và customize sau.

**Q: Có thể dùng nhiều entity cùng lúc không?**  
A: Có, tạo nhiều config files và import theo entity.

## 📚 Xem Thêm

- `CONFIG_BASED_GUIDE.md` - Hướng dẫn chi tiết
- `QUICK_START_CONFIG.md` - Quick start guide
- `src/config/EXAMPLE_STUDENT_CONFIG.js` - Ví dụ config đầy đủ
