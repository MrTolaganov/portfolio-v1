import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const signInSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .merge(emailSchema);

export const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
  })
  .merge(signInSchema);

export const otpSchema = z.object({
  otp: z.string().length(6, "Verification code must contain 6 digits"),
});

export const forgotPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm password must be equal to new password",
  });

export const contactFormSchema = z.object({
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export const projectSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  techs: z.string().min(3, "Technology must be at least 3 characters"),
  imageUrl: z.string().url(),
  imageKey: z.string(),
  demoUrl: z.string().url(),
  githubUrl: z.string().url(),
});
