import { BaseFilterTranslator } from '@mastra/core/vector/filter';
import type { VectorFilter, OperatorSupport, OperatorValueMap, LogicalOperatorValueMap, BlacklistedRootOperators, VectorFieldValue } from '@mastra/core/vector/filter';
type MongoDBOperatorValueMap = Omit<OperatorValueMap, '$options'> & {
    $size: number;
};
type MongoDBBlacklisted = BlacklistedRootOperators | '$size';
export type MongoDBVectorFilter = VectorFilter<keyof MongoDBOperatorValueMap, MongoDBOperatorValueMap, LogicalOperatorValueMap, MongoDBBlacklisted, VectorFieldValue | RegExp>;
/**
 * Translator for MongoDB filter queries.
 * Maintains MongoDB-compatible syntax while ensuring proper validation
 * and normalization of values.
 */
export declare class MongoDBFilterTranslator extends BaseFilterTranslator<MongoDBVectorFilter> {
    protected getSupportedOperators(): OperatorSupport;
    translate(filter?: MongoDBVectorFilter): any;
    private translateNode;
    private translateOperatorValue;
    isEmpty(filter: any): boolean;
}
export {};
//# sourceMappingURL=filter.d.ts.map