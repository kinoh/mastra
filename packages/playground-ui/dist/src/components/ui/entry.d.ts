import { ReactNode } from '../../../node_modules/@types/react';
export interface EntryProps {
    label: ReactNode;
    children: ReactNode;
}
export declare const Entry: ({ label, children }: EntryProps) => import("react/jsx-runtime").JSX.Element;
