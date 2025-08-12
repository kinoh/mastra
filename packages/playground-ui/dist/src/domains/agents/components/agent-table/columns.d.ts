import { ColumnDef } from '@tanstack/react-table';
import { AgentTableData } from './types';
export type AgentTableColumn = {
    repoUrl: string;
    executedAt: Date | null;
    modelId: string;
    link: string;
} & AgentTableData;
export declare const columns: ColumnDef<AgentTableColumn>[];
