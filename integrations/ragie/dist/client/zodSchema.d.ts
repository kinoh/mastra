import { z } from 'zod';
export declare const modeSchema: z.ZodUnion<[z.ZodLiteral<"hi_res">, z.ZodLiteral<"fast">]>;
export declare const connectionSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    type: z.ZodString;
    name: z.ZodString;
    enabled: z.ZodBoolean;
    last_synced_at: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    syncing: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    name: string;
    enabled: boolean;
    type: string;
    id: string;
    created_at: string;
    updated_at: string;
    last_synced_at?: string | null | undefined;
    syncing?: boolean | null | undefined;
}, {
    metadata: Record<string, unknown>;
    name: string;
    enabled: boolean;
    type: string;
    id: string;
    created_at: string;
    updated_at: string;
    last_synced_at?: string | null | undefined;
    syncing?: boolean | null | undefined;
}>;
export declare const connectionBaseSchema: z.ZodObject<{
    partition_strategy: z.ZodUnion<[z.ZodLiteral<"hi_res">, z.ZodLiteral<"fast">]>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
}, "strip", z.ZodTypeAny, {
    partition_strategy: "hi_res" | "fast";
    metadata?: Record<string, string | number | boolean | string[]> | undefined;
}, {
    partition_strategy: "hi_res" | "fast";
    metadata?: Record<string, string | number | boolean | string[]> | undefined;
}>;
export declare const partitionStrategySchema: z.ZodUnion<[z.ZodLiteral<"hi_res">, z.ZodLiteral<"fast">]>;
export declare const paginationSchema: z.ZodObject<{
    next_cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    next_cursor?: string | null | undefined;
}, {
    next_cursor?: string | null | undefined;
}>;
export declare const connectionStatsSchema: z.ZodObject<{
    document_count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    document_count: number;
}, {
    document_count: number;
}>;
export declare const connectionSyncFinishedWebhookPayloadSchema: z.ZodObject<{
    connection_id: z.ZodString;
    sync_id: z.ZodString;
    partition: z.ZodString;
    connection_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    partition: string;
    connection_id: string;
    sync_id: string;
    connection_metadata: Record<string, unknown>;
}, {
    partition: string;
    connection_id: string;
    sync_id: string;
    connection_metadata: Record<string, unknown>;
}>;
export declare const typeSchema: z.ZodLiteral<"connection_sync_finished">;
export declare const connectionSyncProgressWebhookPayloadSchema: z.ZodObject<{
    connection_id: z.ZodString;
    sync_id: z.ZodString;
    partition: z.ZodString;
    connection_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    create_count: z.ZodNumber;
    created_count: z.ZodNumber;
    update_content_count: z.ZodNumber;
    updated_content_count: z.ZodNumber;
    update_metadata_count: z.ZodNumber;
    updated_metadata_count: z.ZodNumber;
    delete_count: z.ZodNumber;
    deleted_count: z.ZodNumber;
    errored_count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    partition: string;
    connection_id: string;
    sync_id: string;
    connection_metadata: Record<string, unknown>;
    create_count: number;
    created_count: number;
    update_content_count: number;
    updated_content_count: number;
    update_metadata_count: number;
    updated_metadata_count: number;
    delete_count: number;
    deleted_count: number;
    errored_count: number;
}, {
    partition: string;
    connection_id: string;
    sync_id: string;
    connection_metadata: Record<string, unknown>;
    create_count: number;
    created_count: number;
    update_content_count: number;
    updated_content_count: number;
    update_metadata_count: number;
    updated_metadata_count: number;
    delete_count: number;
    deleted_count: number;
    errored_count: number;
}>;
export declare const type2Schema: z.ZodLiteral<"connection_sync_progress">;
export declare const connectionSyncStartedWebhookPayloadSchema: z.ZodObject<{
    connection_id: z.ZodString;
    sync_id: z.ZodString;
    partition: z.ZodString;
    connection_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    create_count: z.ZodNumber;
    update_content_count: z.ZodNumber;
    update_metadata_count: z.ZodNumber;
    delete_count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    partition: string;
    connection_id: string;
    sync_id: string;
    connection_metadata: Record<string, unknown>;
    create_count: number;
    update_content_count: number;
    update_metadata_count: number;
    delete_count: number;
}, {
    partition: string;
    connection_id: string;
    sync_id: string;
    connection_metadata: Record<string, unknown>;
    create_count: number;
    update_content_count: number;
    update_metadata_count: number;
    delete_count: number;
}>;
export declare const type3Schema: z.ZodLiteral<"connection_sync_started">;
export declare const createDocumentFromUrlParamsSchema: z.ZodObject<{
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
    mode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"hi_res">, z.ZodLiteral<"fast">]>>;
    name: z.ZodOptional<z.ZodString>;
    external_id: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    partition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url: string;
    mode?: "hi_res" | "fast" | undefined;
    metadata?: Record<string, string | number | boolean | string[]> | undefined;
    external_id?: string | undefined;
    partition?: string | undefined;
    name?: string | undefined;
}, {
    url: string;
    mode?: "hi_res" | "fast" | undefined;
    metadata?: Record<string, string | number | boolean | string[]> | undefined;
    external_id?: string | undefined;
    partition?: string | undefined;
    name?: string | undefined;
}>;
export declare const createDocumentRawParamsSchema: z.ZodObject<{
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
    name: z.ZodOptional<z.ZodString>;
    data: z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnknown>]>;
    partition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: string | Record<string, unknown>;
    metadata?: Record<string, string | number | boolean | string[]> | undefined;
    partition?: string | undefined;
    name?: string | undefined;
}, {
    data: string | Record<string, unknown>;
    metadata?: Record<string, string | number | boolean | string[]> | undefined;
    partition?: string | undefined;
    name?: string | undefined;
}>;
export declare const entitySchemaTypeSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const scopeSchema: z.ZodUnion<[z.ZodLiteral<"document">, z.ZodLiteral<"chunk">]>;
export declare const deleteConnectionPayloadSchema: z.ZodObject<{
    keep_files: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    keep_files: boolean;
}, {
    keep_files: boolean;
}>;
export declare const documentSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    status: z.ZodString;
    name: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    partition: z.ZodString;
    chunk_count: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    external_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}>;
export declare const documentDeleteSchema: z.ZodObject<{
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
}, {
    status: string;
}>;
export declare const documentDeleteWebhookPayloadSchema: z.ZodObject<{
    document_id: z.ZodString;
    partition: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    external_id: z.ZodNullable<z.ZodString>;
    sync_id: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    external_id: string | null;
    partition: string;
    sync_id: string | null;
    document_id: string;
}, {
    metadata: Record<string, unknown>;
    external_id: string | null;
    partition: string;
    sync_id: string | null;
    document_id: string;
}>;
export declare const type4Schema: z.ZodLiteral<"document_deleted">;
export declare const documentFileUpdateSchema: z.ZodObject<{
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
}, {
    status: string;
}>;
export declare const documentGetSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    status: z.ZodString;
    name: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    partition: z.ZodString;
    chunk_count: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    external_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    errors: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    errors: string[];
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    errors: string[];
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}>;
export declare const documentListSchema: z.ZodObject<{
    pagination: z.ZodObject<{
        next_cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        next_cursor?: string | null | undefined;
    }, {
        next_cursor?: string | null | undefined;
    }>;
    documents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        status: z.ZodString;
        name: z.ZodString;
        metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
        partition: z.ZodString;
        chunk_count: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        external_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, string | number | boolean | string[]>;
        partition: string;
        name: string;
        status: string;
        id: string;
        created_at: string;
        updated_at: string;
        external_id?: string | null | undefined;
        chunk_count?: number | null | undefined;
    }, {
        metadata: Record<string, string | number | boolean | string[]>;
        partition: string;
        name: string;
        status: string;
        id: string;
        created_at: string;
        updated_at: string;
        external_id?: string | null | undefined;
        chunk_count?: number | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    documents: {
        metadata: Record<string, string | number | boolean | string[]>;
        partition: string;
        name: string;
        status: string;
        id: string;
        created_at: string;
        updated_at: string;
        external_id?: string | null | undefined;
        chunk_count?: number | null | undefined;
    }[];
}, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    documents: {
        metadata: Record<string, string | number | boolean | string[]>;
        partition: string;
        name: string;
        status: string;
        id: string;
        created_at: string;
        updated_at: string;
        external_id?: string | null | undefined;
        chunk_count?: number | null | undefined;
    }[];
}>;
export declare const documentMetadataSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const documentMetadataUpdateSchema: z.ZodObject<{
    metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[]>;
}, {
    metadata: Record<string, string | number | boolean | string[]>;
}>;
export declare const documentRawUpdateSchema: z.ZodObject<{
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
}, {
    status: string;
}>;
export declare const documentSummarySchema: z.ZodObject<{
    document_id: z.ZodString;
    summary: z.ZodString;
}, "strip", z.ZodTypeAny, {
    document_id: string;
    summary: string;
}, {
    document_id: string;
    summary: string;
}>;
export declare const documentUpdateWebhookPayloadSchema: z.ZodObject<{
    document_id: z.ZodString;
    status: z.ZodUnion<[z.ZodLiteral<"ready">, z.ZodLiteral<"failed">]>;
    partition: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    external_id: z.ZodNullable<z.ZodString>;
    sync_id: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    external_id: string | null;
    partition: string;
    status: "ready" | "failed";
    sync_id: string | null;
    document_id: string;
}, {
    metadata: Record<string, unknown>;
    external_id: string | null;
    partition: string;
    status: "ready" | "failed";
    sync_id: string | null;
    document_id: string;
}>;
export declare const type5Schema: z.ZodLiteral<"document_status_updated">;
export declare const entityDataSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const entityExtractedWebhookPayloadSchema: z.ZodObject<{
    entity_id: z.ZodString;
    document_id: z.ZodString;
    instruction_id: z.ZodString;
    document_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    document_external_id: z.ZodNullable<z.ZodString>;
    partition: z.ZodString;
    sync_id: z.ZodNullable<z.ZodString>;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    partition: string;
    data: Record<string, unknown>;
    sync_id: string | null;
    document_id: string;
    entity_id: string;
    instruction_id: string;
    document_metadata: Record<string, unknown>;
    document_external_id: string | null;
}, {
    partition: string;
    data: Record<string, unknown>;
    sync_id: string | null;
    document_id: string;
    entity_id: string;
    instruction_id: string;
    document_metadata: Record<string, unknown>;
    document_external_id: string | null;
}>;
export declare const type6Schema: z.ZodLiteral<"entity_extracted">;
export declare const entitySchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    instruction_id: z.ZodString;
    document_id: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    document_id: string;
    instruction_id: string;
}, {
    data: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    document_id: string;
    instruction_id: string;
}>;
export declare const errorMessageSchema: z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>;
export declare const validationErrorSchema: z.ZodObject<{
    loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
    msg: z.ZodString;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    loc: (string | number)[];
    msg: string;
}, {
    type: string;
    loc: (string | number)[];
    msg: string;
}>;
export declare const instructionSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    name: z.ZodString;
    active: z.ZodOptional<z.ZodBoolean>;
    scope: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"document">, z.ZodLiteral<"chunk">]>>;
    prompt: z.ZodString;
    entity_schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    partition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}>;
export declare const metadataFilterSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const patchDocumentMetadataParamsSchema: z.ZodObject<{
    metadata: z.ZodRecord<z.ZodString, z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[] | null>;
}, {
    metadata: Record<string, string | number | boolean | string[] | null>;
}>;
export declare const scoredChunkSchema: z.ZodObject<{
    text: z.ZodString;
    score: z.ZodNumber;
    document_id: z.ZodString;
    document_name: z.ZodString;
    document_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    document_id: string;
    document_metadata: Record<string, unknown>;
    text: string;
    score: number;
    document_name: string;
}, {
    document_id: string;
    document_metadata: Record<string, unknown>;
    text: string;
    score: number;
    document_name: string;
}>;
export declare const retrieveParamsSchema: z.ZodObject<{
    query: z.ZodString;
    top_k: z.ZodOptional<z.ZodNumber>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    rerank: z.ZodOptional<z.ZodBoolean>;
    max_chunks_per_document: z.ZodOptional<z.ZodNumber>;
    partition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    query: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    top_k?: number | undefined;
    rerank?: boolean | undefined;
    max_chunks_per_document?: number | undefined;
}, {
    query: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    top_k?: number | undefined;
    rerank?: boolean | undefined;
    max_chunks_per_document?: number | undefined;
}>;
export declare const setConnectionEnabledPayloadSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export declare const updateDocumentRawParamsSchema: z.ZodObject<{
    data: z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnknown>]>;
}, "strip", z.ZodTypeAny, {
    data: string | Record<string, unknown>;
}, {
    data: string | Record<string, unknown>;
}>;
export declare const updateInstructionParamsSchema: z.ZodObject<{
    active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    active: boolean;
}, {
    active: boolean;
}>;
export declare const createDocumentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    status: z.ZodString;
    name: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    partition: z.ZodString;
    chunk_count: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    external_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}>;
export declare const hTTPValidationErrorSchema: z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>;
export declare const listDocumentsDataSchema: z.ZodObject<{
    headers: z.ZodOptional<z.ZodObject<{
        partition: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        partition?: string | null | undefined;
    }, {
        partition?: string | null | undefined;
    }>>;
    query: z.ZodOptional<z.ZodObject<{
        cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        filter: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        page_size: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        filter?: string | null | undefined;
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    }, {
        filter?: string | null | undefined;
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    headers?: {
        partition?: string | null | undefined;
    } | undefined;
    query?: {
        filter?: string | null | undefined;
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    } | undefined;
}, {
    headers?: {
        partition?: string | null | undefined;
    } | undefined;
    query?: {
        filter?: string | null | undefined;
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    } | undefined;
}>;
export declare const listDocumentsResponseSchema: z.ZodObject<{
    pagination: z.ZodObject<{
        next_cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        next_cursor?: string | null | undefined;
    }, {
        next_cursor?: string | null | undefined;
    }>;
    documents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        status: z.ZodString;
        name: z.ZodString;
        metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
        partition: z.ZodString;
        chunk_count: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        external_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, string | number | boolean | string[]>;
        partition: string;
        name: string;
        status: string;
        id: string;
        created_at: string;
        updated_at: string;
        external_id?: string | null | undefined;
        chunk_count?: number | null | undefined;
    }, {
        metadata: Record<string, string | number | boolean | string[]>;
        partition: string;
        name: string;
        status: string;
        id: string;
        created_at: string;
        updated_at: string;
        external_id?: string | null | undefined;
        chunk_count?: number | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    documents: {
        metadata: Record<string, string | number | boolean | string[]>;
        partition: string;
        name: string;
        status: string;
        id: string;
        created_at: string;
        updated_at: string;
        external_id?: string | null | undefined;
        chunk_count?: number | null | undefined;
    }[];
}, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    documents: {
        metadata: Record<string, string | number | boolean | string[]>;
        partition: string;
        name: string;
        status: string;
        id: string;
        created_at: string;
        updated_at: string;
        external_id?: string | null | undefined;
        chunk_count?: number | null | undefined;
    }[];
}>;
export declare const listDocumentsErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const createDocumentRawDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
        name: z.ZodOptional<z.ZodString>;
        data: z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnknown>]>;
        partition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        data: string | Record<string, unknown>;
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
        partition?: string | undefined;
        name?: string | undefined;
    }, {
        data: string | Record<string, unknown>;
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
        partition?: string | undefined;
        name?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        data: string | Record<string, unknown>;
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
        partition?: string | undefined;
        name?: string | undefined;
    };
}, {
    body: {
        data: string | Record<string, unknown>;
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
        partition?: string | undefined;
        name?: string | undefined;
    };
}>;
export declare const createDocumentRawResponseSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    status: z.ZodString;
    name: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    partition: z.ZodString;
    chunk_count: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    external_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}>;
export declare const createDocumentRawErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const createDocumentFromUrlDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
        mode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"hi_res">, z.ZodLiteral<"fast">]>>;
        name: z.ZodOptional<z.ZodString>;
        external_id: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
        partition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        mode?: "hi_res" | "fast" | undefined;
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
        external_id?: string | undefined;
        partition?: string | undefined;
        name?: string | undefined;
    }, {
        url: string;
        mode?: "hi_res" | "fast" | undefined;
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
        external_id?: string | undefined;
        partition?: string | undefined;
        name?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        url: string;
        mode?: "hi_res" | "fast" | undefined;
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
        external_id?: string | undefined;
        partition?: string | undefined;
        name?: string | undefined;
    };
}, {
    body: {
        url: string;
        mode?: "hi_res" | "fast" | undefined;
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
        external_id?: string | undefined;
        partition?: string | undefined;
        name?: string | undefined;
    };
}>;
export declare const createDocumentFromUrlResponseSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    status: z.ZodString;
    name: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    partition: z.ZodString;
    chunk_count: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    external_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}>;
export declare const createDocumentFromUrlErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const getDocumentDataSchema: z.ZodObject<{
    path: z.ZodObject<{
        document_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        document_id: string;
    }, {
        document_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: {
        document_id: string;
    };
}, {
    path: {
        document_id: string;
    };
}>;
export declare const getDocumentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    status: z.ZodString;
    name: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    partition: z.ZodString;
    chunk_count: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    external_id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    errors: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    errors: string[];
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}, {
    metadata: Record<string, string | number | boolean | string[]>;
    partition: string;
    name: string;
    status: string;
    id: string;
    created_at: string;
    updated_at: string;
    errors: string[];
    external_id?: string | null | undefined;
    chunk_count?: number | null | undefined;
}>;
export declare const getDocumentErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const deleteDocumentDataSchema: z.ZodObject<{
    path: z.ZodObject<{
        document_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        document_id: string;
    }, {
        document_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: {
        document_id: string;
    };
}, {
    path: {
        document_id: string;
    };
}>;
export declare const deleteDocumentResponseSchema: z.ZodObject<{
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
}, {
    status: string;
}>;
export declare const deleteDocumentErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const updateDocumentFileResponseSchema: z.ZodObject<{
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
}, {
    status: string;
}>;
export declare const updateDocumentFileErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const updateDocumentRawDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        data: z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnknown>]>;
    }, "strip", z.ZodTypeAny, {
        data: string | Record<string, unknown>;
    }, {
        data: string | Record<string, unknown>;
    }>;
    path: z.ZodObject<{
        document_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        document_id: string;
    }, {
        document_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        data: string | Record<string, unknown>;
    };
    path: {
        document_id: string;
    };
}, {
    body: {
        data: string | Record<string, unknown>;
    };
    path: {
        document_id: string;
    };
}>;
export declare const updateDocumentRawResponseSchema: z.ZodObject<{
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
}, {
    status: string;
}>;
export declare const updateDocumentRawErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const patchDocumentMetadataDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        metadata: z.ZodRecord<z.ZodString, z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, string | number | boolean | string[] | null>;
    }, {
        metadata: Record<string, string | number | boolean | string[] | null>;
    }>;
    path: z.ZodObject<{
        document_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        document_id: string;
    }, {
        document_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        metadata: Record<string, string | number | boolean | string[] | null>;
    };
    path: {
        document_id: string;
    };
}, {
    body: {
        metadata: Record<string, string | number | boolean | string[] | null>;
    };
    path: {
        document_id: string;
    };
}>;
export declare const patchDocumentMetadataResponseSchema: z.ZodObject<{
    metadata: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, string | number | boolean | string[]>;
}, {
    metadata: Record<string, string | number | boolean | string[]>;
}>;
export declare const patchDocumentMetadataErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const retrieveDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        query: z.ZodString;
        top_k: z.ZodOptional<z.ZodNumber>;
        filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        rerank: z.ZodOptional<z.ZodBoolean>;
        max_chunks_per_document: z.ZodOptional<z.ZodNumber>;
        partition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        filter?: Record<string, unknown> | undefined;
        partition?: string | undefined;
        top_k?: number | undefined;
        rerank?: boolean | undefined;
        max_chunks_per_document?: number | undefined;
    }, {
        query: string;
        filter?: Record<string, unknown> | undefined;
        partition?: string | undefined;
        top_k?: number | undefined;
        rerank?: boolean | undefined;
        max_chunks_per_document?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        query: string;
        filter?: Record<string, unknown> | undefined;
        partition?: string | undefined;
        top_k?: number | undefined;
        rerank?: boolean | undefined;
        max_chunks_per_document?: number | undefined;
    };
}, {
    body: {
        query: string;
        filter?: Record<string, unknown> | undefined;
        partition?: string | undefined;
        top_k?: number | undefined;
        rerank?: boolean | undefined;
        max_chunks_per_document?: number | undefined;
    };
}>;
export declare const retrievalSchema: z.ZodObject<{
    scored_chunks: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        score: z.ZodNumber;
        document_id: z.ZodString;
        document_name: z.ZodString;
        document_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        document_id: string;
        document_metadata: Record<string, unknown>;
        text: string;
        score: number;
        document_name: string;
    }, {
        document_id: string;
        document_metadata: Record<string, unknown>;
        text: string;
        score: number;
        document_name: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    scored_chunks: {
        document_id: string;
        document_metadata: Record<string, unknown>;
        text: string;
        score: number;
        document_name: string;
    }[];
}, {
    scored_chunks: {
        document_id: string;
        document_metadata: Record<string, unknown>;
        text: string;
        score: number;
        document_name: string;
    }[];
}>;
export declare const retrieveErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const getDocumentSummaryDataSchema: z.ZodObject<{
    path: z.ZodObject<{
        document_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        document_id: string;
    }, {
        document_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: {
        document_id: string;
    };
}, {
    path: {
        document_id: string;
    };
}>;
export declare const getDocumentSummaryResponseSchema: z.ZodObject<{
    document_id: z.ZodString;
    summary: z.ZodString;
}, "strip", z.ZodTypeAny, {
    document_id: string;
    summary: string;
}, {
    document_id: string;
    summary: string;
}>;
export declare const getDocumentSummaryErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const listInstructionsResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    name: z.ZodString;
    active: z.ZodOptional<z.ZodBoolean>;
    scope: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"document">, z.ZodLiteral<"chunk">]>>;
    prompt: z.ZodString;
    entity_schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    partition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}>, "many">;
export declare const listInstructionsErrorSchema: z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>;
export declare const createInstructionParamsSchema: z.ZodObject<{
    name: z.ZodString;
    active: z.ZodOptional<z.ZodBoolean>;
    scope: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"document">, z.ZodLiteral<"chunk">]>>;
    prompt: z.ZodString;
    entity_schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    partition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}>;
export declare const createInstructionResponseSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    name: z.ZodString;
    active: z.ZodOptional<z.ZodBoolean>;
    scope: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"document">, z.ZodLiteral<"chunk">]>>;
    prompt: z.ZodString;
    entity_schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    partition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}>;
export declare const createInstructionErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const updateInstructionDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        active: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        active: boolean;
    }, {
        active: boolean;
    }>;
    path: z.ZodObject<{
        instruction_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        instruction_id: string;
    }, {
        instruction_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        active: boolean;
    };
    path: {
        instruction_id: string;
    };
}, {
    body: {
        active: boolean;
    };
    path: {
        instruction_id: string;
    };
}>;
export declare const updateInstructionResponseSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    name: z.ZodString;
    active: z.ZodOptional<z.ZodBoolean>;
    scope: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"document">, z.ZodLiteral<"chunk">]>>;
    prompt: z.ZodString;
    entity_schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    partition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}, {
    name: string;
    prompt: string;
    entity_schema: Record<string, unknown>;
    id: string;
    created_at: string;
    updated_at: string;
    filter?: Record<string, unknown> | undefined;
    partition?: string | undefined;
    active?: boolean | undefined;
    scope?: "document" | "chunk" | undefined;
}>;
export declare const updateInstructionErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const listEntitiesByInstructionDataSchema: z.ZodObject<{
    path: z.ZodObject<{
        instruction_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        instruction_id: string;
    }, {
        instruction_id: string;
    }>;
    query: z.ZodOptional<z.ZodObject<{
        cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        page_size: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    }, {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    path: {
        instruction_id: string;
    };
    query?: {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    } | undefined;
}, {
    path: {
        instruction_id: string;
    };
    query?: {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    } | undefined;
}>;
export declare const entityListSchema: z.ZodObject<{
    pagination: z.ZodObject<{
        next_cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        next_cursor?: string | null | undefined;
    }, {
        next_cursor?: string | null | undefined;
    }>;
    entities: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        instruction_id: z.ZodString;
        document_id: z.ZodString;
        data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }, {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    entities: {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }[];
}, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    entities: {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }[];
}>;
export declare const listEntitiesByInstructionErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const listEntitiesByDocumentDataSchema: z.ZodObject<{
    path: z.ZodObject<{
        document_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        document_id: string;
    }, {
        document_id: string;
    }>;
    query: z.ZodOptional<z.ZodObject<{
        cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        page_size: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    }, {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    path: {
        document_id: string;
    };
    query?: {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    } | undefined;
}, {
    path: {
        document_id: string;
    };
    query?: {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    } | undefined;
}>;
export declare const listEntitiesByDocumentResponseSchema: z.ZodObject<{
    pagination: z.ZodObject<{
        next_cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        next_cursor?: string | null | undefined;
    }, {
        next_cursor?: string | null | undefined;
    }>;
    entities: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        instruction_id: z.ZodString;
        document_id: z.ZodString;
        data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }, {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    entities: {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }[];
}, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    entities: {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }[];
}>;
export declare const listEntitiesByDocumentErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const listConnectionsConnectionsGetDataSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodObject<{
        cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        page_size: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    }, {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    query?: {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    } | undefined;
}, {
    query?: {
        cursor?: string | null | undefined;
        page_size?: number | undefined;
    } | undefined;
}>;
export declare const connectionListSchema: z.ZodObject<{
    pagination: z.ZodObject<{
        next_cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        next_cursor?: string | null | undefined;
    }, {
        next_cursor?: string | null | undefined;
    }>;
    connections: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        type: z.ZodString;
        name: z.ZodString;
        enabled: z.ZodBoolean;
        last_synced_at: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        syncing: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        name: string;
        enabled: boolean;
        type: string;
        id: string;
        created_at: string;
        updated_at: string;
        last_synced_at?: string | null | undefined;
        syncing?: boolean | null | undefined;
    }, {
        metadata: Record<string, unknown>;
        name: string;
        enabled: boolean;
        type: string;
        id: string;
        created_at: string;
        updated_at: string;
        last_synced_at?: string | null | undefined;
        syncing?: boolean | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    connections: {
        metadata: Record<string, unknown>;
        name: string;
        enabled: boolean;
        type: string;
        id: string;
        created_at: string;
        updated_at: string;
        last_synced_at?: string | null | undefined;
        syncing?: boolean | null | undefined;
    }[];
}, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    connections: {
        metadata: Record<string, unknown>;
        name: string;
        enabled: boolean;
        type: string;
        id: string;
        created_at: string;
        updated_at: string;
        last_synced_at?: string | null | undefined;
        syncing?: boolean | null | undefined;
    }[];
}>;
export declare const listConnectionsConnectionsGetErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const setConnectionEnabledConnectionsConnectionIdEnabledPutDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        enabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
    }, {
        enabled: boolean;
    }>;
    path: z.ZodObject<{
        connection_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        connection_id: string;
    }, {
        connection_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        enabled: boolean;
    };
    path: {
        connection_id: string;
    };
}, {
    body: {
        enabled: boolean;
    };
    path: {
        connection_id: string;
    };
}>;
export declare const setConnectionEnabledConnectionsConnectionIdEnabledPutResponseSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    type: z.ZodString;
    name: z.ZodString;
    enabled: z.ZodBoolean;
    last_synced_at: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    syncing: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    name: string;
    enabled: boolean;
    type: string;
    id: string;
    created_at: string;
    updated_at: string;
    last_synced_at?: string | null | undefined;
    syncing?: boolean | null | undefined;
}, {
    metadata: Record<string, unknown>;
    name: string;
    enabled: boolean;
    type: string;
    id: string;
    created_at: string;
    updated_at: string;
    last_synced_at?: string | null | undefined;
    syncing?: boolean | null | undefined;
}>;
export declare const setConnectionEnabledConnectionsConnectionIdEnabledPutErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const updateConnectionConnectionsConnectionIdPutDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        partition_strategy: z.ZodUnion<[z.ZodLiteral<"hi_res">, z.ZodLiteral<"fast">]>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
    }, "strip", z.ZodTypeAny, {
        partition_strategy: "hi_res" | "fast";
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
    }, {
        partition_strategy: "hi_res" | "fast";
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
    }>;
    path: z.ZodObject<{
        connection_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        connection_id: string;
    }, {
        connection_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        partition_strategy: "hi_res" | "fast";
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
    };
    path: {
        connection_id: string;
    };
}, {
    body: {
        partition_strategy: "hi_res" | "fast";
        metadata?: Record<string, string | number | boolean | string[]> | undefined;
    };
    path: {
        connection_id: string;
    };
}>;
export declare const updateConnectionConnectionsConnectionIdPutResponseSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    type: z.ZodString;
    name: z.ZodString;
    enabled: z.ZodBoolean;
    last_synced_at: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    syncing: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    metadata: Record<string, unknown>;
    name: string;
    enabled: boolean;
    type: string;
    id: string;
    created_at: string;
    updated_at: string;
    last_synced_at?: string | null | undefined;
    syncing?: boolean | null | undefined;
}, {
    metadata: Record<string, unknown>;
    name: string;
    enabled: boolean;
    type: string;
    id: string;
    created_at: string;
    updated_at: string;
    last_synced_at?: string | null | undefined;
    syncing?: boolean | null | undefined;
}>;
export declare const updateConnectionConnectionsConnectionIdPutErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const getConnectionStatsConnectionsConnectionIdStatsGetDataSchema: z.ZodObject<{
    path: z.ZodObject<{
        connection_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        connection_id: string;
    }, {
        connection_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: {
        connection_id: string;
    };
}, {
    path: {
        connection_id: string;
    };
}>;
export declare const getConnectionStatsConnectionsConnectionIdStatsGetResponseSchema: z.ZodObject<{
    document_count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    document_count: number;
}, {
    document_count: number;
}>;
export declare const getConnectionStatsConnectionsConnectionIdStatsGetErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const deleteConnectionConnectionsConnectionIdDeletePostDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        keep_files: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        keep_files: boolean;
    }, {
        keep_files: boolean;
    }>;
    path: z.ZodObject<{
        connection_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        connection_id: string;
    }, {
        connection_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        keep_files: boolean;
    };
    path: {
        connection_id: string;
    };
}, {
    body: {
        keep_files: boolean;
    };
    path: {
        connection_id: string;
    };
}>;
export declare const deleteConnectionConnectionsConnectionIdDeletePostResponseSchema: z.ZodRecord<z.ZodString, z.ZodString>;
export declare const deleteConnectionConnectionsConnectionIdDeletePostErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const connectionSyncFinishedWebhookSchema: z.ZodObject<{
    nonce: z.ZodString;
    type: z.ZodLiteral<"connection_sync_finished">;
    payload: z.ZodObject<{
        connection_id: z.ZodString;
        sync_id: z.ZodString;
        partition: z.ZodString;
        connection_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
    }, {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "connection_sync_finished";
    nonce: string;
    payload: {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
    };
}, {
    type: "connection_sync_finished";
    nonce: string;
    payload: {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
    };
}>;
export declare const connectionSyncProgressWebhookSchema: z.ZodObject<{
    nonce: z.ZodString;
    type: z.ZodLiteral<"connection_sync_progress">;
    payload: z.ZodObject<{
        connection_id: z.ZodString;
        sync_id: z.ZodString;
        partition: z.ZodString;
        connection_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        create_count: z.ZodNumber;
        created_count: z.ZodNumber;
        update_content_count: z.ZodNumber;
        updated_content_count: z.ZodNumber;
        update_metadata_count: z.ZodNumber;
        updated_metadata_count: z.ZodNumber;
        delete_count: z.ZodNumber;
        deleted_count: z.ZodNumber;
        errored_count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
        create_count: number;
        created_count: number;
        update_content_count: number;
        updated_content_count: number;
        update_metadata_count: number;
        updated_metadata_count: number;
        delete_count: number;
        deleted_count: number;
        errored_count: number;
    }, {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
        create_count: number;
        created_count: number;
        update_content_count: number;
        updated_content_count: number;
        update_metadata_count: number;
        updated_metadata_count: number;
        delete_count: number;
        deleted_count: number;
        errored_count: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "connection_sync_progress";
    nonce: string;
    payload: {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
        create_count: number;
        created_count: number;
        update_content_count: number;
        updated_content_count: number;
        update_metadata_count: number;
        updated_metadata_count: number;
        delete_count: number;
        deleted_count: number;
        errored_count: number;
    };
}, {
    type: "connection_sync_progress";
    nonce: string;
    payload: {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
        create_count: number;
        created_count: number;
        update_content_count: number;
        updated_content_count: number;
        update_metadata_count: number;
        updated_metadata_count: number;
        delete_count: number;
        deleted_count: number;
        errored_count: number;
    };
}>;
export declare const connectionSyncStartedWebhookSchema: z.ZodObject<{
    nonce: z.ZodString;
    type: z.ZodLiteral<"connection_sync_started">;
    payload: z.ZodObject<{
        connection_id: z.ZodString;
        sync_id: z.ZodString;
        partition: z.ZodString;
        connection_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        create_count: z.ZodNumber;
        update_content_count: z.ZodNumber;
        update_metadata_count: z.ZodNumber;
        delete_count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
        create_count: number;
        update_content_count: number;
        update_metadata_count: number;
        delete_count: number;
    }, {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
        create_count: number;
        update_content_count: number;
        update_metadata_count: number;
        delete_count: number;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "connection_sync_started";
    nonce: string;
    payload: {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
        create_count: number;
        update_content_count: number;
        update_metadata_count: number;
        delete_count: number;
    };
}, {
    type: "connection_sync_started";
    nonce: string;
    payload: {
        partition: string;
        connection_id: string;
        sync_id: string;
        connection_metadata: Record<string, unknown>;
        create_count: number;
        update_content_count: number;
        update_metadata_count: number;
        delete_count: number;
    };
}>;
export declare const documentDeleteWebhookSchema: z.ZodObject<{
    nonce: z.ZodString;
    type: z.ZodLiteral<"document_deleted">;
    payload: z.ZodObject<{
        document_id: z.ZodString;
        partition: z.ZodString;
        metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        external_id: z.ZodNullable<z.ZodString>;
        sync_id: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        external_id: string | null;
        partition: string;
        sync_id: string | null;
        document_id: string;
    }, {
        metadata: Record<string, unknown>;
        external_id: string | null;
        partition: string;
        sync_id: string | null;
        document_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "document_deleted";
    nonce: string;
    payload: {
        metadata: Record<string, unknown>;
        external_id: string | null;
        partition: string;
        sync_id: string | null;
        document_id: string;
    };
}, {
    type: "document_deleted";
    nonce: string;
    payload: {
        metadata: Record<string, unknown>;
        external_id: string | null;
        partition: string;
        sync_id: string | null;
        document_id: string;
    };
}>;
export declare const documentUpdateWebhookSchema: z.ZodObject<{
    nonce: z.ZodString;
    type: z.ZodLiteral<"document_status_updated">;
    payload: z.ZodObject<{
        document_id: z.ZodString;
        status: z.ZodUnion<[z.ZodLiteral<"ready">, z.ZodLiteral<"failed">]>;
        partition: z.ZodString;
        metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        external_id: z.ZodNullable<z.ZodString>;
        sync_id: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        external_id: string | null;
        partition: string;
        status: "ready" | "failed";
        sync_id: string | null;
        document_id: string;
    }, {
        metadata: Record<string, unknown>;
        external_id: string | null;
        partition: string;
        status: "ready" | "failed";
        sync_id: string | null;
        document_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "document_status_updated";
    nonce: string;
    payload: {
        metadata: Record<string, unknown>;
        external_id: string | null;
        partition: string;
        status: "ready" | "failed";
        sync_id: string | null;
        document_id: string;
    };
}, {
    type: "document_status_updated";
    nonce: string;
    payload: {
        metadata: Record<string, unknown>;
        external_id: string | null;
        partition: string;
        status: "ready" | "failed";
        sync_id: string | null;
        document_id: string;
    };
}>;
export declare const entityExtractedWebhookSchema: z.ZodObject<{
    nonce: z.ZodString;
    type: z.ZodLiteral<"entity_extracted">;
    payload: z.ZodObject<{
        entity_id: z.ZodString;
        document_id: z.ZodString;
        instruction_id: z.ZodString;
        document_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        document_external_id: z.ZodNullable<z.ZodString>;
        partition: z.ZodString;
        sync_id: z.ZodNullable<z.ZodString>;
        data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        partition: string;
        data: Record<string, unknown>;
        sync_id: string | null;
        document_id: string;
        entity_id: string;
        instruction_id: string;
        document_metadata: Record<string, unknown>;
        document_external_id: string | null;
    }, {
        partition: string;
        data: Record<string, unknown>;
        sync_id: string | null;
        document_id: string;
        entity_id: string;
        instruction_id: string;
        document_metadata: Record<string, unknown>;
        document_external_id: string | null;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "entity_extracted";
    nonce: string;
    payload: {
        partition: string;
        data: Record<string, unknown>;
        sync_id: string | null;
        document_id: string;
        entity_id: string;
        instruction_id: string;
        document_metadata: Record<string, unknown>;
        document_external_id: string | null;
    };
}, {
    type: "entity_extracted";
    nonce: string;
    payload: {
        partition: string;
        data: Record<string, unknown>;
        sync_id: string | null;
        document_id: string;
        entity_id: string;
        instruction_id: string;
        document_metadata: Record<string, unknown>;
        document_external_id: string | null;
    };
}>;
export declare const createDocumentErrorSchema: z.ZodUnion<[z.ZodObject<{
    detail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: string;
}, {
    detail: string;
}>, z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
        msg: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }, {
        type: string;
        loc: (string | number)[];
        msg: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}, {
    detail?: {
        type: string;
        loc: (string | number)[];
        msg: string;
    }[] | undefined;
}>]>;
export declare const retrieveResponseSchema: z.ZodObject<{
    scored_chunks: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        score: z.ZodNumber;
        document_id: z.ZodString;
        document_name: z.ZodString;
        document_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        document_id: string;
        document_metadata: Record<string, unknown>;
        text: string;
        score: number;
        document_name: string;
    }, {
        document_id: string;
        document_metadata: Record<string, unknown>;
        text: string;
        score: number;
        document_name: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    scored_chunks: {
        document_id: string;
        document_metadata: Record<string, unknown>;
        text: string;
        score: number;
        document_name: string;
    }[];
}, {
    scored_chunks: {
        document_id: string;
        document_metadata: Record<string, unknown>;
        text: string;
        score: number;
        document_name: string;
    }[];
}>;
export declare const createInstructionDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        active: z.ZodOptional<z.ZodBoolean>;
        scope: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"document">, z.ZodLiteral<"chunk">]>>;
        prompt: z.ZodString;
        entity_schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        partition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        prompt: string;
        entity_schema: Record<string, unknown>;
        filter?: Record<string, unknown> | undefined;
        partition?: string | undefined;
        active?: boolean | undefined;
        scope?: "document" | "chunk" | undefined;
    }, {
        name: string;
        prompt: string;
        entity_schema: Record<string, unknown>;
        filter?: Record<string, unknown> | undefined;
        partition?: string | undefined;
        active?: boolean | undefined;
        scope?: "document" | "chunk" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        prompt: string;
        entity_schema: Record<string, unknown>;
        filter?: Record<string, unknown> | undefined;
        partition?: string | undefined;
        active?: boolean | undefined;
        scope?: "document" | "chunk" | undefined;
    };
}, {
    body: {
        name: string;
        prompt: string;
        entity_schema: Record<string, unknown>;
        filter?: Record<string, unknown> | undefined;
        partition?: string | undefined;
        active?: boolean | undefined;
        scope?: "document" | "chunk" | undefined;
    };
}>;
export declare const listEntitiesByInstructionResponseSchema: z.ZodObject<{
    pagination: z.ZodObject<{
        next_cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        next_cursor?: string | null | undefined;
    }, {
        next_cursor?: string | null | undefined;
    }>;
    entities: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        instruction_id: z.ZodString;
        document_id: z.ZodString;
        data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }, {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    entities: {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }[];
}, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    entities: {
        data: Record<string, unknown>;
        id: string;
        created_at: string;
        updated_at: string;
        document_id: string;
        instruction_id: string;
    }[];
}>;
export declare const listConnectionsConnectionsGetResponseSchema: z.ZodObject<{
    pagination: z.ZodObject<{
        next_cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        next_cursor?: string | null | undefined;
    }, {
        next_cursor?: string | null | undefined;
    }>;
    connections: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        type: z.ZodString;
        name: z.ZodString;
        enabled: z.ZodBoolean;
        last_synced_at: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        syncing: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        metadata: Record<string, unknown>;
        name: string;
        enabled: boolean;
        type: string;
        id: string;
        created_at: string;
        updated_at: string;
        last_synced_at?: string | null | undefined;
        syncing?: boolean | null | undefined;
    }, {
        metadata: Record<string, unknown>;
        name: string;
        enabled: boolean;
        type: string;
        id: string;
        created_at: string;
        updated_at: string;
        last_synced_at?: string | null | undefined;
        syncing?: boolean | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    connections: {
        metadata: Record<string, unknown>;
        name: string;
        enabled: boolean;
        type: string;
        id: string;
        created_at: string;
        updated_at: string;
        last_synced_at?: string | null | undefined;
        syncing?: boolean | null | undefined;
    }[];
}, {
    pagination: {
        next_cursor?: string | null | undefined;
    };
    connections: {
        metadata: Record<string, unknown>;
        name: string;
        enabled: boolean;
        type: string;
        id: string;
        created_at: string;
        updated_at: string;
        last_synced_at?: string | null | undefined;
        syncing?: boolean | null | undefined;
    }[];
}>;
//# sourceMappingURL=zodSchema.d.ts.map