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
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updatePostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: number;
}, {
    title: string;
    content: string;
    id: number;
}>;
export type registerSchema = z.infer<typeof registerSchema>;
export type signInSchema = z.infer<typeof signInSchema>;
export type postSchema = z.infer<typeof postSchema>;
export type updatePostSchema = z.infer<typeof updatePostSchema>;
