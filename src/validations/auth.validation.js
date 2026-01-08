import { z } from "zod";

export const SIGNUP_SCHEMA = z.object({
  name: z.string().trim().min(2).max(255),
  email: z.email().min(5).max(255).lowercase().trim(),
  password: z.string().min(6).max(128),
  role: z.enum(["user", "admin"]).default("user"),
});

export const LOGIN_SCHEMA = z.object({
  email: z.email().min(5).max(255).lowercase().trim(),
  password: z.string().min(6).max(128),
});
