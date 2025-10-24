//ConfirmModal.jsx is used for all confirmation modals in the app.
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
function ConfirmModal({ show, title, message, onConfirm, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>   
            <Modal.Footer>
               <Button variant="primary" onClick={onConfirm}>
                    Close
                </Button>
                </Modal.Footer>
                </Modal>
                    );}
export default ConfirmModal;
