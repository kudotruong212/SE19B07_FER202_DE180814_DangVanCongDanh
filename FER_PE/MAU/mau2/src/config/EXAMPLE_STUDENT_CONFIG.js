// EXAMPLE_STUDENT_CONFIG.js - Ví dụ config cho Student entity
// Đây là file mẫu, không sử dụng trực tiếp
// Copy nội dung này vào entityConfig.js khi muốn đổi sang Student

export const entityConfig = {
    name: {
        singular: 'Student',
        plural: 'Students',
        lowerSingular: 'student',
        lowerPlural: 'students',
    },

    routes: {
        list: '/students',
        detail: '/view',
        add: '/add-student',
        edit: '/edit',
        cart: '/cart',
    },

    api: {
        base: '/students',
        get: '/students',
        getById: '/students',
        create: '/students',
        update: '/students',
        delete: '/students',
    },

    fields: [
        {
            name: 'studentId',
            label: 'Student ID',
            type: 'text',
            required: true,
            validation: {
                required: 'Student ID is required',
                pattern: /^[A-Z0-9]+$/,
                patternMessage: 'Student ID must be uppercase letters and numbers',
            },
            placeholder: 'Enter student ID (e.g., STU001)',
            displayInList: true,
            displayInDetail: true,
            searchable: true,
            sortable: false,
        },
        {
            name: 'fullName',
            label: 'Full Name',
            type: 'text',
            required: true,
            validation: {
                required: 'Full name is required',
            },
            placeholder: 'Enter full name',
            displayInList: true,
            displayInDetail: true,
            searchable: true,
            sortable: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            validation: {
                required: 'Email is required',
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                patternMessage: 'Invalid email format',
            },
            placeholder: 'Enter email address',
            displayInList: true,
            displayInDetail: true,
            searchable: true,
            sortable: false,
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'tel',
            required: false,
            validation: {
                required: false,
                pattern: /^[0-9]{10,11}$/,
                patternMessage: 'Phone must be 10-11 digits',
            },
            placeholder: 'Enter phone number',
            displayInList: false,
            displayInDetail: true,
            searchable: false,
            sortable: false,
        },
        {
            name: 'dateOfBirth',
            label: 'Date of Birth',
            type: 'date',
            required: true,
            validation: {
                required: 'Date of birth is required',
            },
            placeholder: '',
            displayInList: false,
            displayInDetail: true,
            searchable: false,
            sortable: true,
        },
        {
            name: 'className',
            label: 'Class',
            type: 'text',
            required: true,
            validation: {
                required: 'Class is required',
            },
            placeholder: 'Enter class name (e.g., K21)',
            displayInList: true,
            displayInDetail: true,
            searchable: true,
            sortable: true,
        },
        {
            name: 'address',
            label: 'Address',
            type: 'textarea',
            required: false,
            validation: {
                required: false,
            },
            placeholder: 'Enter address',
            displayInList: false,
            displayInDetail: true,
            searchable: false,
            sortable: false,
        },
    ],

    ui: {
        title: 'Student Management',
        listTitle: 'Student List',
        addTitle: 'Add New Student',
        editTitle: 'Chỉnh sửa Student',
        detailTitle: 'Student Details',
        navLabel: 'Students',
        searchPlaceholder: 'Search by name, ID, or email',
    },

    sortOptions: [
        { value: '', label: 'Sort by Name' },
        { value: 'name-asc', label: 'Name A-Z' },
        { value: 'name-desc', label: 'Name Z-A' },
        { value: 'class-asc', label: 'Class A-Z' },
        { value: 'class-desc', label: 'Class Z-A' },
    ],
};
