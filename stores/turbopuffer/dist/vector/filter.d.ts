import type { OperatorSupport, VectorFilter, OperatorValueMap, LogicalOperatorValueMap, BlacklistedRootOperators } from '@mastra/core/vector/filter';
import { BaseFilterTranslator } from '@mastra/core/vector/filter';
import type { Filters } from '@turbopuffer/turbopuffer';
type TurbopufferOperatorValueMap = Omit<OperatorValueMap, '$regex' | '$options' | '$elemMatch'>;
type TurbopufferLogicalOperatorValueMap = Omit<LogicalOperatorValueMap, '$nor' | '$not'>;
type TurbopufferBlacklistedRootOperators = BlacklistedRootOperators | '$nor' | '$not';
export type TurbopufferVectorFilter = VectorFilter<keyof TurbopufferOperatorValueMap, TurbopufferOperatorValueMap, TurbopufferLogicalOperatorValueMap, TurbopufferBlacklistedRootOperators>;
/**
 * Translator for converting Mastra filters to Turbopuffer format
 *
 * Mastra filters: { field: { $gt: 10 } }
 * Turbopuffer filters: ["And", [["field", "Gt", 10]]]
 */
export declare class TurbopufferFilterTranslator extends BaseFilterTranslator<TurbopufferVectorFilter, Filters | undefined> {
    protected getSupportedOperators(): OperatorSupport;
    /**
     * Map Mastra operators to Turbopuffer operators
     */
    private operatorMap;
    /**
     * Convert the Mastra filter to Turbopuffer format
     */
    translate(filter?: TurbopufferVectorFilter): Filters | undefined;
    /**
     * Recursively translate a filter node
     */
    private translateNode;
    /**
     * Translate a field condition
     */
    private translateFieldCondition;
    /**
     * Translate a logical operator
     */
    private translateLogical;
    /**
     * Translate a specific operator
     */
    private translateOperator;
    /**
     * Normalize a value for comparison operations
     */
    protected normalizeValue(value: any): any;
    /**
     * Normalize array values
     */
    protected normalizeArrayValues(values: any[]): any[];
}
export {};
//# sourceMappingURL=filter.d.ts.map