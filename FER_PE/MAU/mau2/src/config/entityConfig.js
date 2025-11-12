// entityConfig.js - Cấu hình Entity và Fields
// ⚠️ QUAN TRỌNG: CHỈ CẦN SỬA FILE NÀY KHI MUỐN ĐỔI ENTITY!
// Ví dụ: Đổi từ Item sang Student, Product, Book, etc.

export const entityConfig = {
    // ============================================
    // 1. TÊN ENTITY
    // ============================================
    name: {
        singular: 'Item',           // Item, Student, Product, Book
        plural: 'Items',            // Items, Students, Products, Books
        lowerSingular: 'item',      // item, student, product, book
        lowerPlural: 'items',       // items, students, products, books
    },

    // ============================================
    // 2. ROUTES
    // ============================================
    routes: {
        list: '/items',             // /items, /students, /products
        detail: '/view',            // /view/:id (giữ nguyên)
        add: '/add-item',           // /add-item, /add-student (nếu có)
        edit: '/edit',              // /edit/:id (nếu cần)
        cart: '/cart',              // Giữ nguyên
    },

    // ============================================
    // 3. API ENDPOINTS
    // ============================================
    api: {
        base: '/items',             // /items, /students, /products
        get: '/items',              // GET /items
        getById: '/items',          // GET /items/:id
        create: '/items',           // POST /items
        update: '/items',           // PUT /items/:id
        delete: '/items',           // DELETE /items/:id (nếu cần)
    },

    // ============================================
    // 4. FIELDS ĐỊNH NGHĨA
    // ============================================
    // 📝 THAY ĐỔI: Định nghĩa các fields của entity tại đây
    // Mỗi field có các thuộc tính:
    // - name: Tên field trong database (bắt buộc)
    // - label: Label hiển thị trong form (bắt buộc)
    // - type: Loại input (text, number, email, date, textarea, select)
    // - required: Có bắt buộc không (true/false)
    // - validation: Object chứa các rules validation
    // - placeholder: Placeholder text
    // - displayInList: Hiển thị trong list page (true/false)
    // - displayInDetail: Hiển thị trong detail page (true/false)
    // - searchable: Có thể search field này (true/false)
    // - sortable: Có thể sort field này (true/false)
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            validation: {
                required: 'Name is required',
                pattern: null,              // Regex pattern nếu cần
                patternMessage: null,       // Message khi pattern không match
            },
            placeholder: 'Enter item name',
            displayInList: true,
            displayInDetail: true,
            searchable: true,
            sortable: true,
        },
        {
            name: 'category',
            label: 'Category',
            type: 'text',
            required: true,
            validation: {
                required: 'Category is required',
            },
            placeholder: 'Enter category',
            displayInList: true,
            displayInDetail: true,
            searchable: true,
            sortable: true,
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            required: true,
            validation: {
                required: 'Price is required',
                min: 0,
                minMessage: 'Price must be greater than 0',
            },
            placeholder: 'Enter price',
            displayInList: true,
            displayInDetail: true,
            searchable: false,
            sortable: true,
        },
        {
            name: 'stock',
            label: 'Stock',
            type: 'number',
            required: true,
            validation: {
                required: 'Stock is required',
                min: 0,
                minMessage: 'Stock cannot be negative',
            },
            placeholder: 'Enter stock',
            displayInList: true,
            displayInDetail: true,
            searchable: false,
            sortable: true,
        },
        {
            name: 'image',
            label: 'Image URL',
            type: 'text',
            required: false,
            validation: {
                required: false,
            },
            placeholder: 'Enter image URL',
            displayInList: false,
            displayInDetail: true,
            searchable: false,
            sortable: false,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: false,
            validation: {
                required: false,
            },
            placeholder: 'Enter description',
            displayInList: false,
            displayInDetail: true,
            searchable: false,
            sortable: false,
        },
    ],

    // ============================================
    // 5. UI SETTINGS
    // ============================================
    ui: {
        title: 'Item Shop',                 // Title của app
        listTitle: 'Item List',             // Title của list page
        addTitle: 'Add New Item',           // Title của add form (nếu có)
        editTitle: 'Chỉnh sửa Item',        // Title của edit form
        detailTitle: 'Item Details',        // Title của detail page
        navLabel: 'Items',                  // Label trong navigation
        searchPlaceholder: 'Search by name', // Placeholder cho search
    },

    // ============================================
    // 6. SORT OPTIONS (Nếu cần)
    // ============================================
    sortOptions: [
        { value: '', label: 'Sort by Price' },
        { value: 'low-to-high', label: 'Low to High' },
        { value: 'high-to-low', label: 'High to Low' },
    ],
};

// Helper functions để sử dụng trong components
export const getFieldByName = (fieldName) => {
    return entityConfig.fields.find(f => f.name === fieldName);
};

export const getRequiredFields = () => {
    return entityConfig.fields.filter(f => f.required);
};

export const getDisplayFields = (location) => {
    if (location === 'list') {
        return entityConfig.fields.filter(f => f.displayInList);
    } else if (location === 'detail') {
        return entityConfig.fields.filter(f => f.displayInDetail);
    }
    return entityConfig.fields;
};

export const getSearchableFields = () => {
    return entityConfig.fields.filter(f => f.searchable);
};

export const getSortableFields = () => {
    return entityConfig.fields.filter(f => f.sortable);
};

export default entityConfig;
