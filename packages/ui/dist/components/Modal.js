import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../utils/cn';
export const Modal = ({ isOpen, onClose, title, children, className }) => {
    if (!isOpen)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "fixed inset-0 bg-black/50", onClick: onClose }), _jsxs("div", { className: cn('relative bg-background rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto', className), children: [title && (_jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: title }), _jsx("button", { onClick: onClose, className: "text-muted-foreground hover:text-foreground", children: "\u2715" })] })), _jsx("div", { className: "p-6", children: children })] })] }));
};
