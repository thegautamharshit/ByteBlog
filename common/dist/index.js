"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.postSchema = exports.signInSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
//Signup Input Schema
exports.registerSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email().min(1, { message: 'Email is Required' }),
    password: zod_1.default.string().min(6, { message: 'Password is Required' }),
    confirmPassword: zod_1.default
        .string()
        .min(1, { message: 'Please confirm your password' }),
})
    .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            message: 'Password is not the same as confirm password',
            path: ['confirmPassword'],
        });
    }
});
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.string().email().min(1, { message: 'Email is Required' }),
    password: zod_1.default.string().min(6, { message: 'Password is Required' }),
});
//Post Input Schema
exports.postSchema = zod_1.default.object({
    title: zod_1.default.string().min(1),
    content: zod_1.default.object({
        type: zod_1.default.literal('doc'),
        content: zod_1.default.array(zod_1.default.unknown())
    }),
});
//Update Post Schema
exports.updatePostSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.object({
        type: zod_1.default.literal('doc'),
        content: zod_1.default.array(zod_1.default.unknown())
    }),
    id: zod_1.default.number()
});
