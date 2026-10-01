import { z } from "zod";

// ============================================
// PHONE NUMBER VALIDATION
// ============================================
const phoneNumberSchema = z
  .string({
    error: "Please enter your mobile number.",
  })
  .trim()
  .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number.");

// ============================================
// OTP VALIDATION
// ============================================
const otpSchema = z
  .string({
    error: "Please enter the OTP.",
  })
  .trim()
  .length(6, "Please enter the 6-digit OTP.")
  .regex(/^\d+$/, "OTP can contain numbers only.");

// ============================================
// SEND OTP VALIDATION
// ============================================
const sendOtpSchema = z.object({
  body: z.object({
    phoneNumber: phoneNumberSchema,
  }),
});

// ============================================
// VERIFY OTP VALIDATION
// ============================================
const verifyOtpSchema = z.object({
  body: z.object({
    phoneNumber: phoneNumberSchema,
    otp: otpSchema,
  }),
});

export { sendOtpSchema, verifyOtpSchema };
