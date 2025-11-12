// DynamicForm.jsx - Form động dựa trên entityConfig
// Component này tự động render form fields từ config
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { entityConfig } from '../../config/entityConfig';

const DynamicForm = ({ formData, errors, onChange, disabled = false, layout = 'default' }) => {
    const { fields } = entityConfig;

    // Render field dựa trên type
    const renderField = (field) => {
        const value = formData[field.name] || '';
        const error = errors[field.name];
        const isInvalid = !!error;

        // Common props
        const commonProps = {
            name: field.name,
            value: value,
            onChange: onChange,
            placeholder: field.placeholder,
            isInvalid: isInvalid,
            disabled: disabled,
        };

        // Additional props based on type
        switch (field.type) {
            case 'textarea':
                return (
                    <Form.Control
                        as="textarea"
                        rows={4}
                        {...commonProps}
                    />
                );

            case 'date':
                return (
                    <Form.Control
                        type="date"
                        {...commonProps}
                    />
                );

            case 'number':
                const numberProps = {
                    ...commonProps,
                    type: 'number',
                    min: field.validation?.min !== undefined ? field.validation.min : '0',
                    step: field.name === 'price' ? '0.01' : '1',
                };
                return <Form.Control {...numberProps} />;

            case 'email':
                return (
                    <Form.Control
                        type="email"
                        {...commonProps}
                    />
                );

            case 'tel':
                return (
                    <Form.Control
                        type="tel"
                        {...commonProps}
                    />
                );

            case 'select':
                return (
                    <Form.Select
                        {...commonProps}
                        value={value}
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                );

            default: // text
                return (
                    <Form.Control
                        type="text"
                        {...commonProps}
                    />
                );
        }
    };

    // Render field với label và feedback
    const renderFieldGroup = (field) => {
        const error = errors[field.name];

        // Nếu layout là 'two-column', chia làm 2 cột (trừ textarea, description, image)
        const isFullWidth = field.type === 'textarea' || 
                           field.name === 'description' || 
                           field.name === 'image';

        if (layout === 'two-column' && !isFullWidth) {
            return (
                <Col md={6} key={field.name}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            {field.label} {field.required && '*'}
                        </Form.Label>
                        {renderField(field)}
                        {error && (
                            <Form.Control.Feedback type="invalid">
                                {error}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
            );
        }

        // Layout mặc định: full width
        return (
            <Form.Group key={field.name} className="mb-3">
                <Form.Label>
                    {field.label} {field.required && '*'}
                </Form.Label>
                {renderField(field)}
                {error && (
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        );
    };

    // Group fields theo layout
    if (layout === 'two-column') {
        // Tách fields thành 2 nhóm: 2 cột và full width
        const twoColumnFields = fields.filter(
            f => f.type !== 'textarea' && f.name !== 'description' && f.name !== 'image'
        );
        const fullWidthFields = fields.filter(
            f => f.type === 'textarea' || f.name === 'description' || f.name === 'image'
        );

        return (
            <>
                <Row>
                    {twoColumnFields.map(field => renderFieldGroup(field))}
                </Row>
                {fullWidthFields.map(field => renderFieldGroup(field))}
            </>
        );
    }

    // Layout mặc định: full width cho tất cả
    return (
        <>
            {fields.map(field => renderFieldGroup(field))}
        </>
    );
};

export default DynamicForm;