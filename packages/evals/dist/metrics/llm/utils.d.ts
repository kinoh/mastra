export declare const roundToTwoDecimals: (num: number) => number;
export declare function isCloserTo(value: number, target1: number, target2: number): boolean;
export type TestCase = {
    input: string;
    output: string;
    expectedResult: {
        score: number;
        reason?: string;
    };
};
export type TestCaseWithContext = TestCase & {
    context: string[];
};
//# sourceMappingURL=utils.d.ts.map