import jwt from "jsonwebtoken";
import { env } from "../config/env";

// ============================================
// JWT TOKEN GENERATION
// ============================================

// Generate a short-lived access token
const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
    },
    env.jwt.accessTokenSecret,
    {
      expiresIn: env.jwt.accessTokenExpiresIn as jwt.SignOptions["expiresIn"],
    },
  );
};

// Generate a long-lived refresh token
const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
    },
    env.jwt.refreshTokenSecret,
    {
      expiresIn: env.jwt.refreshTokenExpiresIn as jwt.SignOptions["expiresIn"],
    },
  );
};

export { generateAccessToken, generateRefreshToken };
