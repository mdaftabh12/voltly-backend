import { Router } from "express";
import otpRoutes from "./otp.routes";

// ROUTER CONFIGURATION
const router = Router();

// ============================================
// ROUTE REGISTRATION
// ============================================
router.use("/otp", otpRoutes);

export default router;
