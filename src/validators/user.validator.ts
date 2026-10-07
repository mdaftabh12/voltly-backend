import { z } from "zod";

// ============================================
// GET USER BY ID
// ============================================

export const userIdParamSchema = z.object({
  params: z.object({
    userId: z.string().uuid("Please provide a valid user ID."),
  }),
});

// ============================================
// UPDATE OWN PROFILE
// ============================================

export const updateProfileSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters.")
        .max(100, "Name cannot exceed 100 characters.")
        .optional(),

      email: z
        .string()
        .trim()
        .email("Please provide a valid email address.")
        .max(150, "Email cannot exceed 150 characters.")
        .optional(),

      avatar: z
        .string()
        .trim()
        .url("Please provide a valid avatar URL.")
        .max(500, "Avatar URL cannot exceed 500 characters.")
        .optional(),
    })
    .refine(
      (data) =>
        data.name !== undefined ||
        data.email !== undefined ||
        data.avatar !== undefined,
      {
        message: "Please provide at least one field to update.",
      },
    ),
});

// ============================================
// ADMIN UPDATE USER
// ============================================

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid("Please provide a valid user ID."),
  }),

  body: z
    .object({
      name: z.string().trim().min(2).max(100).optional(),

      email: z
        .string()
        .trim()
        .email("Please provide a valid email address.")
        .max(150)
        .optional(),

      avatar: z
        .string()
        .trim()
        .url("Please provide a valid avatar URL.")
        .max(500)
        .optional(),

      role: z.enum(["USER", "OWNER"]).optional(),

      status: z.enum(["ACTIVE", "DISABLED"]).optional(),
    })
    .refine(
      (data) =>
        data.name !== undefined ||
        data.email !== undefined ||
        data.avatar !== undefined ||
        data.role !== undefined ||
        data.status !== undefined,
      {
        message: "Please provide at least one field to update.",
      },
    ),
});
