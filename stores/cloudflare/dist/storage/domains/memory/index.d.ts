import type { MastraMessageV1, MastraMessageV2, PaginationInfo, StorageGetMessagesArg, StorageResourceType, StorageThreadType } from '@mastra/core';
import type { MastraMessageContentV2 } from '@mastra/core/agent';
import { MemoryStorage } from '@mastra/core/storage';
import type { StoreOperationsCloudflare } from '../operations/index.js';
export declare class MemoryStorageCloudflare extends MemoryStorage {
    operations: StoreOperationsCloudflare;
    constructor({ operations }: {
        operations: StoreOperationsCloudflare;
    });
    private ensureMetadata;
    getThreadById({ threadId }: {
        threadId: string;
    }): Promise<StorageThreadType | null>;
    getThreadsByResourceId({ resourceId }: {
        resourceId: string;
    }): Promise<StorageThreadType[]>;
    getThreadsByResourceIdPaginated(args: {
        resourceId: string;
        page?: number;
        perPage?: number;
    }): Promise<PaginationInfo & {
        threads: StorageThreadType[];
    }>;
    saveThread({ thread }: {
        thread: StorageThreadType;
    }): Promise<StorageThreadType>;
    updateThread({ id, title, metadata, }: {
        id: string;
        title: string;
        metadata: Record<string, unknown>;
    }): Promise<StorageThreadType>;
    private getMessageKey;
    private getThreadMessagesKey;
    deleteThread({ threadId }: {
        threadId: string;
    }): Promise<void>;
    private findMessageInAnyThread;
    /**
     * Queue for serializing sorted order updates.
     * Updates the sorted order for a given key. This operation is eventually consistent.
     */
    private updateQueue;
    private updateSorting;
    /**
     * Updates the sorted order for a given key. This operation is eventually consistent.
     * Note: Operations on the same orderKey are serialized using a queue to prevent
     * concurrent updates from conflicting with each other.
     */
    private updateSortedMessages;
    private getSortedMessages;
    private migrateMessage;
    saveMessages(args: {
        messages: MastraMessageV1[];
        format?: undefined | 'v1';
    }): Promise<MastraMessageV1[]>;
    saveMessages(args: {
        messages: MastraMessageV2[];
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    private getRank;
    private getRange;
    private getLastN;
    private getFullOrder;
    private getIncludedMessagesWithContext;
    private getRecentMessages;
    private fetchAndParseMessagesFromMultipleThreads;
    getMessages(args: StorageGetMessagesArg & {
        format?: 'v1';
    }): Promise<MastraMessageV1[]>;
    getMessages(args: StorageGetMessagesArg & {
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    getMessagesPaginated(args: StorageGetMessagesArg): Promise<PaginationInfo & {
        messages: MastraMessageV1[] | MastraMessageV2[];
    }>;
    updateMessages(args: {
        messages: (Partial<Omit<MastraMessageV2, 'createdAt'>> & {
            id: string;
            threadId?: string;
            content?: {
                metadata?: MastraMessageContentV2['metadata'];
                content?: MastraMessageContentV2['content'];
            };
        })[];
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