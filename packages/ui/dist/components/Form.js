"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/cn';
export const Form = ({ fields, onSubmit, initialData = {}, submitText = 'Submit', className }) => {
    const [formData, setFormData] = React.useState(initialData);
    const [errors, setErrors] = React.useState({});
    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            }
            else if (field.validation) {
                const validationError = field.validation(formData[field.name]);
                if (validationError) {
                    newErrors[field.name] = validationError;
                }
            }
        });
        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        }
        else {
            setErrors(newErrors);
        }
    };
    const renderField = (field) => {
        const commonProps = {
            value: formData[field.name] || '',
            onChange: (e) => handleChange(field.name, e.target.value),
            placeholder: field.placeholder,
            required: field.required,
            className: 'w-full'
        };
        switch (field.type) {
            case 'textarea':
                return (_jsx("textarea", { ...commonProps, rows: 4, className: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" }));
            case 'select':
                return (_jsxs("select", { ...commonProps, className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", children: [_jsx("option", { value: "", children: "Select an option" }), field.options?.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }));
            default:
                return (_jsx("input", { ...commonProps, type: field.type, className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" }));
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: cn('space-y-4', className), children: [fields.map(field => (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-foreground mb-2", children: [field.label, field.required && _jsx("span", { className: "text-destructive ml-1", children: "*" })] }), renderField(field), errors[field.name] && (_jsx("p", { className: "mt-1 text-sm text-destructive", children: errors[field.name] }))] }, field.name))), _jsx("button", { type: "submit", className: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2", children: submitText })] }));
};
