import React from 'react';
export interface TableColumn<T> {
    key: string;
    header: string;
    render?: (value: any, item: T) => React.ReactNode;
    sortable?: boolean;
}
export interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    className?: string;
    onRowClick?: (item: T) => void;
}
export declare function Table<T>({ data, columns, className, onRowClick }: TableProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Table.d.ts.map