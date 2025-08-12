import { AgentSettingsType as AgentSettings } from '../../../types';
export interface AgentSettingsStateProps {
    agentId: string;
}
export declare function useAgentSettingsState({ agentId }: AgentSettingsStateProps): {
    settings: AgentSettings | undefined;
    setSettings: (settingsValue: AgentSettings) => void;
    resetAll: () => void;
};
