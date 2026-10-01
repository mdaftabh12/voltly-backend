import { Router } from "express";
import {
  sendOtp,
  verifyOtp,
} from "../controllers/otp.controller";
import { validate } from "../middlewares/validate.middleware";
import { sendOtpSchema, verifyOtpSchema } from "../validators/otp.validator";

const router = Router();

// Send OTP to the user's phone number
router.post("/send-otp", validate(sendOtpSchema), sendOtp);

// Verify the OTP entered by the user
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);

export default router;
