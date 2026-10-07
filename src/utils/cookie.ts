import { Response } from "express";
import { env } from "../config/env";

// ============================================
// 🍪 COOKIE OPTIONS
// ============================================

const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax" as const,
};

// ============================================
// 🔑 SET AUTH COOKIES
// ============================================

const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): void => {
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ============================================
// 🗑️ CLEAR AUTH COOKIES
// ============================================

const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
};

export { setAuthCookies, clearAuthCookies };
