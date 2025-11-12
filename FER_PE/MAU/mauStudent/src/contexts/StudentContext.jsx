//StudentContext.jsx quản lý students bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const StudentContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialStudentState = {
    students: [],
    filteredStudents: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',      // Tìm kiếm chung (studentId, fullName, email)
        class: '',       // Lọc theo lớp
        gpaMin: '',      // GPA tối thiểu
        gpaMax: '',      // GPA tối đa
    },
    sortBy: 'studentId_asc', // Sắp xếp mặc định theo mã sinh viên
    totalCount: 0,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến students
const studentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            const students = action.payload;
            // Lọc students theo userId của user hiện tại (nếu có)
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
            
            // Filter by search (studentId, fullName, email)
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(student =>
                    (student.studentId && student.studentId.toLowerCase().includes(searchLower)) ||
                    (student.fullName && student.fullName.toLowerCase().includes(searchLower)) ||
                    (student.email && student.email.toLowerCase().includes(searchLower))
                );
            }
            
            // Filter by class
            if (state.filters.class) {
                filtered = filtered.filter(student =>
                    student.class === state.filters.class
                );
            }
            
            // Filter by GPA range
            if (state.filters.gpaMin) {
                const gpaMin = parseFloat(state.filters.gpaMin);
                filtered = filtered.filter(student =>
                    student.gpa >= gpaMin
                );
            }
            
            if (state.filters.gpaMax) {
                const gpaMax = parseFloat(state.filters.gpaMax);
                filtered = filtered.filter(student =>
                    student.gpa <= gpaMax
                );
            }
            
            // Sort
            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'studentId_asc':
                        return (a.studentId || '').localeCompare(b.studentId || '');
                    case 'studentId_desc':
                        return (b.studentId || '').localeCompare(a.studentId || '');
                    case 'fullName_asc':
                        return (a.fullName || '').localeCompare(b.fullName || '');
                    case 'fullName_desc':
                        return (b.fullName || '').localeCompare(a.fullName || '');
                    case 'gpa_asc':
                        return (a.gpa || 0) - (b.gpa || 0);
                    case 'gpa_desc':
                        return (b.gpa || 0) - (a.gpa || 0);
                    case 'dateOfBirth_asc':
                        return new Date(a.dateOfBirth || 0) - new Date(b.dateOfBirth || 0);
                    case 'dateOfBirth_desc':
                        return new Date(b.dateOfBirth || 0) - new Date(a.dateOfBirth || 0);
                    default:
                        return 0;
                }
            });
            
            // Tính total count
            const totalCount = filtered.length;
            
            return {
                ...state,
                filteredStudents: filtered,
                totalCount,
            };
        
        case 'ADD_STUDENT':
            return {
                ...state,
                students: [...state.students, action.payload],
            };
        
        case 'UPDATE_STUDENT':
            return {
                ...state,
                students: state.students.map(student =>
                    student.id === action.payload.id ? action.payload : student
                ),
            };
        
        case 'DELETE_STUDENT':
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
                userId: user.id,
            });
            dispatch({ type: 'ADD_STUDENT', payload: newStudent });
            return { success: true, student: newStudent };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateStudent = async (id, student) => {
        try {
            const updatedStudent = await api.updateStudent(id, student);
            dispatch({ type: 'UPDATE_STUDENT', payload: updatedStudent });
            return { success: true, student: updatedStudent };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deleteStudent = async (id) => {
        try {
            await api.deleteStudent(id);
            dispatch({ type: 'DELETE_STUDENT', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Lấy danh sách unique classes
    const getUniqueClasses = () => {
        const classes = [...new Set(state.students.map(s => s.class).filter(Boolean))];
        return classes.sort();
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
        getUniqueClasses,
    };

    return (
        <StudentContext.Provider value={contextValue}>
            {children}
        </StudentContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng StudentContext dễ dàng hơn
export const useStudent = () => useContext(StudentContext);

