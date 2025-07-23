import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/cn';
export const Select = React.forwardRef(({ className, options, label, error, helperText, onChange, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const handleChange = (e) => {
        onChange?.(e.target.value);
    };
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { htmlFor: selectId, className: "block text-sm font-medium text-foreground mb-2", children: label })), _jsx("select", { className: cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive focus-visible:ring-destructive', className), ref: ref, id: selectId, onChange: handleChange, ...props, children: options.map((option) => (_jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value))) }), error && (_jsx("p", { className: "mt-1 text-sm text-destructive", children: error })), helperText && !error && (_jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: helperText }))] }));
});
Select.displayName = 'Select';
