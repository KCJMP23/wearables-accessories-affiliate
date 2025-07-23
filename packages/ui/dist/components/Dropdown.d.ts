import React from 'react';
export interface DropdownOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface DropdownProps {
    options: DropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}
export declare const Dropdown: React.FC<DropdownProps>;
//# sourceMappingURL=Dropdown.d.ts.map