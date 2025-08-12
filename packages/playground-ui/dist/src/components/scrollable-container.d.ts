import { default as React } from '../../node_modules/@types/react';
export type ScrollableContainerProps = {
    className?: string;
    children: React.ReactNode;
    scrollSpeed?: number;
    scrollIntervalTime?: number;
};
export declare const ScrollableContainer: ({ className, children, scrollSpeed, scrollIntervalTime, }: ScrollableContainerProps) => import("react/jsx-runtime").JSX.Element;
