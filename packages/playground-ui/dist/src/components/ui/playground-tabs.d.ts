export interface PlaygroundTabsProps<T extends string> {
    children: React.ReactNode;
    defaultTab: T;
    value?: T;
    onValueChange?: (value: T) => void;
    className?: string;
}
export declare const PlaygroundTabs: <T extends string>({ children, defaultTab, value, onValueChange, className, }: PlaygroundTabsProps<T>) => import("react/jsx-runtime").JSX.Element;
export interface TabListProps {
    children: React.ReactNode;
    className?: string;
}
export declare const TabList: ({ children, className }: TabListProps) => import("react/jsx-runtime").JSX.Element;
export interface TabProps {
    children: React.ReactNode;
    value: string;
    onClick?: () => void;
}
export declare const Tab: ({ children, value, onClick }: TabProps) => import("react/jsx-runtime").JSX.Element;
export interface TabContentProps {
    children: React.ReactNode;
    value: string;
}
export declare const TabContent: ({ children, value }: TabContentProps) => import("react/jsx-runtime").JSX.Element;
