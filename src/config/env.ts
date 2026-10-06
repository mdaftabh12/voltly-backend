import dotenv from "dotenv";
dotenv.config();

// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================
export const env = {
  // Application
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",

  // PostgreSQL Database
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || "voltly",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
  },

  // JWT Authentication
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",

    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  },

  // OTP Configuration
  otp: {
    expiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES) || 3,
  },

  // Admin Configuration
  // admin: {
  //   adminEmail: process.env.ADMIN_EMAIL,
  //   adminPassword: process.env.ADMIN_PASSWORD,
  // },
} as const;
