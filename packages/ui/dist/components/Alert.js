import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../utils/cn';
export const Alert = React.forwardRef(({ className, variant = 'default', title, children, ...props }, ref) => {
    const variants = {
        default: 'bg-background text-foreground border',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive',
        warning: 'border-yellow-500/50 text-yellow-600 dark:text-yellow-400',
        success: 'border-green-500/50 text-green-600 dark:text-green-400'
    };
    return (_jsxs("div", { ref: ref, className: cn('relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground', variants[variant], className), ...props, children: [title && (_jsx("h5", { className: "mb-1 font-medium leading-none tracking-tight", children: title })), _jsx("div", { className: "text-sm [&_p]:leading-relaxed", children: children })] }));
});
Alert.displayName = 'Alert';
