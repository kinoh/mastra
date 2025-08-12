export declare const ScrapeResponseSchema: {
    readonly type: "object";
    readonly properties: {
        readonly success: {
            readonly type: "boolean";
        };
        readonly data: {
            readonly type: "object";
            readonly properties: {
                readonly markdown: {
                    readonly type: "string";
                };
                readonly html: {
                    readonly type: "string";
                    readonly nullable: true;
                    readonly description: "HTML version of the content on page if `html` is in `formats`";
                };
                readonly rawHtml: {
                    readonly type: "string";
                    readonly nullable: true;
                    readonly description: "Raw HTML content of the page if `rawHtml` is in `formats`";
                };
                readonly screenshot: {
                    readonly type: "string";
                    readonly nullable: true;
                    readonly description: "Screenshot of the page if `screenshot` is in `formats`";
                };
                readonly links: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "List of links on the page if `links` is in `formats`";
                };
                readonly actions: {
                    readonly type: "object";
                    readonly nullable: true;
                    readonly description: "Results of the actions specified in the `actions` parameter. Only present if the `actions` parameter was provided in the request";
                    readonly properties: {
                        readonly screenshots: {
                            readonly type: "array";
                            readonly description: "Screenshot URLs, in the same order as the screenshot actions provided.";
                            readonly items: {
                                readonly type: "string";
                                readonly format: "url";
                            };
                        };
                    };
                };
                readonly metadata: {
                    readonly type: "object";
                    readonly properties: {
                        readonly title: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly language: {
                            readonly type: "string";
                            readonly nullable: true;
                        };
                        readonly sourceURL: {
                            readonly type: "string";
                            readonly format: "uri";
                        };
                        readonly '<any other metadata> ': {
                            readonly type: "string";
                        };
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly description: "The status code of the page";
                        };
                        readonly error: {
                            readonly type: "string";
                            readonly nullable: true;
                            readonly description: "The error message of the page";
                        };
                    };
                };
                readonly llm_extraction: {
                    readonly type: "object";
                    readonly description: "Displayed when using LLM Extraction. Extracted data from the page following the schema defined.";
                    readonly nullable: true;
                };
                readonly warning: {
                    readonly type: "string";
                    readonly nullable: true;
                    readonly description: "Can be displayed when using LLM Extraction. Warning message will let you know any issues with the extraction.";
                };
            };
        };
    };
};
export declare const CrawlStatusResponseObjSchema: {
    readonly type: "object";
    readonly properties: {
        readonly status: {
            readonly type: "string";
            readonly description: "The current status of the crawl. Can be `scraping`, `completed`, or `failed`.";
        };
        readonly total: {
            readonly type: "integer";
            readonly description: "The total number of pages that were attempted to be crawled.";
        };
        readonly completed: {
            readonly type: "integer";
            readonly description: "The number of pages that have been successfully crawled.";
        };
        readonly creditsUsed: {
            readonly type: "integer";
            readonly description: "The number of credits used for the crawl.";
        };
        readonly expiresAt: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "The date and time when the crawl will expire.";
        };
        readonly next: {
            readonly type: "string";
            readonly nullable: true;
            readonly description: "The URL to retrieve the next 10MB of data. Returned if the crawl is not completed or if the response is larger than 10MB.";
        };
        readonly data: {
            readonly type: "array";
            readonly description: "The data of the crawl.";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly markdown: {
                        readonly type: "string";
                    };
                    readonly html: {
                        readonly type: "string";
                        readonly nullable: true;
                        readonly description: "HTML version of the content on page if `includeHtml`  is true";
                    };
                    readonly rawHtml: {
                        readonly type: "string";
                        readonly nullable: true;
                        readonly description: "Raw HTML content of the page if `includeRawHtml`  is true";
                    };
                    readonly links: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly description: "List of links on the page if `includeLinks` is true";
                    };
                    readonly screenshot: {
                        readonly type: "string";
                        readonly nullable: true;
                        readonly description: "Screenshot of the page if `includeScreenshot` is true";
                    };
                    readonly metadata: {
                        readonly type: "object";
                        readonly properties: {
                            readonly title: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly language: {
                                readonly type: "string";
                                readonly nullable: true;
                            };
                            readonly sourceURL: {
                                readonly type: "string";
                                readonly format: "uri";
                            };
                            readonly '<any other metadata> ': {
                                readonly type: "string";
                            };
                            readonly statusCode: {
                                readonly type: "integer";
                                readonly description: "The status code of the page";
                            };
                            readonly error: {
                                readonly type: "string";
                                readonly nullable: true;
                                readonly description: "The error message of the page";
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const CrawlResponseSchema: {
    readonly type: "object";
    readonly properties: {
        readonly success: {
            readonly type: "boolean";
        };
        readonly id: {
            readonly type: "string";
        };
        readonly url: {
            readonly type: "string";
            readonly format: "uri";
        };
    };
};
export declare const MapResponseSchema: {
    readonly type: "object";
    readonly properties: {
        readonly success: {
            readonly type: "boolean";
        };
        readonly links: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
    };
};
//# sourceMappingURL=schemas.gen.d.ts.map