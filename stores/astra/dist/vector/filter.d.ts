import { BaseFilterTranslator } from '@mastra/core/vector/filter';
import type { VectorFilter, OperatorSupport, OperatorValueMap, LogicalOperatorValueMap, BlacklistedRootOperators } from '@mastra/core/vector/filter';
type AstraOperatorValueMap = Omit<OperatorValueMap, '$elemMatch' | '$regex' | '$options'> & {
    $size: number;
};
type AstraLogicalOperatorValueMap = Omit<LogicalOperatorValueMap, '$nor'>;
type AstraBlacklisted = BlacklistedRootOperators | '$nor' | '$size';
export type AstraVectorFilter = VectorFilter<keyof AstraOperatorValueMap, AstraOperatorValueMap, AstraLogicalOperatorValueMap, AstraBlacklisted>;
/**
 * Translator for Astra DB filter queries.
 * Maintains MongoDB-compatible syntax while ensuring proper validation
 * and normalization of values.
 */
export declare class AstraFilterTranslator extends BaseFilterTranslator<AstraVectorFilter> {
    protected getSupportedOperators(): OperatorSupport;
    translate(filter?: AstraVectorFilter): AstraVectorFilter;
    private translateNode;
    private translateOperatorValue;
}
export {};
//# sourceMappingURL=filter.d.ts.map