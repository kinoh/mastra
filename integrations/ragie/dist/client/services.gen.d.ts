import { type Options } from '@hey-api/client-fetch';
import type { CreateDocumentData, CreateDocumentError, ListDocumentsData, ListDocumentsError, CreateDocumentRawData, CreateDocumentRawError, CreateDocumentFromUrlData, CreateDocumentFromUrlError, GetDocumentData, GetDocumentError, DeleteDocumentData, DeleteDocumentError, UpdateDocumentFileData, UpdateDocumentFileError, UpdateDocumentRawData, UpdateDocumentRawError, PatchDocumentMetadataData, PatchDocumentMetadataError, RetrieveData, RetrieveError, GetDocumentSummaryData, GetDocumentSummaryError, ListInstructionsResponse, CreateInstructionData, CreateInstructionError, UpdateInstructionData, UpdateInstructionError, ListEntitiesByInstructionData, ListEntitiesByInstructionError, ListEntitiesByDocumentData, ListEntitiesByDocumentError, ListConnectionsConnectionsGetData, ListConnectionsConnectionsGetError, SetConnectionEnabledConnectionsConnectionIdEnabledPutData, SetConnectionEnabledConnectionsConnectionIdEnabledPutError, UpdateConnectionConnectionsConnectionIdPutData, UpdateConnectionConnectionsConnectionIdPutError, GetConnectionStatsConnectionsConnectionIdStatsGetData, GetConnectionStatsConnectionsConnectionIdStatsGetError, DeleteConnectionConnectionsConnectionIdDeletePostData, DeleteConnectionConnectionsConnectionIdDeletePostError, DeleteConnectionConnectionsConnectionIdDeletePostResponse } from './types.gen.js';
export declare const client: import("@hey-api/client-fetch").Client<Request, Response, import("@hey-api/client-fetch").RequestOptionsBase<false> & import("@hey-api/client-fetch").Config<false> & {
    headers: Headers;
}>;
/**
 * Create Document
 * On ingest, the document goes through a series of steps before it is ready for retrieval. Each step is reflected in the status of the document which can be one of [`pending`, `partitioning`, `partitioned`, `refined`, `chunked`, `indexed`, `summary_indexed`, `ready`, `failed`]. The document is available for retrieval once it is in ready state. The summary index step can take a few seconds. You can optionally use the document for retrieval once it is in `indexed` state. However the summary will only be available once the state has changed to `summary_indexed` or `ready`.
 */
export declare const createDocument: <ThrowOnError extends boolean = false>(options: Options<CreateDocumentData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").Document, CreateDocumentError, ThrowOnError>;
/**
 * List Documents
 * List all documents sorted by created_at in descending order. Results are paginated with a max limit of 100. When more documents are available, a `cursor` will be provided. Use the `cursor` parameter to retrieve the subsequent page.
 */
export declare const listDocuments: <ThrowOnError extends boolean = false>(options?: Options<ListDocumentsData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").DocumentList, ListDocumentsError, ThrowOnError>;
/**
 * Create Document Raw
 * Ingest a document as raw text. On ingest, the document goes through a series of steps before it is ready for retrieval. Each step is reflected in the status of the document which can be one of [`pending`, `partitioning`, `partitioned`, `refined`, `chunked`, `indexed`, `summary_indexed`, `ready`, `failed`]. The document is available for retrieval once it is in ready state. The summary index step can take a few seconds. You can optionally use the document for retrieval once it is in `indexed` state. However the summary will only be available once the state has changed to `summary_indexed` or `ready`.
 */
export declare const createDocumentRaw: <ThrowOnError extends boolean = false>(options: Options<CreateDocumentRawData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").Document, CreateDocumentRawError, ThrowOnError>;
/**
 * Create Document From Url
 */
export declare const createDocumentFromUrl: <ThrowOnError extends boolean = false>(options: Options<CreateDocumentFromUrlData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").Document, CreateDocumentFromUrlError, ThrowOnError>;
/**
 * Get Document
 */
export declare const getDocument: <ThrowOnError extends boolean = false>(options: Options<GetDocumentData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").DocumentGet, GetDocumentError, ThrowOnError>;
/**
 * Delete Document
 */
export declare const deleteDocument: <ThrowOnError extends boolean = false>(options: Options<DeleteDocumentData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").DocumentDelete, DeleteDocumentError, ThrowOnError>;
/**
 * Update Document File
 */
export declare const updateDocumentFile: <ThrowOnError extends boolean = false>(options: Options<UpdateDocumentFileData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").DocumentFileUpdate, UpdateDocumentFileError, ThrowOnError>;
/**
 * Update Document Raw
 */
export declare const updateDocumentRaw: <ThrowOnError extends boolean = false>(options: Options<UpdateDocumentRawData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").DocumentRawUpdate, UpdateDocumentRawError, ThrowOnError>;
/**
 * Patch Document Metadata
 */
export declare const patchDocumentMetadata: <ThrowOnError extends boolean = false>(options: Options<PatchDocumentMetadataData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").DocumentMetadataUpdate, PatchDocumentMetadataError, ThrowOnError>;
/**
 * Retrieve
 */
export declare const retrieve: <ThrowOnError extends boolean = false>(options: Options<RetrieveData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").Retrieval, RetrieveError, ThrowOnError>;
/**
 * Get Document Summary
 * Get a LLM generated summary of the document. The summary is created when the document is first created or updated. Documents of types ['xls', 'xlsx', 'csv', 'json'] are not supported for summarization. Documents greater than 1M in token length are not supported. This feature is in beta and may change in the future.
 */
export declare const getDocumentSummary: <ThrowOnError extends boolean = false>(options: Options<GetDocumentSummaryData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").DocumentSummary, GetDocumentSummaryError, ThrowOnError>;
/**
 * List Instructions
 * List all instructions.
 */
export declare const listInstructions: <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<ListInstructionsResponse, import("./types.gen").ErrorMessage, ThrowOnError>;
/**
 * Create Instruction
 * Create a new instruction. Instructions are applied to documents as they are created or updated. The results of the instruction are stored as structured data in the schema defined by the `entity_schema` parameter. The `prompt` parameter is a natural language instruction which will be applied to documents. This feature is in beta and may change in the future.
 */
export declare const createInstruction: <ThrowOnError extends boolean = false>(options: Options<CreateInstructionData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").Instruction, CreateInstructionError, ThrowOnError>;
/**
 * Update Instruction
 */
export declare const updateInstruction: <ThrowOnError extends boolean = false>(options: Options<UpdateInstructionData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").Instruction, UpdateInstructionError, ThrowOnError>;
/**
 * Get Instruction Extracted Entities
 */
export declare const listEntitiesByInstruction: <ThrowOnError extends boolean = false>(options: Options<ListEntitiesByInstructionData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").EntityList, ListEntitiesByInstructionError, ThrowOnError>;
/**
 * Get Document Extracted Entities
 */
export declare const listEntitiesByDocument: <ThrowOnError extends boolean = false>(options: Options<ListEntitiesByDocumentData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").EntityList, ListEntitiesByDocumentError, ThrowOnError>;
/**
 * List Connections
 * List all connections sorted by created_at in descending order. Results are paginated with a max limit of 100. When more documents are available, a `cursor` will be provided. Use the `cursor` parameter to retrieve the subsequent page.
 */
export declare const listConnectionsConnectionsGet: <ThrowOnError extends boolean = false>(options?: Options<ListConnectionsConnectionsGetData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").ConnectionList, ListConnectionsConnectionsGetError, ThrowOnError>;
/**
 * Set Connection Enabled
 * Enable or disable the connection. A disabled connection won't sync.
 */
export declare const setConnectionEnabledConnectionsConnectionIdEnabledPut: <ThrowOnError extends boolean = false>(options: Options<SetConnectionEnabledConnectionsConnectionIdEnabledPutData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").Connection, SetConnectionEnabledConnectionsConnectionIdEnabledPutError, ThrowOnError>;
/**
 * Update Connection
 * Updates a connections metadata or mode. These changes will be seen after the next sync.
 */
export declare const updateConnectionConnectionsConnectionIdPut: <ThrowOnError extends boolean = false>(options: Options<UpdateConnectionConnectionsConnectionIdPutData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").Connection, UpdateConnectionConnectionsConnectionIdPutError, ThrowOnError>;
/**
 * Get Connection Stats
 * Lists connection stats: total documents synced.
 */
export declare const getConnectionStatsConnectionsConnectionIdStatsGet: <ThrowOnError extends boolean = false>(options: Options<GetConnectionStatsConnectionsConnectionIdStatsGetData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").ConnectionStats, GetConnectionStatsConnectionsConnectionIdStatsGetError, ThrowOnError>;
/**
 * Delete Connection
 * Schedules a connection to be deleted. You can choose to keep the files from the connection or delete them all. If you keep the files, they will no longer be associated to the connection. Deleting can take some time, so you will still see files for a bit after this is called.
 */
export declare const deleteConnectionConnectionsConnectionIdDeletePost: <ThrowOnError extends boolean = false>(options: Options<DeleteConnectionConnectionsConnectionIdDeletePostData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<DeleteConnectionConnectionsConnectionIdDeletePostResponse, DeleteConnectionConnectionsConnectionIdDeletePostError, ThrowOnError>;
//# sourceMappingURL=services.gen.d.ts.map