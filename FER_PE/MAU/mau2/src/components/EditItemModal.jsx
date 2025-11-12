//EditItemModal.jsx - Modal chỉnh sửa item
// CONFIG-BASED: Sử dụng DynamicEditModal từ entityConfig
// CHỈ CẦN SỬA entityConfig.js để thay đổi fields!
import React from 'react';
import { useItems } from '../contexts/ItemContext';
import DynamicEditModal from './generic/DynamicEditModal';

const EditItemModal = ({ show, onHide, item, onSuccess }) => {
    const { updateItem } = useItems();
    
    // Sử dụng DynamicEditModal - tự động từ config
    // KHÔNG CẦN VIẾT FORM THỦ CÔNG NỮA!
    return (
        <DynamicEditModal
            show={show}
            onHide={onHide}
            item={item}
            onSuccess={onSuccess}
            updateItem={updateItem}
        />
    );
};

export default EditItemModal;
