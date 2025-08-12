export interface AgentMetadataSectionProps {
    title: string;
    children: React.ReactNode;
    hint?: {
        link: string;
        title: string;
    };
}
export declare const AgentMetadataSection: ({ title, children, hint }: AgentMetadataSectionProps) => import("react/jsx-runtime").JSX.Element;
