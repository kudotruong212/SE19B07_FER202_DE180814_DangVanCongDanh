//StudentTable.jsx - Component hiển thị bảng danh sách students
// TEMPLATE: Thay đổi các cột và trường hiển thị theo đối tượng của bạn
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

    // 📝 THAY ĐỔI: Format theo định dạng của đối tượng của bạn
    

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
                <Card.Header as="h5" className="d-flex justify-content-between align-students-center bg-primary text-white">
                    {/* 📝 THAY ĐỔI: Thay 'Danh Sách Students' */}
                    <span className="fw-bold">Danh Sách Students</span>
                    {/* 📝 THAY ĐỔI: Thay 'totalCount' thành tổng của đối tượng của bạn */}
                    <Badge bg="success" className="fs-6 px-3 py-2">
                        Tổng: {totalCount} students
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
                                        {/* 📝 THAY ĐỔI: Thay các cột theo đối tượng của bạn */}
                                        <th>ID</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th className="text-end">Major</th>
                                        <th className="text-center" style={{ width: '280px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.id}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            <td>
                                                <Badge bg="primary" className="px-3 py-2">
                                                    {student.id}
                                                </Badge>
                                            </td>
                                            <td className="fw-semibold">{student.fullName}</td>
                                            <td className="text-end fw-bold text-success fs-6">
                                                {student.email}
                                            </td>
                                            <td className="text-end">{student.major}</td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(student)}
                                                        className="d-flex align-students-center gap-1"
                                                    >
                                                        <FaEye /> View
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleEdit(student)}
                                                        className="d-flex align-students-center gap-1"
                                                    >
                                                        <FaPencilAlt /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(student)}
                                                        className="d-flex align-students-center gap-1"
                                                    >
                                                        <FaTrashAlt /> Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                {/* 📝 THAY ĐỔI: Thay tfoot nếu cần tính tổng */}
                                <tfoot className="table-light">
                                    <tr>
                                        <th colSpan="4" className="text-end">Tổng số students:</th>
                                        <th className="text-end fw-bold text-success fs-4">
                                            {students.length}
                                        </th>
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
                message={studentToDelete ? `Bạn có chắc chắn muốn xóa student "${studentToDelete.name}" không?` : ''}
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

