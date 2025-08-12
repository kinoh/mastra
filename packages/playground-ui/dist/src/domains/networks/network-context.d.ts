import { ReactNode } from '../../../node_modules/@types/react';
import { ModelSettings } from '../../types';
type NetworkContextType = {
    modelSettings: ModelSettings;
    setModelSettings: React.Dispatch<React.SetStateAction<ModelSettings>>;
    resetModelSettings: () => void;
    chatWithLoop: boolean;
    setChatWithLoop: React.Dispatch<React.SetStateAction<boolean>>;
    maxIterations: number | undefined;
    setMaxIterations: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export declare const NetworkContext: import('../../../node_modules/@types/react').Context<NetworkContextType>;
export declare function NetworkProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
