import { AnchorHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from '../../node_modules/@types/react';
export type LinkComponentProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export type LinkComponent = ForwardRefExoticComponent<LinkComponentProps & RefAttributes<HTMLAnchorElement>>;
export interface LinkComponentProviderProps {
    children: React.ReactNode;
    Link: LinkComponent;
    navigate: (path: string) => void;
}
export declare const LinkComponentProvider: ({ children, Link, navigate }: LinkComponentProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useLinkComponent: () => {
    Link: LinkComponent;
    navigate: (path: string) => void;
};
