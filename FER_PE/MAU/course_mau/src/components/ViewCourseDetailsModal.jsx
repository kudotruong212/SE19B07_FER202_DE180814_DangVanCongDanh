import React from 'react';
import { Modal, Table, Badge, Row, Col } from 'react-bootstrap';

const ViewCourseDetailsModal = ({ show, onHide, course }) => {
    if (!course) return null;

    // Format số tiền
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    // Format ngày
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Get status badge
    const getStatusBadge = (status) => {
        const variants = {
            upcoming: 'info',
            ongoing: 'success',
            completed: 'secondary',
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết Khóa Học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {course.imageUrl && (
                    <div className="text-center mb-4">
                        <img 
                            src={course.imageUrl} 
                            alt={course.title}
                            className="img-fluid"
                            style={{ maxHeight: '200px', objectFit: 'cover', border: '3px solid #0d6efd', borderRadius: '8px' }}
                            onError={(e) => {
                                e.target.src = '/logo192.png';
                            }}
                        />
                    </div>
                )}
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className="fw-bold" style={{ width: '40%' }}>ID:</td>
                            <td>{course.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Title:</td>
                            <td>{course.title}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Instructor:</td>
                            <td>{course.instructor}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Category:</td>
                            <td>
                                <Badge bg="secondary">{course.category}</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Duration:</td>
                            <td>{course.duration} giờ</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Price:</td>
                            <td className="text-success fw-bold fs-5">
                                {formatCurrency(course.price)}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Start Date:</td>
                            <td>{formatDate(course.startDate)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">End Date:</td>
                            <td>{formatDate(course.endDate)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Status:</td>
                            <td>{getStatusBadge(course.status)}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Students:</td>
                            <td className="fw-bold">{course.students} học viên</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Description:</td>
                            <td>{course.description}</td>
                        </tr>
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

export default ViewCourseDetailsModal;
