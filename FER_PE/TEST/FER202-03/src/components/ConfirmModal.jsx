//ConfirmModal.jsx - Modal xác nhận hành động
// File này GIỮ NGUYÊN, không cần thay đổi
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ 
    show, 
    title, 
    message, 
    onConfirm, 
    onHide,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    confirmVariant = 'primary',
    cancelVariant = 'secondary',
    showCancel = true
}) => {
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        if (onHide) {
            onHide();
        }
    };

    return (
        <Modal show={show} centered onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                {showCancel && (
                    <Button variant={cancelVariant} onClick={onHide}>
                        {cancelText}
                    </Button>
                )}
                <Button variant={confirmVariant} onClick={handleConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;

