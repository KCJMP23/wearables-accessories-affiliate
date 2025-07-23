import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/cn';
export const Textarea = React.forwardRef(({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { htmlFor: textareaId, className: "block text-sm font-medium text-foreground mb-2", children: label })), _jsx("textarea", { className: cn('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive focus-visible:ring-destructive', className), ref: ref, id: textareaId, ...props }), error && (_jsx("p", { className: "mt-1 text-sm text-destructive", children: error })), helperText && !error && (_jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: helperText }))] }));
});
Textarea.displayName = 'Textarea';
