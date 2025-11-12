// usersSlice.js - Quản lý state người dùng sử dụng Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

// Initial state
const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

// Tạo async thunk để fetch danh sách users
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getUsers();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch users');
        }
    }
);

// Tạo users slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Reducer đồng bộ để toggle admin status
        toggleAdminStatus: (state, action) => {
            const userId = action.payload;
            const user = state.users.find(u => u.id === userId);
            if (user) {
                // Toggle role giữa 'admin' và 'user'
                user.role = user.role === 'admin' ? 'user' : 'admin';
            }
        },
        // Clear error reducer
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Xử lý pending state
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            // Xử lý fulfilled state
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.error = null;
            })
            // Xử lý rejected state
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const { toggleAdminStatus, clearError } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;

