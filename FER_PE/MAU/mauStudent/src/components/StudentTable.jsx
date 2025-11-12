//StudentTable.jsx - Component hiển thị bảng danh sách students
import React, { useState } from 'react';
import { Table, Card, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import { useStudent } from '../contexts/StudentContext';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ViewDetailsModal from './ViewDetailsModal';
import EditStudentModal from './EditStudentModal';
import ConfirmModal from './ConfirmModal';

const StudentTable = () => {
    const { students, isLoading, error, totalCount, deleteStudent } = useStudent();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
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

    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setShowViewModal(true);
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setShowEditModal(true);
    };

    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (studentToDelete) {
            const result = await deleteStudent(studentToDelete.id);
            if (result.success) {
                setShowDeleteModal(false);
                setStudentToDelete(null);
            }
        }
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
        setSelectedStudent(null);
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
                    <span className="fw-bold">Danh Sách Sinh Viên</span>
                    <Badge bg="success" className="fs-6 px-3 py-2">
                        Tổng: {totalCount} sinh viên
                    </Badge>
                </Card.Header>
                <Card.Body className="p-0">
                    {students.length === 0 ? (
                        <Alert variant="info" className="mb-0 m-3">
                            Không có dữ liệu nào.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="mb-0 align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center" style={{ width: '60px' }}>#</th>
                                        <th>Mã SV</th>
                                        <th>Họ và Tên</th>
                                        <th>Email</th>
                                        <th>SĐT</th>
                                        <th>Lớp</th>
                                        <th className="text-center">GPA</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.id}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            <td className="fw-semibold">{student.studentId}</td>
                                            <td>{student.fullName}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phone}</td>
                                            <td>
                                                <Badge bg="primary" className="px-3 py-2">
                                                    {student.class}
                                                </Badge>
                                            </td>
                                            <td className="text-center">
                                                <Badge bg={getGPAColor(student.gpa)} className="px-3 py-2 fs-6">
                                                    {formatGPA(student.gpa)}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(student)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaEye /> View
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleEdit(student)}
                                                        className="d-flex align-items-center gap-1"
                                                    >
                                                        <FaPencilAlt /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(student)}
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
                                        <td colSpan="6" className="text-end fw-bold fs-5">Total Count:</td>
                                        <td className="text-center fw-bold text-success fs-4">
                                            {totalCount}
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
            {selectedStudent && (
                <ViewDetailsModal
                    show={showViewModal}
                    onHide={() => {
                        setShowViewModal(false);
                        setSelectedStudent(null);
                    }}
                    student={selectedStudent}
                />
            )}

            {/* Edit Student Modal */}
            {selectedStudent && (
                <EditStudentModal
                    show={showEditModal}
                    onHide={() => {
                        setShowEditModal(false);
                        setSelectedStudent(null);
                    }}
                    student={selectedStudent}
                    onSuccess={handleEditSuccess}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setStudentToDelete(null);
                }}
                title="Xác nhận xóa"
                message={studentToDelete ? `Bạn có chắc chắn muốn xóa sinh viên "${studentToDelete.fullName}" (${studentToDelete.studentId}) không?` : ''}
                onConfirm={handleConfirmDelete}
                confirmText="Xóa"
                cancelText="Hủy"
                confirmVariant="danger"
                showCancel={true}
            />
        </>
    );
};

export default StudentTable;

