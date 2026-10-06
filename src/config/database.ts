import { Sequelize } from "sequelize";
import { env } from "./env";

// ============================================
// DATABASE CONFIGURATION
// ============================================
export const sequelize = new Sequelize(
  env.db.name,
  env.db.user,
  env.db.password,
  {
    host: env.db.host,
    port: env.db.port,
    dialect: "postgres",

    // Disable SQL query logging in production
    logging: false,

    // Connection pool configuration
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

// ============================================
// DATABASE CONNECTION
// ============================================
export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error);
    process.exit(1);
  }
};
