import z from "zod";
export declare const registerSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string | undefined;
}>, {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    confirmPassword: string;
    name?: string | undefined;
}>;
export declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const postSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodObject<{
        type: z.ZodLiteral<"doc">;
        content: z.ZodArray<z.ZodUnknown, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "doc";
        content: unknown[];
    }, {
        type: "doc";
        content: unknown[];
    }>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: {
        type: "doc";
        content: unknown[];
    };
}, {
    title: string;
    content: {
        type: "doc";
        content: unknown[];
    };
}>;
export declare const updatePostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodObject<{
        type: z.ZodLiteral<"doc">;
        content: z.ZodArray<z.ZodUnknown, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "doc";
        content: unknown[];
    }, {
        type: "doc";
        content: unknown[];
    }>;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: {
        type: "doc";
        content: unknown[];
    };
    id: number;
}, {
    title: string;
    content: {
        type: "doc";
        content: unknown[];
    };
    id: number;
}>;
export type registerSchema = z.infer<typeof registerSchema>;
export type signInSchema = z.infer<typeof signInSchema>;
export type postSchema = z.infer<typeof postSchema>;
export type updatePostSchema = z.infer<typeof updatePostSchema>;
