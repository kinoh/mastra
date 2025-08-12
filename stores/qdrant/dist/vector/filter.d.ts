import { BaseFilterTranslator } from '@mastra/core/vector/filter';
import type { VectorFilter, LogicalOperator, OperatorSupport, OperatorValueMap, LogicalOperatorValueMap, BlacklistedRootOperators } from '@mastra/core/vector/filter';
type QdrantOperatorValueMap = Omit<OperatorValueMap, '$options' | '$elemMatch' | '$all'> & {
    /**
     * $count: Filter by array length or value count.
     * Example: { tags: { $count: { gt: 2 } } }
     */
    $count: {
        $gt?: number;
        $gte?: number;
        $lt?: number;
        $lte?: number;
        $eq?: number;
    };
    /**
     * $geo: Geospatial filter.
     * Example: { location: { $geo: { type: 'geo_radius', center: [lon, lat], radius: 1000 } } }
     */
    $geo: {
        type: string;
        [key: string]: any;
    };
    /**
     * $hasId: Filter by point IDs.
     * Allowed at root level.
     * Example: { $hasId: '123' } or { $hasId: ['123', '456'] }
     */
    $hasId: string | string[];
    /**
     * $nested: Nested object filter.
     * Example: { metadata: { $nested: { key: 'foo', filter: { $eq: 'bar' } } } }
     */
    $nested: {
        [key: string]: any;
    };
    /**
     * $hasVector: Filter by vector existence or field.
     * Allowed at root level.
     * Example: { $hasVector: true } or { $hasVector: 'vector_field' }
     */
    $hasVector: boolean | string;
    /**
     * $datetime: RFC 3339 datetime range.
     * Example: { createdAt: { $datetime: { gte: '2024-01-01T00:00:00Z' } } }
     */
    $datetime: {
        key?: string;
        range?: {
            gt?: Date | string;
            gte?: Date | string;
            lt?: Date | string;
            lte?: Date | string;
            eq?: Date | string;
        };
    };
    /**
     * $null: Check if a field is null.
     * Example: { metadata: { $null: true } }
     */
    $null: boolean;
    /**
     * $empty: Check if an array or object field is empty.
     * Example: { tags: { $empty: true } }
     */
    $empty: boolean;
};
type QdrantLogicalOperatorValueMap = Omit<LogicalOperatorValueMap, '$nor'>;
type QdrantBlacklistedRootOperators = BlacklistedRootOperators | '$count' | '$geo' | '$nested' | '$datetime' | '$null' | '$empty';
export type QdrantVectorFilter = VectorFilter<keyof QdrantOperatorValueMap, QdrantOperatorValueMap, QdrantLogicalOperatorValueMap, QdrantBlacklistedRootOperators>;
/**
 * Translates MongoDB-style filters to Qdrant compatible filters.
 *
 * Key transformations:
 * - $and -> must
 * - $or -> should
 * - $not -> must_not
 * - { field: { $op: value } } -> { key: field, match/range: { value/gt/lt: value } }
 *
 * Custom operators (Qdrant-specific):
 * - $count -> values_count (array length/value count)
 * - $geo -> geo filters (box, radius, polygon)
 * - $hasId -> has_id filter
 * - $nested -> nested object filters
 * - $hasVector -> vector existence check
 * - $datetime -> RFC 3339 datetime range
 * - $null -> is_null check
 * - $empty -> is_empty check
 */
export declare class QdrantFilterTranslator extends BaseFilterTranslator<QdrantVectorFilter> {
    protected isLogicalOperator(key: string): key is LogicalOperator;
    protected getSupportedOperators(): OperatorSupport;
    translate(filter?: QdrantVectorFilter): QdrantVectorFilter;
    private createCondition;
    private translateNode;
    private buildFinalConditions;
    private handleLogicalOperators;
    private handleFieldConditions;
    private translateCustomOperator;
    private getQdrantLogicalOp;
    private translateOperatorValue;
    private translateGeoFilter;
    private normalizeDatetimeRange;
}
export {};
//# sourceMappingURL=filter.d.ts.map