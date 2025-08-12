import { BaseFilterTranslator } from '@mastra/core/vector/filter';
import type { OperatorSupport, VectorFilter, OperatorValueMap } from '@mastra/core/vector/filter';
type UpstashOperatorValueMap = Omit<OperatorValueMap, '$options' | '$elemMatch'> & {
    $contains: string;
};
export type UpstashVectorFilter = VectorFilter<keyof UpstashOperatorValueMap, UpstashOperatorValueMap>;
export declare class UpstashFilterTranslator extends BaseFilterTranslator<UpstashVectorFilter, string | undefined> {
    protected getSupportedOperators(): OperatorSupport;
    translate(filter?: UpstashVectorFilter): string | undefined;
    private translateNode;
    private readonly COMPARISON_OPS;
    private translateOperator;
    private readonly NEGATED_OPERATORS;
    private formatNot;
    private formatValue;
    private formatArray;
    private formatComparison;
    private joinConditions;
}
export {};
//# sourceMappingURL=filter.d.ts.map