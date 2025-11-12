import React, { useState, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

const UserListPage = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        status: ''
    });
    const [sortBy, setSortBy] = useState('id_asc');

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await api.getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch users');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

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

            // Update local state
            setUsers(prevUsers => 
                prevUsers.map(u => u.id === userId ? updatedUser : u)
            );
        } catch (err) {
            setError(err.message || 'Failed to ban user');
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

            // Update local state
            setUsers(prevUsers => 
                prevUsers.map(u => u.id === userId ? updatedUser : u)
            );
        } catch (err) {
            setError(err.message || 'Failed to unban user');
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
                    currentUser={currentUser}
                />
            </Container>
        </>
    );
};

export default UserListPage;
