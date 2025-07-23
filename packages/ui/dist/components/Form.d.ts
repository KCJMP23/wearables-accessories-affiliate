import React from 'react';
export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'number';
    required?: boolean;
    placeholder?: string;
    options?: {
        value: string;
        label: string;
    }[];
    validation?: (value: any) => string | undefined;
}
export interface FormProps {
    fields: FormField[];
    onSubmit: (data: Record<string, any>) => void;
    initialData?: Record<string, any>;
    submitText?: string;
    className?: string;
}
export declare const Form: React.FC<FormProps>;
//# sourceMappingURL=Form.d.ts.map