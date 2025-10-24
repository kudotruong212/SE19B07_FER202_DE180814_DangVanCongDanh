import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModalComponent = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState({
    title: 'Xác nhận',
    message: 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText: 'Xác nhận',
    cancelText: 'Hủy',
    variant: 'primary'
  });

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    showConfirm: (newConfig) => {
      setConfig({ ...config, ...newConfig });
      setShow(true);
    },
    hide: () => setShow(false)
  }));

  const handleConfirm = async () => {
    if (props.onConfirm) {
      await props.onConfirm();
    }
    setShow(false);
  };

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
    setShow(false);
  };

  return (
    <Modal 
      show={show} 
      onHide={handleCancel} 
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{config.title}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <p>{config.message}</p>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          {config.cancelText}
        </Button>
        <Button variant={config.variant} onClick={handleConfirm}>
          {config.confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

ConfirmModalComponent.displayName = 'ConfirmModalComponent';

export default ConfirmModalComponent;

