export declare const Body_CreateDocumentSchema: {
    readonly properties: {
        readonly mode: {
            readonly type: "string";
            readonly enum: readonly ["hi_res", "fast"];
            readonly title: "Mode";
            readonly description: "Partition strategy for the document. Options are `'hi_res'` or `'fast'`. Only applicable for rich documents such as word documents and PDFs. When set to `'hi_res'`, images and tables will be extracted from the document. `'fast'` will only extract text. `'fast'` may be up to 20x faster than `'hi_res'`.";
            readonly default: "fast";
        };
        readonly metadata: {
            readonly type: "string";
            readonly title: "Metadata";
            readonly description: "Metadata for the document. Keys must be strings. Values may be strings, numbers, booleans, or lists of strings. Numbers may be integers or floating point and will be converted to 64 bit floating point. 1000 total values are allowed. Each item in an array counts towards the total. The following keys are reserved for internal use: `document_id`, `document_type`, `document_source`, `document_name`, `document_uploaded_at`.";
            readonly default: "{}";
        };
        readonly file: {
            readonly type: "string";
            readonly format: "binary";
            readonly title: "File";
            readonly description: "The binary file to upload, extract, and index for retrieval. The following file types are supported: Plain Text: `.eml` `.html` `.json` `.md` `.msg` `.rst` `.rtf` `.txt` `.xml`\nImages: `.png` `.webp` `.jpg` `.jpeg` `.tiff` `.bmp` `.heic`\nDocuments: `.csv` `.doc` `.docx` `.epub` `.epub+zip` `.odt` `.pdf` `.ppt` `.pptx` `.tsv` `.xlsx` `.xls`.";
        };
        readonly external_id: {
            readonly type: "string";
            readonly title: "External Id";
            readonly description: "An optional identifier for the document. A common value might be an id in an external system or the URL where the source file may be found.";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
            readonly description: "An optional partition identifier. Documents can be scoped to a partition. Partitions must be lowercase alphanumeric and may only include the special characters `_` and `-`.  A partition is created any time a document is created or moved to a new partition.";
        };
    };
    readonly type: "object";
    readonly required: readonly ["file"];
    readonly title: "Body_CreateDocument";
};
export declare const Body_UpdateDocumentFileSchema: {
    readonly properties: {
        readonly mode: {
            readonly type: "string";
            readonly enum: readonly ["hi_res", "fast"];
            readonly title: "Mode";
            readonly description: "Partition strategy for the document. Options are `'hi_res'` or `'fast'`. Only applicable for rich documents such as word documents and PDFs. When set to `'hi_res'`, images and tables will be extracted from the document. `'fast'` will only extract text. `'fast'` may be up to 20x faster than `'hi_res'`.";
            readonly default: "fast";
        };
        readonly file: {
            readonly type: "string";
            readonly format: "binary";
            readonly title: "File";
            readonly description: "The binary file to upload, extract, and index for retrieval. The following file types are supported: Plain Text: `.eml` `.html` `.json` `.md` `.msg` `.rst` `.rtf` `.txt` `.xml`\nImages: `.png` `.webp` `.jpg` `.jpeg` `.tiff` `.bmp` `.heic`\nDocuments: `.csv` `.doc` `.docx` `.epub` `.epub+zip` `.odt` `.pdf` `.ppt` `.pptx` `.tsv` `.xlsx` `.xls`.";
        };
    };
    readonly type: "object";
    readonly required: readonly ["file"];
    readonly title: "Body_UpdateDocumentFile";
};
export declare const ConnectionSchema: {
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uuid";
            readonly title: "Id";
        };
        readonly created_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Created At";
        };
        readonly updated_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Updated At";
        };
        readonly metadata: {
            readonly type: "object";
            readonly title: "Metadata";
        };
        readonly type: {
            readonly type: "string";
            readonly title: "Type";
        };
        readonly name: {
            readonly type: "string";
            readonly title: "Name";
        };
        readonly enabled: {
            readonly type: "boolean";
            readonly title: "Enabled";
        };
        readonly last_synced_at: {
            readonly anyOf: readonly [{
                readonly type: "string";
                readonly format: "date-time";
            }, {
                readonly type: "null";
            }];
            readonly title: "Last Synced At";
        };
        readonly syncing: {
            readonly anyOf: readonly [{
                readonly type: "boolean";
            }, {
                readonly type: "null";
            }];
            readonly title: "Syncing";
        };
    };
    readonly type: "object";
    readonly required: readonly ["id", "created_at", "updated_at", "metadata", "type", "name", "enabled"];
    readonly title: "Connection";
};
export declare const ConnectionBaseSchema: {
    readonly properties: {
        readonly partition_strategy: {
            readonly type: "string";
            readonly enum: readonly ["hi_res", "fast"];
            readonly title: "Partition Strategy";
        };
        readonly metadata: {
            readonly additionalProperties: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "integer";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly type: "array";
                }];
            };
            readonly type: "object";
            readonly title: "Metadata";
            readonly description: "Metadata for the document. Keys must be strings. Values may be strings, numbers, booleans, or lists of strings. Numbers may be integers or floating point and will be converted to 64 bit floating point. 1000 total values are allowed. Each item in an array counts towards the total. The following keys are reserved for internal use: `document_id`, `document_type`, `document_source`, `document_name`, `document_uploaded_at`.";
            readonly default: {};
        };
    };
    readonly type: "object";
    readonly required: readonly ["partition_strategy"];
    readonly title: "ConnectionBase";
};
export declare const ConnectionListSchema: {
    readonly properties: {
        readonly pagination: {
            readonly $ref: "#/components/schemas/Pagination";
        };
        readonly connections: {
            readonly items: {
                readonly $ref: "#/components/schemas/Connection";
            };
            readonly type: "array";
            readonly title: "Connections";
        };
    };
    readonly type: "object";
    readonly required: readonly ["pagination", "connections"];
    readonly title: "ConnectionList";
};
export declare const ConnectionStatsSchema: {
    readonly properties: {
        readonly document_count: {
            readonly type: "integer";
            readonly title: "Document Count";
        };
    };
    readonly type: "object";
    readonly required: readonly ["document_count"];
    readonly title: "ConnectionStats";
};
export declare const ConnectionSyncFinishedWebhookSchema: {
    readonly properties: {
        readonly nonce: {
            readonly type: "string";
            readonly title: "Nonce";
        };
        readonly type: {
            readonly type: "string";
            readonly enum: readonly ["connection_sync_finished"];
            readonly const: "connection_sync_finished";
            readonly title: "Type";
        };
        readonly payload: {
            readonly $ref: "#/components/schemas/ConnectionSyncFinishedWebhookPayload";
        };
    };
    readonly type: "object";
    readonly required: readonly ["nonce", "type", "payload"];
    readonly title: "ConnectionSyncFinishedWebhook";
};
export declare const ConnectionSyncFinishedWebhookPayloadSchema: {
    readonly properties: {
        readonly connection_id: {
            readonly type: "string";
            readonly title: "Connection Id";
        };
        readonly sync_id: {
            readonly type: "string";
            readonly title: "Sync Id";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
        };
        readonly connection_metadata: {
            readonly type: "object";
            readonly title: "Connection Metadata";
        };
    };
    readonly type: "object";
    readonly required: readonly ["connection_id", "sync_id", "partition", "connection_metadata"];
    readonly title: "ConnectionSyncFinishedWebhookPayload";
};
export declare const ConnectionSyncProgressWebhookSchema: {
    readonly properties: {
        readonly nonce: {
            readonly type: "string";
            readonly title: "Nonce";
        };
        readonly type: {
            readonly type: "string";
            readonly enum: readonly ["connection_sync_progress"];
            readonly const: "connection_sync_progress";
            readonly title: "Type";
        };
        readonly payload: {
            readonly $ref: "#/components/schemas/ConnectionSyncProgressWebhookPayload";
        };
    };
    readonly type: "object";
    readonly required: readonly ["nonce", "type", "payload"];
    readonly title: "ConnectionSyncProgressWebhook";
};
export declare const ConnectionSyncProgressWebhookPayloadSchema: {
    readonly properties: {
        readonly connection_id: {
            readonly type: "string";
            readonly title: "Connection Id";
        };
        readonly sync_id: {
            readonly type: "string";
            readonly title: "Sync Id";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
        };
        readonly connection_metadata: {
            readonly type: "object";
            readonly title: "Connection Metadata";
        };
        readonly create_count: {
            readonly type: "integer";
            readonly title: "Create Count";
        };
        readonly created_count: {
            readonly type: "integer";
            readonly title: "Created Count";
        };
        readonly update_content_count: {
            readonly type: "integer";
            readonly title: "Update Content Count";
        };
        readonly updated_content_count: {
            readonly type: "integer";
            readonly title: "Updated Content Count";
        };
        readonly update_metadata_count: {
            readonly type: "integer";
            readonly title: "Update Metadata Count";
        };
        readonly updated_metadata_count: {
            readonly type: "integer";
            readonly title: "Updated Metadata Count";
        };
        readonly delete_count: {
            readonly type: "integer";
            readonly title: "Delete Count";
        };
        readonly deleted_count: {
            readonly type: "integer";
            readonly title: "Deleted Count";
        };
        readonly errored_count: {
            readonly type: "integer";
            readonly title: "Errored Count";
        };
    };
    readonly type: "object";
    readonly required: readonly ["connection_id", "sync_id", "partition", "connection_metadata", "create_count", "created_count", "update_content_count", "updated_content_count", "update_metadata_count", "updated_metadata_count", "delete_count", "deleted_count", "errored_count"];
    readonly title: "ConnectionSyncProgressWebhookPayload";
};
export declare const ConnectionSyncStartedWebhookSchema: {
    readonly properties: {
        readonly nonce: {
            readonly type: "string";
            readonly title: "Nonce";
        };
        readonly type: {
            readonly type: "string";
            readonly enum: readonly ["connection_sync_started"];
            readonly const: "connection_sync_started";
            readonly title: "Type";
        };
        readonly payload: {
            readonly $ref: "#/components/schemas/ConnectionSyncStartedWebhookPayload";
        };
    };
    readonly type: "object";
    readonly required: readonly ["nonce", "type", "payload"];
    readonly title: "ConnectionSyncStartedWebhook";
};
export declare const ConnectionSyncStartedWebhookPayloadSchema: {
    readonly properties: {
        readonly connection_id: {
            readonly type: "string";
            readonly title: "Connection Id";
        };
        readonly sync_id: {
            readonly type: "string";
            readonly title: "Sync Id";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
        };
        readonly connection_metadata: {
            readonly type: "object";
            readonly title: "Connection Metadata";
        };
        readonly create_count: {
            readonly type: "integer";
            readonly title: "Create Count";
        };
        readonly update_content_count: {
            readonly type: "integer";
            readonly title: "Update Content Count";
        };
        readonly update_metadata_count: {
            readonly type: "integer";
            readonly title: "Update Metadata Count";
        };
        readonly delete_count: {
            readonly type: "integer";
            readonly title: "Delete Count";
        };
    };
    readonly type: "object";
    readonly required: readonly ["connection_id", "sync_id", "partition", "connection_metadata", "create_count", "update_content_count", "update_metadata_count", "delete_count"];
    readonly title: "ConnectionSyncStartedWebhookPayload";
};
export declare const CreateDocumentFromUrlParamsSchema: {
    readonly properties: {
        readonly metadata: {
            readonly additionalProperties: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "integer";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly type: "array";
                }];
            };
            readonly type: "object";
            readonly title: "Metadata";
            readonly description: "Metadata for the document. Keys must be strings. Values may be strings, numbers, booleans, or lists of strings. Numbers may be integers or floating point and will be converted to 64 bit floating point. 1000 total values are allowed. Each item in an array counts towards the total. The following keys are reserved for internal use: `document_id`, `document_type`, `document_source`, `document_name`, `document_uploaded_at`.";
            readonly default: {};
        };
        readonly mode: {
            readonly type: "string";
            readonly enum: readonly ["hi_res", "fast"];
            readonly title: "Mode";
            readonly description: "Partition strategy for the document. Options are `'hi_res'` or `'fast'`. Only applicable for rich documents such as word documents and PDFs. When set to `'hi_res'`, images and tables will be extracted from the document. `'fast'` will only extract text. `'fast'` may be up to 20x faster than `'hi_res'`.";
            readonly default: "fast";
        };
        readonly name: {
            readonly type: "string";
            readonly title: "Name";
        };
        readonly external_id: {
            readonly type: "string";
            readonly title: "External Id";
        };
        readonly url: {
            readonly type: "string";
            readonly title: "Url";
            readonly description: "Url of the file to download. Must be publicly accessible and HTTP or HTTPS scheme";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
            readonly description: "An optional partition identifier. Documents can be scoped to a partition. Partitions must be lowercase alphanumeric and may only include the special characters `_` and `-`.  A partition is created any time a document is created or moved to a new partition.";
            readonly examples: readonly [null];
        };
    };
    readonly type: "object";
    readonly required: readonly ["url"];
    readonly title: "CreateDocumentFromUrlParams";
};
export declare const CreateDocumentRawParamsSchema: {
    readonly properties: {
        readonly metadata: {
            readonly additionalProperties: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "integer";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly type: "array";
                }];
            };
            readonly type: "object";
            readonly title: "Metadata";
            readonly description: "Metadata for the document. Keys must be strings. Values may be strings, numbers, booleans, or lists of strings. Numbers may be integers or floating point and will be converted to 64 bit floating point. 1000 total values are allowed. Each item in an array counts towards the total. The following keys are reserved for internal use: `document_id`, `document_type`, `document_source`, `document_name`, `document_uploaded_at`.";
            readonly default: {};
        };
        readonly name: {
            readonly type: "string";
            readonly title: "Name";
            readonly description: "An optional name for the document. If set, the document will have this name. Otherwise it will default to the current timestamp.";
        };
        readonly data: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "object";
            }];
            readonly minLength: 1;
            readonly title: "Data";
            readonly description: "Document data in a text or JSON format.";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
            readonly description: "An optional partition identifier. Documents can be scoped to a partition. Partitions must be lowercase alphanumeric and may only include the special characters `_` and `-`.  A partition is created any time a document is created or moved to a new partition.";
            readonly examples: readonly [null];
        };
    };
    readonly type: "object";
    readonly required: readonly ["data"];
    readonly title: "CreateDocumentRawParams";
};
export declare const CreateInstructionParamsSchema: {
    readonly properties: {
        readonly name: {
            readonly type: "string";
            readonly title: "Name";
            readonly description: "The name of the instruction. Must be unique.";
            readonly examples: readonly ["Find all pizzas"];
        };
        readonly active: {
            readonly type: "boolean";
            readonly title: "Active";
            readonly description: "Whether the instruction is active. Active instructions are applied to documents when they're created or when their file is updated.";
            readonly default: true;
            readonly examples: readonly [true];
        };
        readonly scope: {
            readonly type: "string";
            readonly enum: readonly ["document", "chunk"];
            readonly title: "Scope";
            readonly description: "The scope of the instruction. Determines whether the instruction is applied to the entire document or to each chunk of the document. Options are `'document'` or `'chunk'`. Generally `'document'` should be used when analyzing the full document is desired, such as when generating a summary or determining sentiment, and `'chunk'` should be used when a fine grained search over a document is desired.";
            readonly default: "chunk";
            readonly examples: readonly ["Find all pizzas described in the text."];
        };
        readonly prompt: {
            readonly type: "string";
            readonly title: "Prompt";
            readonly description: "A natural language instruction which will be applied to documents as they are created and updated. The results of the `instruction_prompt` will be stored as an `entity` in the schema defined by the `entity_schema` parameter.";
            readonly examples: readonly ["Find all pizzas described in the text."];
        };
        readonly entity_schema: {
            readonly $ref: "#/components/schemas/EntitySchema";
            readonly description: "The JSON schema definition of the entity generated by an instruction. The schema must define an `object` at its root. If the instruction is expected to generate multiple items, the root object should have a key which defines an array of the expected items. An instruction which generates multiple emails may be expressed as `{\"type\": \"object\", \"properties\": {\"emails\": { \"type\": \"array\", \"items\": { \"type\": \"string\"}}}}`. Simple values may be expressed as an object with a single key. For example, a summary instruction may generate a single string value. The schema might be `{\"type\": \"object\", \"properties\": { \"summary\": { \"type\": \"string\"}}}`.";
            readonly examples: readonly [{
                readonly additionalProperties: false;
                readonly properties: {
                    readonly size: {
                        readonly enum: readonly ["small", "medium", "large"];
                        readonly type: "string";
                    };
                    readonly crust: {
                        readonly enum: readonly ["thin", "thick", "stuffed"];
                        readonly type: "string";
                    };
                    readonly sauce: {
                        readonly enum: readonly ["tomato", "alfredo", "pesto"];
                        readonly type: "string";
                    };
                    readonly cheese: {
                        readonly enum: readonly ["mozzarella", "cheddar", "parmesan", "vegan"];
                        readonly type: "string";
                    };
                    readonly toppings: {
                        readonly items: {
                            readonly enum: readonly ["pepperoni", "mushrooms", "onions", "sausage", "bacon", "extra cheese", "black olives", "green peppers", "pineapple", "spinach"];
                            readonly type: "string";
                        };
                        readonly type: "array";
                        readonly uniqueItems: true;
                    };
                    readonly extraInstructions: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["size", "crust", "sauce", "cheese"];
                readonly title: "Pizza";
                readonly type: "object";
            }];
            readonly additional_properties: true;
        };
        readonly filter: {
            readonly type: "object";
            readonly title: "Filter";
            readonly description: "An optional metadata filter that is matched against document metadata during update and creation. The instruction will only be applied to documents with metadata matching the filter.  The following filter operators are supported: $eq - Equal to (number, string, boolean), $ne - Not equal to (number, string, boolean), $gt - Greater than (number), $gte - Greater than or equal to (number), $lt - Less than (number), $lte - Less than or equal to (number), $in - In array (string or number), $nin - Not in array (string or number). The operators can be combined with AND and OR. Read [Metadata & Filters guide](https://docs.ragie.ai/docs/metadata-filters) for more details and examples.";
            readonly examples: readonly [{
                readonly toppings: {
                    readonly $in: readonly ["pizza", "mushrooms"];
                };
            }];
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
            readonly description: "An optional partition identifier. Instructions can be scoped to a partition. An instruction that defines a partition will only be executed for documents in that partition.";
            readonly examples: readonly [null];
        };
    };
    readonly type: "object";
    readonly required: readonly ["name", "prompt", "entity_schema"];
    readonly title: "CreateInstructionParams";
};
export declare const DeleteConnectionPayloadSchema: {
    readonly properties: {
        readonly keep_files: {
            readonly type: "boolean";
            readonly title: "Keep Files";
        };
    };
    readonly type: "object";
    readonly required: readonly ["keep_files"];
    readonly title: "DeleteConnectionPayload";
};
export declare const DocumentSchema: {
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uuid";
            readonly title: "Id";
        };
        readonly created_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Created At";
        };
        readonly updated_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Updated At";
        };
        readonly status: {
            readonly type: "string";
            readonly title: "Status";
        };
        readonly name: {
            readonly type: "string";
            readonly title: "Name";
        };
        readonly metadata: {
            readonly additionalProperties: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "integer";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly type: "array";
                }];
            };
            readonly type: "object";
            readonly title: "Metadata";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
        };
        readonly chunk_count: {
            readonly anyOf: readonly [{
                readonly type: "integer";
            }, {
                readonly type: "null";
            }];
            readonly title: "Chunk Count";
        };
        readonly external_id: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "External Id";
        };
    };
    readonly type: "object";
    readonly required: readonly ["id", "created_at", "updated_at", "status", "name", "metadata", "partition"];
    readonly title: "Document";
};
export declare const DocumentDeleteSchema: {
    readonly properties: {
        readonly status: {
            readonly type: "string";
            readonly title: "Status";
        };
    };
    readonly type: "object";
    readonly required: readonly ["status"];
    readonly title: "DocumentDelete";
};
export declare const DocumentDeleteWebhookSchema: {
    readonly properties: {
        readonly nonce: {
            readonly type: "string";
            readonly title: "Nonce";
        };
        readonly type: {
            readonly type: "string";
            readonly enum: readonly ["document_deleted"];
            readonly const: "document_deleted";
            readonly title: "Type";
        };
        readonly payload: {
            readonly $ref: "#/components/schemas/DocumentDeleteWebhookPayload";
        };
    };
    readonly type: "object";
    readonly required: readonly ["nonce", "type", "payload"];
    readonly title: "DocumentDeleteWebhook";
};
export declare const DocumentDeleteWebhookPayloadSchema: {
    readonly properties: {
        readonly document_id: {
            readonly type: "string";
            readonly title: "Document Id";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
        };
        readonly metadata: {
            readonly type: "object";
            readonly title: "Metadata";
        };
        readonly external_id: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "External Id";
        };
        readonly sync_id: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "Sync Id";
        };
    };
    readonly type: "object";
    readonly required: readonly ["document_id", "partition", "metadata", "external_id", "sync_id"];
    readonly title: "DocumentDeleteWebhookPayload";
};
export declare const DocumentFileUpdateSchema: {
    readonly properties: {
        readonly status: {
            readonly type: "string";
            readonly title: "Status";
        };
    };
    readonly type: "object";
    readonly required: readonly ["status"];
    readonly title: "DocumentFileUpdate";
};
export declare const DocumentGetSchema: {
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uuid";
            readonly title: "Id";
        };
        readonly created_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Created At";
        };
        readonly updated_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Updated At";
        };
        readonly status: {
            readonly type: "string";
            readonly title: "Status";
        };
        readonly name: {
            readonly type: "string";
            readonly title: "Name";
        };
        readonly metadata: {
            readonly additionalProperties: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "integer";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly type: "array";
                }];
            };
            readonly type: "object";
            readonly title: "Metadata";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
        };
        readonly chunk_count: {
            readonly anyOf: readonly [{
                readonly type: "integer";
            }, {
                readonly type: "null";
            }];
            readonly title: "Chunk Count";
        };
        readonly external_id: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "External Id";
        };
        readonly errors: {
            readonly items: {
                readonly type: "string";
            };
            readonly type: "array";
            readonly title: "Errors";
        };
    };
    readonly type: "object";
    readonly required: readonly ["id", "created_at", "updated_at", "status", "name", "metadata", "partition", "errors"];
    readonly title: "DocumentGet";
};
export declare const DocumentListSchema: {
    readonly properties: {
        readonly pagination: {
            readonly $ref: "#/components/schemas/Pagination";
        };
        readonly documents: {
            readonly items: {
                readonly $ref: "#/components/schemas/Document";
            };
            readonly type: "array";
            readonly title: "Documents";
        };
    };
    readonly type: "object";
    readonly required: readonly ["pagination", "documents"];
    readonly title: "DocumentList";
};
export declare const DocumentMetadataSchema: {
    readonly properties: {};
    readonly additionalProperties: true;
    readonly type: "object";
    readonly title: "DocumentMetadata";
};
export declare const DocumentMetadataUpdateSchema: {
    readonly properties: {
        readonly metadata: {
            readonly additionalProperties: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "integer";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly type: "array";
                }];
            };
            readonly type: "object";
            readonly title: "Metadata";
            readonly description: "The full document metadata inclusive of the update.";
            readonly examples: readonly [{
                readonly editors: readonly ["Alice", "Bob"];
                readonly title: "declassified report";
                readonly unchanged_key: "unchanged_value";
                readonly updated_at: 1714491736216;
            }];
        };
    };
    readonly type: "object";
    readonly required: readonly ["metadata"];
    readonly title: "DocumentMetadataUpdate";
};
export declare const DocumentRawUpdateSchema: {
    readonly properties: {
        readonly status: {
            readonly type: "string";
            readonly title: "Status";
        };
    };
    readonly type: "object";
    readonly required: readonly ["status"];
    readonly title: "DocumentRawUpdate";
};
export declare const DocumentSummarySchema: {
    readonly properties: {
        readonly document_id: {
            readonly type: "string";
            readonly title: "Document Id";
        };
        readonly summary: {
            readonly type: "string";
            readonly title: "Summary";
        };
    };
    readonly type: "object";
    readonly required: readonly ["document_id", "summary"];
    readonly title: "DocumentSummary";
};
export declare const DocumentUpdateWebhookSchema: {
    readonly properties: {
        readonly nonce: {
            readonly type: "string";
            readonly title: "Nonce";
        };
        readonly type: {
            readonly type: "string";
            readonly enum: readonly ["document_status_updated"];
            readonly const: "document_status_updated";
            readonly title: "Type";
        };
        readonly payload: {
            readonly $ref: "#/components/schemas/DocumentUpdateWebhookPayload";
        };
    };
    readonly type: "object";
    readonly required: readonly ["nonce", "type", "payload"];
    readonly title: "DocumentUpdateWebhook";
};
export declare const DocumentUpdateWebhookPayloadSchema: {
    readonly properties: {
        readonly document_id: {
            readonly type: "string";
            readonly title: "Document Id";
        };
        readonly status: {
            readonly anyOf: readonly [{
                readonly type: "string";
                readonly enum: readonly ["ready"];
                readonly const: "ready";
            }, {
                readonly type: "string";
                readonly enum: readonly ["failed"];
                readonly const: "failed";
            }];
            readonly title: "Status";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
        };
        readonly metadata: {
            readonly type: "object";
            readonly title: "Metadata";
        };
        readonly external_id: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "External Id";
        };
        readonly sync_id: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "Sync Id";
        };
    };
    readonly type: "object";
    readonly required: readonly ["document_id", "status", "partition", "metadata", "external_id", "sync_id"];
    readonly title: "DocumentUpdateWebhookPayload";
};
export declare const EntitySchema: {
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uuid";
            readonly title: "Id";
        };
        readonly created_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Created At";
        };
        readonly updated_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Updated At";
        };
        readonly instruction_id: {
            readonly type: "string";
            readonly format: "uuid";
            readonly title: "Instruction Id";
            readonly description: "The ID of the instruction which generated the entity.";
        };
        readonly document_id: {
            readonly type: "string";
            readonly format: "uuid";
            readonly title: "Document Id";
            readonly description: "The ID of the document which the entity was produced from.";
        };
        readonly data: {
            readonly $ref: "#/components/schemas/EntityData";
            readonly description: "The entity data generated by the instruction.";
        };
    };
    readonly type: "object";
    readonly required: readonly ["id", "created_at", "updated_at", "instruction_id", "document_id", "data"];
    readonly title: "Entity";
};
export declare const EntityDataSchema: {
    readonly properties: {};
    readonly additionalProperties: true;
    readonly type: "object";
    readonly title: "EntityData";
};
export declare const EntityExtractedWebhookSchema: {
    readonly properties: {
        readonly nonce: {
            readonly type: "string";
            readonly title: "Nonce";
        };
        readonly type: {
            readonly type: "string";
            readonly enum: readonly ["entity_extracted"];
            readonly const: "entity_extracted";
            readonly title: "Type";
        };
        readonly payload: {
            readonly $ref: "#/components/schemas/EntityExtractedWebhookPayload";
        };
    };
    readonly type: "object";
    readonly required: readonly ["nonce", "type", "payload"];
    readonly title: "EntityExtractedWebhook";
};
export declare const EntityExtractedWebhookPayloadSchema: {
    readonly properties: {
        readonly entity_id: {
            readonly type: "string";
            readonly title: "Entity Id";
        };
        readonly document_id: {
            readonly type: "string";
            readonly title: "Document Id";
        };
        readonly instruction_id: {
            readonly type: "string";
            readonly title: "Instruction Id";
        };
        readonly document_metadata: {
            readonly type: "object";
            readonly title: "Document Metadata";
        };
        readonly document_external_id: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "Document External Id";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
        };
        readonly sync_id: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "Sync Id";
        };
        readonly data: {
            readonly type: "object";
            readonly title: "Data";
        };
    };
    readonly type: "object";
    readonly required: readonly ["entity_id", "document_id", "instruction_id", "document_metadata", "document_external_id", "partition", "sync_id", "data"];
    readonly title: "EntityExtractedWebhookPayload";
};
export declare const EntityListSchema: {
    readonly properties: {
        readonly pagination: {
            readonly $ref: "#/components/schemas/Pagination";
        };
        readonly entities: {
            readonly items: {
                readonly $ref: "#/components/schemas/Entity";
            };
            readonly type: "array";
            readonly title: "Entities";
        };
    };
    readonly type: "object";
    readonly required: readonly ["pagination", "entities"];
    readonly title: "EntityList";
};
export declare const EntitySchemaSchema: {
    readonly properties: {};
    readonly additionalProperties: true;
    readonly type: "object";
    readonly title: "EntitySchema";
};
export declare const ErrorMessageSchema: {
    readonly properties: {
        readonly detail: {
            readonly type: "string";
            readonly title: "Detail";
        };
    };
    readonly type: "object";
    readonly required: readonly ["detail"];
    readonly title: "ErrorMessage";
};
export declare const HTTPValidationErrorSchema: {
    readonly properties: {
        readonly detail: {
            readonly items: {
                readonly $ref: "#/components/schemas/ValidationError";
            };
            readonly type: "array";
            readonly title: "Detail";
        };
    };
    readonly type: "object";
    readonly title: "HTTPValidationError";
};
export declare const InstructionSchema: {
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly format: "uuid";
            readonly title: "Id";
        };
        readonly created_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Created At";
        };
        readonly updated_at: {
            readonly type: "string";
            readonly format: "date-time";
            readonly title: "Updated At";
        };
        readonly name: {
            readonly type: "string";
            readonly title: "Name";
            readonly description: "The name of the instruction. Must be unique.";
            readonly examples: readonly ["Find all pizzas"];
        };
        readonly active: {
            readonly type: "boolean";
            readonly title: "Active";
            readonly description: "Whether the instruction is active. Active instructions are applied to documents when they're created or when their file is updated.";
            readonly default: true;
            readonly examples: readonly [true];
        };
        readonly scope: {
            readonly type: "string";
            readonly enum: readonly ["document", "chunk"];
            readonly title: "Scope";
            readonly description: "The scope of the instruction. Determines whether the instruction is applied to the entire document or to each chunk of the document. Options are `'document'` or `'chunk'`. Generally `'document'` should be used when analyzing the full document is desired, such as when generating a summary or determining sentiment, and `'chunk'` should be used when a fine grained search over a document is desired.";
            readonly default: "chunk";
            readonly examples: readonly ["Find all pizzas described in the text."];
        };
        readonly prompt: {
            readonly type: "string";
            readonly title: "Prompt";
            readonly description: "A natural language instruction which will be applied to documents as they are created and updated. The results of the `instruction_prompt` will be stored as an `entity` in the schema defined by the `entity_schema` parameter.";
            readonly examples: readonly ["Find all pizzas described in the text."];
        };
        readonly entity_schema: {
            readonly $ref: "#/components/schemas/EntitySchema";
            readonly description: "The JSON schema definition of the entity generated by an instruction. The schema must define an `object` at its root. If the instruction is expected to generate multiple items, the root object should have a key which defines an array of the expected items. An instruction which generates multiple emails may be expressed as `{\"type\": \"object\", \"properties\": {\"emails\": { \"type\": \"array\", \"items\": { \"type\": \"string\"}}}}`. Simple values may be expressed as an object with a single key. For example, a summary instruction may generate a single string value. The schema might be `{\"type\": \"object\", \"properties\": { \"summary\": { \"type\": \"string\"}}}`.";
            readonly examples: readonly [{
                readonly additionalProperties: false;
                readonly properties: {
                    readonly size: {
                        readonly enum: readonly ["small", "medium", "large"];
                        readonly type: "string";
                    };
                    readonly crust: {
                        readonly enum: readonly ["thin", "thick", "stuffed"];
                        readonly type: "string";
                    };
                    readonly sauce: {
                        readonly enum: readonly ["tomato", "alfredo", "pesto"];
                        readonly type: "string";
                    };
                    readonly cheese: {
                        readonly enum: readonly ["mozzarella", "cheddar", "parmesan", "vegan"];
                        readonly type: "string";
                    };
                    readonly toppings: {
                        readonly items: {
                            readonly enum: readonly ["pepperoni", "mushrooms", "onions", "sausage", "bacon", "extra cheese", "black olives", "green peppers", "pineapple", "spinach"];
                            readonly type: "string";
                        };
                        readonly type: "array";
                        readonly uniqueItems: true;
                    };
                    readonly extraInstructions: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["size", "crust", "sauce", "cheese"];
                readonly title: "Pizza";
                readonly type: "object";
            }];
            readonly additional_properties: true;
        };
        readonly filter: {
            readonly type: "object";
            readonly title: "Filter";
            readonly description: "An optional metadata filter that is matched against document metadata during update and creation. The instruction will only be applied to documents with metadata matching the filter.  The following filter operators are supported: $eq - Equal to (number, string, boolean), $ne - Not equal to (number, string, boolean), $gt - Greater than (number), $gte - Greater than or equal to (number), $lt - Less than (number), $lte - Less than or equal to (number), $in - In array (string or number), $nin - Not in array (string or number). The operators can be combined with AND and OR. Read [Metadata & Filters guide](https://docs.ragie.ai/docs/metadata-filters) for more details and examples.";
            readonly examples: readonly [{
                readonly toppings: {
                    readonly $in: readonly ["pizza", "mushrooms"];
                };
            }];
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
            readonly description: "An optional partition identifier. Instructions can be scoped to a partition. An instruction that defines a partition will only be executed for documents in that partition.";
            readonly examples: readonly [null];
        };
    };
    readonly type: "object";
    readonly required: readonly ["id", "created_at", "updated_at", "name", "prompt", "entity_schema"];
    readonly title: "Instruction";
};
export declare const MetadataFilterSchema: {
    readonly additionalProperties: true;
    readonly type: "object";
    readonly title: "MetadataFilter";
};
export declare const PaginationSchema: {
    readonly properties: {
        readonly next_cursor: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "null";
            }];
            readonly title: "Next Cursor";
        };
    };
    readonly type: "object";
    readonly title: "Pagination";
};
export declare const PatchDocumentMetadataParamsSchema: {
    readonly properties: {
        readonly metadata: {
            readonly additionalProperties: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "integer";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly type: "array";
                }, {
                    readonly type: "null";
                }];
            };
            readonly type: "object";
            readonly title: "Metadata";
            readonly description: "The metadata to update on the document. Performs a partial update of the document's metadata. Keys must be strings. Values may be strings, numbers, booleans, or lists of strings. Numbers may be integers or floating point and will be converted to 64 bit floating point. Keys set to `null` are deleted. 1000 total values are allowed, inclusive of existing metadata. Each item in an array counts towards the total. The following keys are reserved for internal use: `document_id`, `document_type`, `document_source`, `document_name`, `document_uploaded_at`. If the document is managed by a connection, this operation will extend a metadata overlay which is applied to the document any time the connection syncs the document.";
            readonly examples: readonly [{
                readonly classified: "null (setting null deletes key from metadata)";
                readonly editors: readonly ["Alice", "Bob"];
                readonly title: "declassified report";
            }];
        };
    };
    readonly type: "object";
    readonly required: readonly ["metadata"];
    readonly title: "PatchDocumentMetadataParams";
};
export declare const RetrievalSchema: {
    readonly properties: {
        readonly scored_chunks: {
            readonly items: {
                readonly $ref: "#/components/schemas/ScoredChunk";
            };
            readonly type: "array";
            readonly title: "Scored Chunks";
        };
    };
    readonly type: "object";
    readonly required: readonly ["scored_chunks"];
    readonly title: "Retrieval";
};
export declare const RetrieveParamsSchema: {
    readonly properties: {
        readonly query: {
            readonly type: "string";
            readonly title: "Query";
            readonly description: "The query to search with when retrieving document chunks.";
            readonly examples: readonly ["What is the best pizza place in SF?"];
        };
        readonly top_k: {
            readonly type: "integer";
            readonly title: "Top K";
            readonly description: "The maximum number of chunks to return. Defaults to 8.";
            readonly default: 8;
            readonly examples: readonly [8];
        };
        readonly filter: {
            readonly $ref: "#/components/schemas/MetadataFilter";
            readonly title: "Filter";
            readonly description: "The metadata search filter on documents. Returns chunks only from documents which match the filter. The following filter operators are supported: $eq - Equal to (number, string, boolean), $ne - Not equal to (number, string, boolean), $gt - Greater than (number), $gte - Greater than or equal to (number), $lt - Less than (number), $lte - Less than or equal to (number), $in - In array (string or number), $nin - Not in array (string or number). The operators can be combined with AND and OR. Read [Metadata & Filters guide](https://docs.ragie.ai/docs/metadata-filters) for more details and examples.";
            readonly examples: readonly [{
                readonly department: {
                    readonly $in: readonly ["sales", "marketing"];
                };
            }];
        };
        readonly rerank: {
            readonly type: "boolean";
            readonly title: "Rerank";
            readonly description: "Reranks the chunks for semantic relevancy post cosine similarity. Will be slower but returns a subset of highly relevant chunks. Best for reducing hallucinations and improving accuracy for LLM generation.";
            readonly default: false;
            readonly examples: readonly [true];
        };
        readonly max_chunks_per_document: {
            readonly type: "integer";
            readonly title: "Max Chunks Per Document";
            readonly description: "Maximum number of chunks to retrieve per document. Use this to increase the number of documents the final chunks are retrieved from. This feature is in beta and may change in the future.";
            readonly examples: readonly [0];
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
            readonly description: "The partition to scope a retrieval to. If omitted, the retrieval will be scoped to the default partition, which includes any documents that have not been created in or moved to a partition.";
            readonly examples: readonly [null];
        };
    };
    readonly type: "object";
    readonly required: readonly ["query"];
    readonly title: "RetrieveParams";
};
export declare const ScoredChunkSchema: {
    readonly properties: {
        readonly text: {
            readonly type: "string";
            readonly title: "Text";
        };
        readonly score: {
            readonly type: "number";
            readonly title: "Score";
        };
        readonly document_id: {
            readonly type: "string";
            readonly title: "Document Id";
        };
        readonly document_name: {
            readonly type: "string";
            readonly title: "Document Name";
        };
        readonly document_metadata: {
            readonly $ref: "#/components/schemas/DocumentMetadata";
        };
    };
    readonly type: "object";
    readonly required: readonly ["text", "score", "document_id", "document_name", "document_metadata"];
    readonly title: "ScoredChunk";
};
export declare const SetConnectionEnabledPayloadSchema: {
    readonly properties: {
        readonly enabled: {
            readonly type: "boolean";
            readonly title: "Enabled";
        };
    };
    readonly type: "object";
    readonly required: readonly ["enabled"];
    readonly title: "SetConnectionEnabledPayload";
};
export declare const UpdateDocumentRawParamsSchema: {
    readonly properties: {
        readonly data: {
            readonly anyOf: readonly [{
                readonly type: "string";
            }, {
                readonly type: "object";
            }];
            readonly minLength: 1;
            readonly title: "Data";
            readonly description: "Document data in a text or JSON format.";
        };
    };
    readonly type: "object";
    readonly required: readonly ["data"];
    readonly title: "UpdateDocumentRawParams";
};
export declare const UpdateInstructionParamsSchema: {
    readonly properties: {
        readonly active: {
            readonly type: "boolean";
            readonly title: "Active";
            readonly description: "Whether the instruction is active. Active instructions are applied to documents when they're created or when their file is updated.";
            readonly examples: readonly [true];
        };
    };
    readonly type: "object";
    readonly required: readonly ["active"];
    readonly title: "UpdateInstructionParams";
};
export declare const ValidationErrorSchema: {
    readonly properties: {
        readonly loc: {
            readonly items: {
                readonly anyOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "integer";
                }];
            };
            readonly type: "array";
            readonly title: "Location";
        };
        readonly msg: {
            readonly type: "string";
            readonly title: "Message";
        };
        readonly type: {
            readonly type: "string";
            readonly title: "Error Type";
        };
    };
    readonly type: "object";
    readonly required: readonly ["loc", "msg", "type"];
    readonly title: "ValidationError";
};
export declare const CreateDocumentParamsSchema: {
    readonly type: "object";
    readonly title: "CreateDocumentParams";
    readonly properties: {
        readonly mode: {
            readonly type: "string";
            readonly enum: readonly ["hi_res", "fast"];
            readonly title: "Mode";
            readonly description: "Partition strategy for the document. Options are `'hi_res'` or `'fast'`. Only applicable for rich documents such as word documents and PDFs. When set to `'hi_res'`, images and tables will be extracted from the document. `'fast'` will only extract text. `'fast'` may be up to 20x faster than `'hi_res'`.";
            readonly default: "fast";
        };
        readonly metadata: {
            readonly type: "object";
            readonly title: "Metadata";
            readonly description: "Metadata for the document. Keys must be strings. Values may be strings, numbers, booleans, or lists of strings. Numbers may be integers or floating point and will be converted to 64 bit floating point. 1000 total values are allowed. Each item in an array counts towards the total. The following keys are reserved for internal use: `document_id`, `document_type`, `document_source`, `document_name`, `document_uploaded_at`.";
            readonly default: "{}";
            readonly additionalProperties: {
                readonly oneOf: readonly [{
                    readonly type: "string";
                }, {
                    readonly type: "number";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                }];
            };
        };
        readonly file: {
            readonly type: "string";
            readonly format: "binary";
            readonly title: "File";
            readonly description: "The binary file to upload, extract, and index for retrieval. The following file types are supported: Plain Text: `.eml` `.html` `.json` `.md` `.msg` `.rst` `.rtf` `.txt` `.xml`\nImages: `.png` `.webp` `.jpg` `.jpeg` `.tiff` `.bmp` `.heic`\nDocuments: `.csv` `.doc` `.docx` `.epub` `.epub+zip` `.odt` `.pdf` `.ppt` `.pptx` `.tsv` `.xlsx` `.xls`.";
        };
        readonly external_id: {
            readonly type: "string";
            readonly title: "External Id";
            readonly description: "An optional identifier for the document. A common value might be an id in an external system or the URL where the source file may be found.";
        };
        readonly partition: {
            readonly type: "string";
            readonly title: "Partition";
            readonly description: "An optional partition identifier. Documents can be scoped to a partition. Partitions must be lowercase alphanumeric and may only include the special characters `_` and `-`.  A partition is created any time a document is created or moved to a new partition.";
        };
    };
    readonly required: readonly ["file"];
};
export declare const UpdateDocumentFileParamsSchema: {
    readonly type: "object";
    readonly title: "UpdateDocumentFileParams";
    readonly properties: {
        readonly mode: {
            readonly type: "string";
            readonly enum: readonly ["hi_res", "fast"];
            readonly title: "Mode";
            readonly description: "Partition strategy for the document. Options are `'hi_res'` or `'fast'`. Only applicable for rich documents such as word documents and PDFs. When set to `'hi_res'`, images and tables will be extracted from the document. `'fast'` will only extract text. `'fast'` may be up to 20x faster than `'hi_res'`.";
            readonly default: "fast";
        };
        readonly file: {
            readonly type: "string";
            readonly format: "binary";
            readonly title: "File";
            readonly description: "The binary file to upload, extract, and index for retrieval. The following file types are supported: Plain Text: `.eml` `.html` `.json` `.md` `.msg` `.rst` `.rtf` `.txt` `.xml`\nImages: `.png` `.webp` `.jpg` `.jpeg` `.tiff` `.bmp` `.heic`\nDocuments: `.csv` `.doc` `.docx` `.epub` `.epub+zip` `.odt` `.pdf` `.ppt` `.pptx` `.tsv` `.xlsx` `.xls`.";
        };
    };
    readonly required: readonly ["file"];
};
//# sourceMappingURL=schemas.gen.d.ts.map