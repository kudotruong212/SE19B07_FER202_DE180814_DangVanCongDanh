import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { useCourse } from '../contexts/CourseContext';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ViewCourseDetailsModal from './ViewCourseDetailsModal';
import EditCourseModal from './EditCourseModal';
import ConfirmModal from './ConfirmModal';

const CourseTable = () => {
    const { courses, isLoading, error, totalCourses, totalStudents, totalRevenue, deleteCourse } = useCourse();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

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
            month: '2-digit',
            day: '2-digit',
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

    const handleViewDetails = (course) => {
        setSelectedCourse(course);
        setShowViewModal(true);
    };

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setShowEditModal(true);
    };

    const handleDeleteClick = (course) => {
        setCourseToDelete(course);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (courseToDelete) {
            const result = await deleteCourse(courseToDelete.id);
            if (result.success) {
                setShowDeleteModal(false);
                setCourseToDelete(null);
            }
        }
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
        setSelectedCourse(null);
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
                    <span className="fw-bold">Danh Sách Khóa Học</span>
                    <div className="d-flex gap-3">
                        <Badge bg="info" className="fs-6 px-3 py-2">
                            Tổng: {totalCourses} khóa
                        </Badge>
                        <Badge bg="success" className="fs-6 px-3 py-2">
                            Học viên: {totalStudents}
                        </Badge>
                        <Badge bg="warning" className="fs-6 px-3 py-2">
                            Doanh thu: {formatCurrency(totalRevenue)}
                        </Badge>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    {courses.length === 0 ? (
                        <Alert variant="info" className="mb-0 m-3">
                            Không có dữ liệu khóa học nào.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0 align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center" style={{ width: '60px' }}>#</th>
                                        <th>Title</th>
                                        <th>Instructor</th>
                                        <th>Category</th>
                                        <th className="text-center">Duration</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-center">Students</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course, index) => (
                                        <tr key={course.id}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            <td className="fw-semibold">{course.title}</td>
                                            <td>{course.instructor}</td>
                                            <td>
                                                <Badge bg="secondary" className="px-2 py-1">
                                                    {course.category}
                                                </Badge>
                                            </td>
                                            <td className="text-center">{course.duration} giờ</td>
                                            <td className="text-end fw-bold text-success fs-6">
                                                {formatCurrency(course.price)}
                                            </td>
                                            <td className="text-center fw-bold">{course.students}</td>
                                            <td className="text-center">
                                                {getStatusBadge(course.status)}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(course)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaEye /> View
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleEdit(course)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaPencilAlt /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(course)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaTrashAlt /> Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="table-info">
                                        <td colSpan="5" className="text-end fw-bold fs-5">Tổng kết:</td>
                                        <td className="text-end fw-bold fs-5 text-success">
                                            {formatCurrency(totalRevenue)}
                                        </td>
                                        <td className="text-center fw-bold fs-5 text-primary">
                                            {totalStudents}
                                        </td>
                                        <td className="text-center fw-bold fs-6">
                                            {totalCourses} khóa
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* View Details Modal */}
            {selectedCourse && (
                <ViewCourseDetailsModal
                    show={showViewModal}
                    onHide={() => {
                        setShowViewModal(false);
                        setSelectedCourse(null);
                    }}
                    course={selectedCourse}
                />
            )}

            {/* Edit Course Modal */}
            {selectedCourse && (
                <EditCourseModal
                    show={showEditModal}
                    onHide={() => {
                        setShowEditModal(false);
                        setSelectedCourse(null);
                    }}
                    course={selectedCourse}
                    onSuccess={handleEditSuccess}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setCourseToDelete(null);
                }}
                title="Xác nhận xóa"
                message={courseToDelete ? `Bạn có chắc chắn muốn xóa khóa học "${courseToDelete.title}" không?` : ''}
                onConfirm={handleConfirmDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                confirmVariant="danger"
                showCancel={true}
            />
        </>
    );
};

export default CourseTable;
