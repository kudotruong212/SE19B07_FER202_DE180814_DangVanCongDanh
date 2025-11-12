//BookContext.jsx quản lý sách bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const BookContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialBookState = {
    books: [],
    filteredBooks: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        category: '',
        status: '',
    },
    sortBy: 'title_asc', // Mặc định sort theo title ascending
    totalBooks: 0,
    totalValue: 0,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến books
const bookReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        
        case 'FETCH_SUCCESS':
            const books = action.payload;
            return {
                ...state,
                books: books,
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
            let filtered = [...state.books];
            
            // Filter by search (title, author, or isbn)
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(book =>
                    book.title.toLowerCase().includes(searchLower) ||
                    book.author.toLowerCase().includes(searchLower) ||
                    book.isbn.toLowerCase().includes(searchLower)
                );
            }
            
            // Filter by category
            if (state.filters.category) {
                filtered = filtered.filter(book =>
                    book.category === state.filters.category
                );
            }
            
            // Filter by status
            if (state.filters.status) {
                filtered = filtered.filter(book =>
                    book.status === state.filters.status
                );
            }
            
            // Sort
            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'title_asc':
                        return a.title.localeCompare(b.title);
                    case 'title_desc':
                        return b.title.localeCompare(a.title);
                    case 'author_asc':
                        return a.author.localeCompare(b.author);
                    case 'author_desc':
                        return b.author.localeCompare(a.author);
                    case 'price_asc':
                        return a.price - b.price;
                    case 'price_desc':
                        return b.price - a.price;
                    case 'publishedDate_asc':
                        return new Date(a.publishedDate) - new Date(b.publishedDate);
                    case 'publishedDate_desc':
                        return new Date(b.publishedDate) - new Date(a.publishedDate);
                    default:
                        return 0;
                }
            });
            
            // Tính total books và total value
            const totalBooks = filtered.length;
            const totalValue = filtered.reduce((sum, book) => sum + book.price, 0);
            
            return {
                ...state,
                filteredBooks: filtered,
                totalBooks,
                totalValue,
            };
        
        case 'ADD_BOOK':
            return {
                ...state,
                books: [...state.books, action.payload],
            };
        
        case 'UPDATE_BOOK':
            return {
                ...state,
                books: state.books.map(book =>
                    book.id === action.payload.id ? action.payload : book
                ),
            };
        
        case 'DELETE_BOOK':
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload),
            };
        
        default:
            return state;
    }
};

// 4. Tạo BookProvider để cung cấp Context cho các component con
export const BookProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, initialBookState);

    // Fetch books khi component mount
    useEffect(() => {
        fetchBooks();
    }, []);

    // Áp dụng filters và sort khi có thay đổi
    useEffect(() => {
        if (state.books.length > 0) {
            dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
        }
    }, [state.books, state.filters, state.sortBy]);

    const fetchBooks = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const books = await api.getBooks();
            dispatch({ type: 'FETCH_SUCCESS', payload: books });
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

    const addBook = async (book) => {
        try {
            const newBook = await api.addBook(book);
            dispatch({ type: 'ADD_BOOK', payload: newBook });
            return { success: true, book: newBook };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateBook = async (id, book) => {
        try {
            const updatedBook = await api.updateBook(id, book);
            dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
            return { success: true, book: updatedBook };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deleteBook = async (id) => {
        try {
            await api.deleteBook(id);
            dispatch({ type: 'DELETE_BOOK', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Lấy danh sách unique categories và statuses
    const getUniqueCategories = () => {
        const categories = [...new Set(state.books.map(b => b.category))];
        return categories.sort();
    };

    const getUniqueStatuses = () => {
        const statuses = [...new Set(state.books.map(b => b.status))];
        return statuses.sort();
    };

    const contextValue = {
        // State
        books: state.filteredBooks,
        allBooks: state.books,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        sortBy: state.sortBy,
        totalBooks: state.totalBooks,
        totalValue: state.totalValue,
        
        // Actions
        fetchBooks,
        setFilter,
        setSort,
        addBook,
        updateBook,
        deleteBook,
        getUniqueCategories,
        getUniqueStatuses,
    };

    return (
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng BookContext dễ dàng hơn
export const useBook = () => useContext(BookContext);
