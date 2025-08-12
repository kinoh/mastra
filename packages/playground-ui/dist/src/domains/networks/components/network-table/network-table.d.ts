import { GetNetworkResponse, GetVNextNetworkResponse } from '@mastra/client-js';
export interface NetworkTableProps {
    legacyNetworks: GetNetworkResponse[];
    networks: GetVNextNetworkResponse[];
    isLoading: boolean;
    computeLink: (networkId: string, isVNext: boolean) => string;
}
export declare const NetworkTable: ({ legacyNetworks, networks, isLoading, computeLink }: NetworkTableProps) => import("react/jsx-runtime").JSX.Element;
export declare const NetworkTableEmpty: () => import("react/jsx-runtime").JSX.Element;
export declare const NetworkTableSkeleton: () => import("react/jsx-runtime").JSX.Element;
