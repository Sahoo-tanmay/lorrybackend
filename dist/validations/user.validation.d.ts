import { z } from "zod";
export declare const signUpSchema: {
    body: z.ZodObject<{
        name: z.ZodString;
        password: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
        email: z.ZodString;
        phone: z.ZodNumber;
        userType: z.ZodNativeEnum<{
            readonly ADMIN: "ADMIN";
            readonly SUPER_ADMIN: "SUPER_ADMIN";
            readonly HELPER: "HELPER";
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        password: string;
        email: string;
        phone: number;
        userType: "ADMIN" | "SUPER_ADMIN" | "HELPER";
    }, {
        name: string;
        password: string;
        email: string;
        phone: number;
        userType: "ADMIN" | "SUPER_ADMIN" | "HELPER";
    }>;
};
export declare const signInSchema: {
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
    }, "strip", z.ZodTypeAny, {
        password: string;
        email: string;
    }, {
        password: string;
        email: string;
    }>;
};
//# sourceMappingURL=user.validation.d.ts.map