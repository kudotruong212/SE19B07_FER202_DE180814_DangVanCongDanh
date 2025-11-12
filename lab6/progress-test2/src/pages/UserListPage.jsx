import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { useAuth } from '../contexts/AuthContext';
import { fetchUsers, toggleAdminStatus, selectUsers, selectUsersLoading, selectUsersError } from '../store/usersSlice';
import * as api from '../services/api';

const UserListPage = () => {
    const { user: currentUser } = useAuth();
    const dispatch = useDispatch();
    
    // Sử dụng Redux selectors để lấy data từ store
    const users = useSelector(selectUsers);
    const isLoading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);
    
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        status: ''
    });
    const [sortBy, setSortBy] = useState('id_asc');

    // Fetch users from API using Redux thunk
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Filter and sort users
    const filteredAndSortedUsers = useMemo(() => {
        let result = [...users];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(user => 
                user.username.toLowerCase().includes(searchLower) ||
                user.fullName.toLowerCase().includes(searchLower)
            );
        }

        // Apply role filter
        if (filters.role) {
            result = result.filter(user => user.role === filters.role);
        }

        // Apply status filter
        if (filters.status) {
            result = result.filter(user => user.status === filters.status);
        }

        // Apply sorting
        if (sortBy) {
            const [field, direction] = sortBy.split('_');
            result.sort((a, b) => {
                let aVal = a[field];
                let bVal = b[field];

                // Handle string comparison
                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }

                if (direction === 'asc') {
                    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                } else {
                    return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
                }
            });
        }

        return result;
    }, [users, filters, sortBy]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handleBanUser = async (userId) => {
        try {
            const user = users.find(u => u.id === userId);
            if (!user) return;

            // Update user status to 'blocked'
            const updatedUser = {
                ...user,
                status: 'blocked'
            };

            await api.updateUser(userId, updatedUser);

            // Fetch lại users từ Redux store sau khi update
            dispatch(fetchUsers());
        } catch (err) {
            // Error sẽ được xử lý bởi Redux nếu cần
            console.error('Failed to ban user:', err);
        }
    };

    const handleUnbanUser = async (userId) => {
        try {
            const user = users.find(u => u.id === userId);
            if (!user) return;

            // Update user status to 'active'
            const updatedUser = {
                ...user,
                status: 'active'
            };

            await api.updateUser(userId, updatedUser);

            // Fetch lại users từ Redux store sau khi update
            dispatch(fetchUsers());
        } catch (err) {
            // Error sẽ được xử lý bởi Redux nếu cần
            console.error('Failed to unban user:', err);
        }
    };

    // Handler để toggle admin status sử dụng Redux action
    const handleToggleAdminStatus = async (userId) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        // Toggle trong Redux store trước (optimistic update)
        dispatch(toggleAdminStatus(userId));
        
        // Sau đó cập nhật lên server
        const updatedUser = {
            ...user,
            role: user.role === 'admin' ? 'user' : 'admin'
        };
        
        try {
            await api.updateUser(userId, updatedUser);
        } catch (err) {
            console.error('Failed to update user on server:', err);
            // Rollback bằng cách fetch lại từ server
            dispatch(fetchUsers());
        }
    };

    return (
        <>
            <NavigationHeader />
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                    <h2>User Management</h2>
                </div>

                <UserFilter
                    filters={filters}
                    sortBy={sortBy}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />

                <UserTable
                    users={filteredAndSortedUsers}
                    isLoading={isLoading}
                    error={error}
                    onBanUser={handleBanUser}
                    onUnbanUser={handleUnbanUser}
                    onToggleAdminStatus={handleToggleAdminStatus}
                    currentUser={currentUser}
                />
            </Container>
        </>
    );
};

export default UserListPage;

