import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/cn';
export const Input = React.forwardRef(({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { htmlFor: inputId, className: "block text-sm font-medium text-foreground mb-2", children: label })), _jsx("input", { type: type, className: cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive focus-visible:ring-destructive', className), ref: ref, id: inputId, ...props }), error && (_jsx("p", { className: "mt-1 text-sm text-destructive", children: error })), helperText && !error && (_jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: helperText }))] }));
});
Input.displayName = 'Input';
