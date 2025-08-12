import { ReactNode } from '../../../../node_modules/@types/react';
import { AgentSettingsType as AgentSettings } from '../../../types';
type AgentContextType = {
    settings?: AgentSettings;
    setSettings: (settings: AgentSettings) => void;
    resetAll: () => void;
};
export declare const AgentSettingsContext: import('../../../../node_modules/@types/react').Context<AgentContextType>;
export interface AgentSettingsProviderProps {
    children: ReactNode;
    agentId: string;
}
export declare function AgentSettingsProvider({ children, agentId }: AgentSettingsProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useAgentSettings: () => AgentContextType;
export {};
