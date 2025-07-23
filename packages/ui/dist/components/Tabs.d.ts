import React from 'react';
export interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
}
export interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
}
export declare const Tabs: React.FC<TabsProps>;
//# sourceMappingURL=Tabs.d.ts.map