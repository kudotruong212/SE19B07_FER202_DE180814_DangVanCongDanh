//ViewDetailsModal.jsx - Modal xem chi tiết student
import React from 'react';
import { Modal, Table, Badge } from 'react-bootstrap';

const ViewDetailsModal = ({ show, onHide, student }) => {
    if (!student) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatGPA = (gpa) => {
        return gpa ? gpa.toFixed(2) : '0.00';
    };

    const getGPAColor = (gpa) => {
        if (gpa >= 3.5) return 'success';
        if (gpa >= 2.5) return 'warning';
        return 'danger';
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết Sinh Viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>ID:</td>
                            <td>{student.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Mã Sinh Viên:</td>
                            <td className="fw-semibold">{student.studentId}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Họ và Tên:</td>
                            <td>{student.fullName}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Email:</td>
                            <td>{student.email}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Số Điện Thoại:</td>
                            <td>{student.phone}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Lớp:</td>
                            <td>
                                <Badge bg="primary">{student.class}</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">GPA:</td>
                            <td>
                                <Badge bg={getGPAColor(student.gpa)} className="fs-6">
                                    {formatGPA(student.gpa)}
                                </Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Ngày Sinh:</td>
                            <td>{formatDate(student.dateOfBirth)}</td>
                        </tr>
                        {student.userId && (
                            <tr>
                                <td className="fw-bold">User ID:</td>
                                <td>{student.userId}</td>
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

export default ViewDetailsModal;

