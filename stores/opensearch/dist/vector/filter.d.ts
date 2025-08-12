import type { BlacklistedRootOperators, LogicalOperatorValueMap, OperatorSupport, OperatorValueMap, VectorFilter } from '@mastra/core/vector/filter';
import { BaseFilterTranslator } from '@mastra/core/vector/filter';
type OpenSearchOperatorValueMap = Omit<OperatorValueMap, '$options' | '$nor' | '$elemMatch'>;
type OpenSearchLogicalOperatorValueMap = Omit<LogicalOperatorValueMap, '$nor'>;
type OpenSearchBlacklisted = BlacklistedRootOperators | '$nor';
export type OpenSearchVectorFilter = VectorFilter<keyof OpenSearchOperatorValueMap, OpenSearchOperatorValueMap, OpenSearchLogicalOperatorValueMap, OpenSearchBlacklisted>;
/**
 * Translator for OpenSearch filter queries.
 * Maintains OpenSearch-compatible syntax while ensuring proper validation
 * and normalization of values.
 */
export declare class OpenSearchFilterTranslator extends BaseFilterTranslator<OpenSearchVectorFilter> {
    protected getSupportedOperators(): OperatorSupport;
    translate(filter?: OpenSearchVectorFilter): OpenSearchVectorFilter;
    private translateNode;
    /**
     * Handles translation of nested objects with dot notation fields
     */
    private translateNestedObject;
    private translateLogicalOperator;
    private translateFieldOperator;
    /**
     * Translates regex patterns to OpenSearch query syntax
     */
    private translateRegexOperator;
    private addKeywordIfNeeded;
    /**
     * Helper method to handle special cases for the $not operator
     */
    private handleNotOperatorSpecialCases;
    private translateOperator;
    /**
     * Translates field conditions to OpenSearch query syntax
     * Handles special cases like range queries and multiple operators
     */
    private translateFieldConditions;
    /**
     * Checks if conditions can be optimized to a range query
     */
    private canOptimizeToRangeQuery;
    /**
     * Creates a range query from numeric operators
     */
    private createRangeQuery;
}
export {};
//# sourceMappingURL=filter.d.ts.map