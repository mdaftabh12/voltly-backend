import { env } from "../config/env";

// ============================================
// OTP GENERATION
// ============================================

// Generate a six-digit OTP
const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate the OTP expiration timestamp
const generateOtpExpiry = (): Date => {
  return new Date(Date.now() + env.otp.expiryMinutes * 60 * 1000);
};

export { generateOtp, generateOtpExpiry };
