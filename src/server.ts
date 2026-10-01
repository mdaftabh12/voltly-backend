import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";
import { deleteExpiredOtps } from "./services/otp.service";

// ============================================
// SERVER CONFIGURATION
// ============================================

const OTP_CLEANUP_INTERVAL = 60 * 1000 * 3;

// START SERVER
const startServer = async (): Promise<void> => {
  try {
    // Connect to PostgreSQL
    await connectDB();

    // Delete expired OTPs every 3 minutes
    setInterval(async () => {
      try {
        await deleteExpiredOtps();
      } catch (error) {
        console.error("❌ OTP cleanup failed:", error);
      }
    }, OTP_CLEANUP_INTERVAL);

    // START HTTP SERVER
    app.listen(env.port, "0.0.0.0", () => {
      console.log(`🚀 Voltly server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
