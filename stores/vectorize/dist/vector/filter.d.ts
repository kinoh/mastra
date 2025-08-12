import { BaseFilterTranslator } from '@mastra/core/vector/filter';
import type { VectorFilter, OperatorSupport, OperatorValueMap, LogicalOperatorValueMap, BlacklistedRootOperators } from '@mastra/core/vector/filter';
type VectorizeOperatorValueMap = Omit<OperatorValueMap, '$regex' | '$options' | '$exists' | '$elemMatch' | '$all'>;
type VectorizeLogicalOperatorValueMap = Omit<LogicalOperatorValueMap, '$nor' | '$not' | '$and' | '$or'>;
type VectorizeBlacklistedRootOperators = BlacklistedRootOperators | '$nor' | '$not' | '$and' | '$or';
export type VectorizeVectorFilter = VectorFilter<keyof VectorizeOperatorValueMap, VectorizeOperatorValueMap, VectorizeLogicalOperatorValueMap, VectorizeBlacklistedRootOperators>;
export declare class VectorizeFilterTranslator extends BaseFilterTranslator<VectorizeVectorFilter> {
    protected getSupportedOperators(): OperatorSupport;
    translate(filter?: VectorizeVectorFilter): VectorizeVectorFilter;
    private translateNode;
}
export {};
//# sourceMappingURL=filter.d.ts.map