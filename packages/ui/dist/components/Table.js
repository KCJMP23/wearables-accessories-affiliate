import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../utils/cn';
export function Table({ data, columns, className, onRowClick }) {
    return (_jsx("div", { className: cn('w-full overflow-auto', className), children: _jsxs("table", { className: "w-full caption-bottom text-sm", children: [_jsx("thead", { className: "border-b", children: _jsx("tr", { children: columns.map((column) => (_jsx("th", { className: "h-12 px-4 text-left align-middle font-medium text-muted-foreground", children: column.header }, column.key))) }) }), _jsx("tbody", { children: data.map((item, index) => (_jsx("tr", { className: cn('border-b transition-colors hover:bg-muted/50', onRowClick && 'cursor-pointer'), onClick: () => onRowClick?.(item), children: columns.map((column) => (_jsx("td", { className: "p-4 align-middle", children: column.render
                                ? column.render(item[column.key], item)
                                : item[column.key] }, column.key))) }, index))) })] }) }));
}
