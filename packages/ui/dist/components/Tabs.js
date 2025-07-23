import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../utils/cn';
export const Tabs = ({ tabs, activeTab, onTabChange, className }) => {
    return (_jsxs("div", { className: cn('w-full', className), children: [_jsx("div", { className: "border-b", children: _jsx("div", { className: "flex space-x-8", children: tabs.map((tab) => (_jsx("button", { onClick: () => !tab.disabled && onTabChange(tab.id), disabled: tab.disabled, className: cn('border-b-2 py-2 px-1 text-sm font-medium transition-colors', activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground', tab.disabled && 'opacity-50 cursor-not-allowed'), children: tab.label }, tab.id))) }) }), _jsx("div", { className: "mt-4", children: tabs.find(tab => tab.id === activeTab)?.content })] }));
};
