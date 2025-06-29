import { z } from "zod";

import { USER_TYPE } from "../constants/user.constant.js";

export const signUpSchema = {
  body: z.object({
    name: z
      .string({ message: "Name is required" })
      .min(3, "Name must be at least 3 characters long")
      .nonempty("Name is required"),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters long.")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must contain at least one number.",
      }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email format" }),
    phone: z
      .number({ message: "Phone number is required" })
      .min(10, "Phone number must be at least 10 digits long"),
    userType: z.nativeEnum(USER_TYPE, {
      message: `userType must be one of ${USER_TYPE}`,
    }),
  }),
};

export const signInSchema = {
  body: z.object({
    email: z.string({ message: "Email is required" }).email(),
    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters long.")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must contain at least one number.",
      }),
  }),
};
