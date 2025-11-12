//CourseContext.jsx quản lý khóa học bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const CourseContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialCourseState = {
    courses: [],
    filteredCourses: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        category: '',
        status: '',
    },
    sortBy: 'title_asc', // Mặc định sort theo title ascending
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến courses
const courseReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            const courses = action.payload;
            return {
                ...state,
                courses: courses,
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
            let filtered = [...state.courses];
            
            // Filter by search (title, instructor)
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(course =>
                    course.title.toLowerCase().includes(searchLower) ||
                    course.instructor.toLowerCase().includes(searchLower)
                );
            }
            
            // Filter by category
            if (state.filters.category) {
                filtered = filtered.filter(course =>
                    course.category === state.filters.category
                );
            }
            
            // Filter by status
            if (state.filters.status) {
                filtered = filtered.filter(course =>
                    course.status === state.filters.status
                );
            }
            
            // Sort
            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'title_asc':
                        return a.title.localeCompare(b.title);
                    case 'title_desc':
                        return b.title.localeCompare(a.title);
                    case 'instructor_asc':
                        return a.instructor.localeCompare(b.instructor);
                    case 'instructor_desc':
                        return b.instructor.localeCompare(a.instructor);
                    case 'price_asc':
                        return a.price - b.price;
                    case 'price_desc':
                        return b.price - a.price;
                    case 'startDate_asc':
                        return new Date(a.startDate) - new Date(b.startDate);
                    case 'startDate_desc':
                        return new Date(b.startDate) - new Date(a.startDate);
                    case 'students_asc':
                        return a.students - b.students;
                    case 'students_desc':
                        return b.students - a.students;
                    default:
                        return 0;
                }
            });
            
            // Tính tổng courses, students, và revenue
            const totalCourses = filtered.length;
            const totalStudents = filtered.reduce((sum, course) => sum + course.students, 0);
            const totalRevenue = filtered.reduce((sum, course) => sum + (course.price * course.students), 0);
            
            return {
                ...state,
                filteredCourses: filtered,
                totalCourses,
                totalStudents,
                totalRevenue,
            };
        
        case 'ADD_COURSE':
            return {
                ...state,
                courses: [...state.courses, action.payload],
            };
        
        case 'UPDATE_COURSE':
            return {
                ...state,
                courses: state.courses.map(course =>
                    course.id === action.payload.id ? action.payload : course
                ),
            };
        
        case 'DELETE_COURSE':
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.payload),
            };
        
        default:
            return state;
    }
};

// 4. Tạo CourseProvider để cung cấp Context cho các component con
export const CourseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(courseReducer, initialCourseState);

    // Fetch courses khi component mount
    useEffect(() => {
        fetchCourses();
    }, []);

    // Áp dụng filters và sort khi có thay đổi
    useEffect(() => {
        if (state.courses.length > 0) {
            dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
        }
    }, [state.courses, state.filters, state.sortBy]);

    const fetchCourses = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const courses = await api.getCourses();
            dispatch({ type: 'FETCH_SUCCESS', payload: courses });
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

    const addCourse = async (course) => {
        try {
            const newCourse = await api.addCourse(course);
            dispatch({ type: 'ADD_COURSE', payload: newCourse });
            return { success: true, course: newCourse };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateCourse = async (id, course) => {
        try {
            const updatedCourse = await api.updateCourse(id, course);
            dispatch({ type: 'UPDATE_COURSE', payload: updatedCourse });
            return { success: true, course: updatedCourse };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deleteCourse = async (id) => {
        try {
            await api.deleteCourse(id);
            dispatch({ type: 'DELETE_COURSE', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Lấy danh sách unique categories và statuses
    const getUniqueCategories = () => {
        const categories = [...new Set(state.courses.map(c => c.category))];
        return categories.sort();
    };

    const getUniqueStatuses = () => {
        const statuses = [...new Set(state.courses.map(c => c.status))];
        return statuses.sort();
    };

    const contextValue = {
        // State
        courses: state.filteredCourses,
        allCourses: state.courses,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        sortBy: state.sortBy,
        totalCourses: state.totalCourses,
        totalStudents: state.totalStudents,
        totalRevenue: state.totalRevenue,
        
        // Actions
        fetchCourses,
        setFilter,
        setSort,
        addCourse,
        updateCourse,
        deleteCourse,
        getUniqueCategories,
        getUniqueStatuses,
    };

    return (
        <CourseContext.Provider value={contextValue}>
            {children}
        </CourseContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng CourseContext dễ dàng hơn
export const useCourse = () => useContext(CourseContext);
