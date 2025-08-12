import { BaseFilterTranslator } from '@mastra/core/vector/filter';
import type { VectorFilter, OperatorSupport, OperatorValueMap, LogicalOperatorValueMap, BlacklistedRootOperators } from '@mastra/core/vector/filter';
type ChromaOperatorValueMap = Omit<OperatorValueMap, '$exists' | '$elemMatch' | '$regex' | '$options'>;
type ChromaLogicalOperatorValueMap = Omit<LogicalOperatorValueMap, '$nor' | '$not'>;
type ChromaBlacklisted = BlacklistedRootOperators | '$nor' | '$not';
export type ChromaVectorFilter = VectorFilter<keyof ChromaOperatorValueMap, ChromaOperatorValueMap, ChromaLogicalOperatorValueMap, ChromaBlacklisted>;
type ChromaDocumentOperatorValueMap = ChromaOperatorValueMap;
type ChromaDocumentBlacklisted = Exclude<ChromaBlacklisted, '$contains'>;
export type ChromaVectorDocumentFilter = VectorFilter<keyof ChromaDocumentOperatorValueMap, ChromaDocumentOperatorValueMap, ChromaLogicalOperatorValueMap, ChromaDocumentBlacklisted>;
/**
 * Translator for Chroma filter queries.
 * Maintains MongoDB-compatible syntax while ensuring proper validation
 * and normalization of values.
 */
export declare class ChromaFilterTranslator extends BaseFilterTranslator<ChromaVectorFilter> {
    protected getSupportedOperators(): OperatorSupport;
    translate(filter?: ChromaVectorFilter): ChromaVectorFilter;
    private translateNode;
    private translateOperator;
}
export {};
//# sourceMappingURL=filter.d.ts.map