"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { cn } from '../utils/cn';
export const Dropdown = ({ options, value, onChange, placeholder = 'Select an option', className, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedOption = options.find(option => option.value === value);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (_jsxs("div", { ref: dropdownRef, className: cn('relative', className), children: [_jsxs("button", { type: "button", className: cn('flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', disabled && 'cursor-not-allowed opacity-50'), onClick: () => !disabled && setIsOpen(!isOpen), disabled: disabled, children: [_jsx("span", { className: selectedOption ? 'text-foreground' : 'text-muted-foreground', children: selectedOption ? selectedOption.label : placeholder }), _jsx("svg", { className: cn('h-4 w-4 transition-transform', isOpen && 'rotate-180'), fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), isOpen && (_jsx("div", { className: "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-background shadow-lg", children: options.map((option) => (_jsx("button", { type: "button", className: cn('block w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground', option.value === value && 'bg-accent text-accent-foreground', option.disabled && 'opacity-50 cursor-not-allowed'), onClick: () => {
                        if (!option.disabled) {
                            onChange?.(option.value);
                            setIsOpen(false);
                        }
                    }, disabled: option.disabled, children: option.label }, option.value))) }))] }));
};
