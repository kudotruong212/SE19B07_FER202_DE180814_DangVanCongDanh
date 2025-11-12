//StudentContext.jsx quản lý students bằng Context API và useReducer
// TEMPLATE: Thay đổi 'student' thành tên đối tượng của bạn trong toàn bộ file này
// 📝 HƯỚNG DẪN THAY ĐỔI:
// 1. Thay 'student' -> 'product' (hoặc tên đối tượng của bạn)
// 2. Thay 'students' -> 'products' (hoặc số nhiều của đối tượng)
// 3. Thay các trường filter: 'category', 'name' -> các trường filter của đối tượng của bạn
// 4. Cập nhật logic filter và sort theo các trường của đối tượng mới
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const StudentContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
// 📝 THAY ĐỔI: Cập nhật 'filters' với các trường filter của đối tượng của bạn
const initialStudentState = {
    students: [],
    filteredStudents: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',      // Tìm kiếm chung
        category: '',    // 📝 THAY ĐỔI: Thay 'category' thành trường filter của bạn
        name: '',        // 📝 THAY ĐỔI: Thay 'name' thành trường filter khác của bạn
    },
    sortBy: 'name_asc', // 📝 THAY ĐỔI: Đặt sort mặc định theo trường của bạn
    totalCount: 0,      // 📝 THAY ĐỔI: Nếu không cần tổng, có thể bỏ hoặc thay thành trường khác
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến students
const studentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            const students = action.payload;
            // Lọc students theo userId của user hiện tại (nếu có)
            // 📝 THAY ĐỔI: Nếu không cần filter theo userId, bỏ dòng này
            const userStudents = students.filter(student => 
                student.userId === action.userId
            );
            return {
                ...state,
                students: userStudents,
                isLoading: false,
                error: null,
            };
        
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        
        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.field]: action.value,
                },
            };
        
        case 'SET_SORT':
            return {
                ...state,
                sortBy: action.payload,
            };
        
        case 'APPLY_FILTERS_AND_SORT':
            // Áp dụng filters và sort
            let filtered = [...state.students];
            
            // Filter by search (category hoặc name)
            // 📝 THAY ĐỔI: Cập nhật các trường được tìm kiếm ở đây
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(student =>
                    (student.category && student.category.toLowerCase().includes(searchLower)) ||
                    (student.name && student.name.toLowerCase().includes(searchLower))
                );
            }
            
            // Filter by category
            // 📝 THAY ĐỔI: Thay 'category' thành trường filter của bạn
            if (state.filters.category) {
                filtered = filtered.filter(student =>
                    student.category === state.filters.category
                );
            }
            
            // Filter by name
            // 📝 THAY ĐỔI: Thay 'name' thành trường filter khác của bạn
            if (state.filters.name) {
                filtered = filtered.filter(student =>
                    student.name === state.filters.name
                );
            }
            
            // Sort
            // 📝 THAY ĐỔI: Cập nhật các option sort theo trường của đối tượng của bạn
            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'name_asc':
                        return (a.name || '').localeCompare(b.name || '');
                    case 'name_desc':
                        return (b.name || '').localeCompare(a.name || '');
                    case 'date_asc':
                        return new Date(a.date || 0) - new Date(b.date || 0);
                    case 'date_desc':
                        return new Date(b.date || 0) - new Date(a.date || 0);
                    case 'price_asc':
                        return (a.price || 0) - (b.price || 0);
                    case 'price_desc':
                        return (b.price || 0) - (a.price || 0);
                    default:
                        return 0;
                }
            });
            
            // Tính total count
            // 📝 THAY ĐỔI: Nếu không cần tổng, bỏ phần này hoặc thay thành tính toán khác
            const totalCount = filtered.length;
            
            return {
                ...state,
                filteredStudents: filtered,
                totalCount,
            };
        
        case 'ADD_ITEM':
            return {
                ...state,
                students: [...state.students, action.payload],
            };
        
        case 'UPDATE_ITEM':
            return {
                ...state,
                students: state.students.map(student =>
                    student.id === action.payload.id ? action.payload : student
                ),
            };
        
        case 'DELETE_ITEM':
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload),
            };
        
        default:
            return state;
    }
};

// 4. Tạo StudentProvider để cung cấp Context cho các component con
export const StudentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(studentReducer, initialStudentState);
    const { user } = useAuth();

    // Fetch students khi component mount hoặc user thay đổi
    useEffect(() => {
        if (user && user.id) {
            fetchStudents();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    // Áp dụng filters và sort khi có thay đổi
    useEffect(() => {
        if (state.students.length > 0) {
            dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
        }
    }, [state.students, state.filters, state.sortBy]);

    const fetchStudents = async () => {
        if (!user || !user.id) return;
        
        dispatch({ type: 'FETCH_START' });
        try {
            const students = await api.getStudents();
            dispatch({ type: 'FETCH_SUCCESS', payload: students, userId: user.id });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
    };

    const setFilter = (field, value) => {
        dispatch({ type: 'SET_FILTER', field, value });
    };

    const setSort = (sortBy) => {
        dispatch({ type: 'SET_SORT', payload: sortBy });
    };

    const addStudent = async (student) => {
        try {
            const newStudent = await api.addStudent({
                ...student,
                userId: user.id, // 📝 THAY ĐỔI: Bỏ nếu không cần userId
            });
            dispatch({ type: 'ADD_ITEM', payload: newStudent });
            return { success: true, student: newStudent };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateStudent = async (id, student) => {
        try {
            const updatedStudent = await api.updateStudent(id, student);
            dispatch({ type: 'UPDATE_ITEM', payload: updatedStudent });
            return { success: true, student: updatedStudent };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deleteStudent = async (id) => {
        try {
            await api.deleteStudent(id);
            dispatch({ type: 'DELETE_ITEM', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Lấy danh sách unique categories và names
    // 📝 THAY ĐỔI: Thay các hàm này thành các hàm lấy unique values của trường filter của bạn
    const getUniqueCategories = () => {
        const categories = [...new Set(state.students.map(i => i.category).filter(Boolean))];
        return categories.sort();
    };

    const getUniqueNames = () => {
        const names = [...new Set(state.students.map(i => i.name).filter(Boolean))];
        return names.sort();
    };

    const contextValue = {
        // State
        students: state.filteredStudents,
        allStudents: state.students,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        sortBy: state.sortBy,
        totalCount: state.totalCount,
        
        // Actions
        fetchStudents,
        setFilter,
        setSort,
        addStudent,
        updateStudent,
        deleteStudent,
        getUniqueCategories,
        getUniqueNames,
    };

    return (
        <StudentContext.Provider value={contextValue}>
            {children}
        </StudentContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng StudentContext dễ dàng hơn
export const useStudent = () => useContext(StudentContext);

