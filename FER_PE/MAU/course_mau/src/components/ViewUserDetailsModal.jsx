import React from 'react';
import { Modal, Table, Badge } from 'react-bootstrap';

const ViewUserDetailsModal = ({ show, onHide, user }) => {
    if (!user) return null;

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

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết Người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mb-4">
                    {user.avatar && (
                        <img 
                            src={user.avatar} 
                            alt={`${user.fullName} avatar`}
                            className="rounded-circle"
                            style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #0d6efd' }}
                            onError={(e) => {
                                e.target.src = '/logo192.png';
                            }}
                        />
                    )}
                </div>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>ID:</td>
                            <td>{user.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Username:</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Full Name:</td>
                            <td>{user.fullName}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Role:</td>
                            <td>{getRoleBadge(user.role)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Status:</td>
                            <td>{getStatusBadge(user.status)}</td>
                        </tr>
                        {user.email && (
                            <tr>
                                <td className="fw-bold">Email:</td>
                                <td>{user.email}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>
                    Đóng
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewUserDetailsModal;
