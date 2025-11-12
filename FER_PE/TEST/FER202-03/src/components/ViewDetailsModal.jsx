//ViewDetailsModal.jsx - Modal xem chi tiết student
// TEMPLATE: Thay đổi các trường hiển thị theo đối tượng của bạn
import React from 'react';
import { Modal, Table, Badge } from 'react-bootstrap';

const ViewDetailsModal = ({ show, onHide, student }) => {
    if (!student) return null;

    // 📝 THAY ĐỔI: Format theo định dạng của đối tượng của bạn

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                {/* 📝 THAY ĐỔI: Thay 'Chi tiết Student' */}
                <Modal.Title>Chi tiết Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered>
                    <tbody>
                        {/* 📝 THAY ĐỔI: Thay các dòng hiển thị theo các trường của đối tượng của bạn */}
                        <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>ID:</td>
                            <td>{student.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Full Name</td>
                            <td>
                                <Badge bg="primary">{student.fullName}</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Email:</td>
                            <td>{student.email}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Major:</td>
                            <td className="text-success fw-bold fs-5">
                                {student.major}
                            </td>
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

