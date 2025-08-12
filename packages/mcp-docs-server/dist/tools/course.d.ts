import { z } from 'zod';
declare const _courseLessonSchema: z.ZodObject<{
    lessonName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    lessonName: string;
}, {
    lessonName: string;
}>;
declare const _confirmationSchema: z.ZodObject<{
    confirm: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    confirm?: boolean | undefined;
}, {
    confirm?: boolean | undefined;
}>;
type CourseState = {
    currentLesson: string;
    lessons: Array<{
        name: string;
        status: number;
        steps: Array<{
            name: string;
            status: number;
        }>;
    }>;
};
export declare function registerUserLocally(email: string): Promise<{
    success: boolean;
    id: string;
    key: string;
    message: string;
}>;
export declare function updateCourseStateOnServerLocally(deviceId: string, state: CourseState): Promise<void>;
export declare const startMastraCourse: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
    }, {
        email?: string | undefined;
    }>;
    execute: (args: {
        email?: string;
    }) => Promise<string>;
};
export declare const getMastraCourseStatus: {
    name: string;
    description: string;
    parameters: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    execute: (_args: Record<string, never>) => Promise<string>;
};
export declare const startMastraCourseLesson: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        lessonName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        lessonName: string;
    }, {
        lessonName: string;
    }>;
    execute: (args: z.infer<typeof _courseLessonSchema>) => Promise<string>;
};
export declare const nextMastraCourseStep: {
    name: string;
    description: string;
    parameters: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    execute: (_args: Record<string, never>) => Promise<string>;
};
export declare const clearMastraCourseHistory: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        confirm: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        confirm?: boolean | undefined;
    }, {
        confirm?: boolean | undefined;
    }>;
    execute: (args: z.infer<typeof _confirmationSchema>) => Promise<string>;
};
export {};
//# sourceMappingURL=course.d.ts.map