import type { MastraMessageContentV2 } from '@mastra/core/agent';
import type { StorageThreadType, MastraMessageV1, MastraMessageV2 } from '@mastra/core/memory';
import { MemoryStorage } from '@mastra/core/storage';
import type { PaginationInfo, StorageGetMessagesArg, StorageResourceType, ThreadSortOptions } from '@mastra/core/storage';
import type { Service } from 'electrodb';
export declare class MemoryStorageDynamoDB extends MemoryStorage {
    private service;
    constructor({ service }: {
        service: Service<Record<string, any>>;
    });
    private parseMessageData;
    private transformAndSortThreads;
    getThreadById({ threadId }: {
        threadId: string;
    }): Promise<StorageThreadType | null>;
    /**
     * @deprecated use getThreadsByResourceIdPaginated instead for paginated results.
     */
    getThreadsByResourceId(args: {
        resourceId: string;
    } & ThreadSortOptions): Promise<StorageThreadType[]>;
    saveThread({ thread }: {
        thread: StorageThreadType;
    }): Promise<StorageThreadType>;
    updateThread({ id, title, metadata, }: {
        id: string;
        title: string;
        metadata: Record<string, unknown>;
    }): Promise<StorageThreadType>;
    deleteThread({ threadId }: {
        threadId: string;
    }): Promise<void>;
    getMessages(args: StorageGetMessagesArg & {
        format?: 'v1';
    }): Promise<MastraMessageV1[]>;
    getMessages(args: StorageGetMessagesArg & {
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    saveMessages(args: {
        messages: MastraMessageV1[];
        format?: undefined | 'v1';
    }): Promise<MastraMessageV1[]>;
    saveMessages(args: {
        messages: MastraMessageV2[];
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    getThreadsByResourceIdPaginated(args: {
        resourceId: string;
        page?: number;
        perPage?: number;
    } & ThreadSortOptions): Promise<PaginationInfo & {
        threads: StorageThreadType[];
    }>;
    getMessagesPaginated(args: StorageGetMessagesArg & {
        format?: 'v1' | 'v2';
    }): Promise<PaginationInfo & {
        messages: MastraMessageV1[] | MastraMessageV2[];
    }>;
    private _getIncludedMessages;
    updateMessages(args: {
        messages: Partial<Omit<MastraMessageV2, 'createdAt'>> & {
            id: string;
            content?: {
                metadata?: MastraMessageContentV2['metadata'];
                content?: MastraMessageContentV2['content'];
            };
        }[];
    }): Promise<MastraMessageV2[]>;
    getResourceById({ resourceId }: {
        resourceId: string;
    }): Promise<StorageResourceType | null>;
    saveResource({ resource }: {
        resource: StorageResourceType;
    }): Promise<StorageResourceType>;
    updateResource({ resourceId, workingMemory, metadata, }: {
        resourceId: string;
        workingMemory?: string;
        metadata?: Record<string, unknown>;
    }): Promise<StorageResourceType>;
}
//# sourceMappingURL=index.d.ts.map