import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import { FaEye, FaBan, FaUnlock } from 'react-icons/fa';
import ViewUserDetailsModal from './ViewUserDetailsModal';
import ConfirmModal from './ConfirmModal';

const UserTable = ({ users, isLoading, error, onBanUser, onUnbanUser, currentUser }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showBanModal, setShowBanModal] = useState(false);
    const [showUnbanModal, setShowUnbanModal] = useState(false);
    const [userToBan, setUserToBan] = useState(null);
    const [userToUnban, setUserToUnban] = useState(null);

    const getStatusBadge = (status) => {
        const variants = {
            active: 'success',
            blocked: 'danger',
            locked: 'warning'
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
    };

    const getRoleBadge = (role) => {
        return <Badge bg={role === 'admin' ? 'primary' : 'info'}>{role}</Badge>;
    };

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    const handleBanClick = (user) => {
        setUserToBan(user);
        setShowBanModal(true);
    };

    const handleUnbanClick = (user) => {
        setUserToUnban(user);
        setShowUnbanModal(true);
    };

    const handleConfirmBan = async () => {
        if (userToBan) {
            await onBanUser(userToBan.id);
            setShowBanModal(false);
            setUserToBan(null);
        }
    };

    const handleConfirmUnban = async () => {
        if (userToUnban) {
            await onUnbanUser(userToUnban.id);
            setShowUnbanModal(false);
            setUserToUnban(null);
        }
    };

    const isBanned = (status) => {
        return status === 'blocked' || status === 'locked';
    };

    const isCurrentUser = (userId) => {
        return currentUser && currentUser.id === userId;
    };

    if (isLoading) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Body className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 mb-0">Đang tải dữ liệu...</p>
                </Card.Body>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Alert variant="danger">{error}</Alert>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card className="mb-4 shadow-lg border-0">
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center bg-primary text-white">
                    <span className="fw-bold">Danh Sách Người dùng</span>
                    <Badge bg="info" className="fs-6 px-3 py-2">
                        Tổng: {users.length} users
                    </Badge>
                </Card.Header>
                <Card.Body className="p-0">
                    {users.length === 0 ? (
                        <Alert variant="info" className="mb-0 m-3">
                            Không có dữ liệu người dùng nào.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0 align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center" style={{ width: '60px' }}>ID</th>
                                        <th>Username</th>
                                        <th>Full Name</th>
                                        <th className="text-center">Role</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="text-center fw-bold">{user.id}</td>
                                            <td className="fw-semibold">{user.username}</td>
                                            <td>{user.fullName}</td>
                                            <td className="text-center">
                                                {getRoleBadge(user.role)}
                                            </td>
                                            <td className="text-center">
                                                {getStatusBadge(user.status)}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(user)}
                                                        className="d-flex align-items-center gap-1"
                                                        style={{ minWidth: '140px', justifyContent: 'center' }}
                                                    >
                                                        <FaEye /> View Details
                                                    </Button>
                                                    {!isCurrentUser(user.id) && (
                                                        isBanned(user.status) ? (
                                                            <Button
                                                                variant="success"
                                                                size="sm"
                                                                onClick={() => handleUnbanClick(user)}
                                                                className="d-flex align-items-center gap-1"
                                                                style={{ minWidth: '140px', justifyContent: 'center' }}
                                                            >
                                                                <FaUnlock /> Unban Account
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => handleBanClick(user)}
                                                                className="d-flex align-items-center gap-1"
                                                                style={{ minWidth: '140px', justifyContent: 'center' }}
                                                            >
                                                                <FaBan /> Ban Account
                                                            </Button>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* View Details Modal */}
            {selectedUser && (
                <ViewUserDetailsModal
                    show={showViewModal}
                    onHide={() => {
                        setShowViewModal(false);
                        setSelectedUser(null);
                    }}
                    user={selectedUser}
                />
            )}

            {/* Ban Account Confirmation Modal */}
            <ConfirmModal
                show={showBanModal}
                onHide={() => {
                    setShowBanModal(false);
                    setUserToBan(null);
                }}
                title="Xác nhận khóa tài khoản"
                message={userToBan ? `Bạn có chắc chắn muốn khóa tài khoản "${userToBan.username}" (${userToBan.fullName}) không?` : ''}
                onConfirm={handleConfirmBan}
                confirmText="Khóa tài khoản"
                cancelText="Hủy"
                confirmVariant="danger"
                showCancel={true}
            />

            {/* Unban Account Confirmation Modal */}
            <ConfirmModal
                show={showUnbanModal}
                onHide={() => {
                    setShowUnbanModal(false);
                    setUserToUnban(null);
                }}
                title="Xác nhận mở khóa tài khoản"
                message={userToUnban ? `Bạn có chắc chắn muốn mở khóa tài khoản "${userToUnban.username}" (${userToUnban.fullName}) không?` : ''}
                onConfirm={handleConfirmUnban}
                confirmText="Mở khóa tài khoản"
                cancelText="Hủy"
                confirmVariant="success"
                showCancel={true}
            />
        </>
    );
};

export default UserTable;

