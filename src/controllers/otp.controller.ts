import { Request, Response } from "express";
import Otp from "../models/otp.model";
import User from "../models/user.model";
import { generateOtp, generateOtpExpiry } from "../utils/otp";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { setAuthCookies } from "../utils/cookie";

const MAX_OTP_ATTEMPTS = 5;

// ============================================
// SEND OTP
// ============================================
const sendOtp = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { phoneNumber } = req.body;

    // Remove any previous unused OTP
    await Otp.destroy({
      where: {
        phoneNumber,
        isUsed: false,
      },
    });

    // Generate a new OTP and expiry time
    const generatedOtp = generateOtp();
    const expiresAt = generateOtpExpiry();

    // Store the OTP in the database
    const otp = await Otp.create({
      phoneNumber,
      otp: generatedOtp,
      expiresAt,
      attempts: 0,
      isUsed: false,
    });

    // Development-only OTP log
    // Remove this before production deployment
    console.log(`📱 OTP for ${phoneNumber}: ${generatedOtp}`);

    res.status(200).json(
      new ApiResponse(true, "We've sent a verification code to your phone.", {
        phoneNumber: otp.phoneNumber,
        expiresAt: otp.expiresAt,
      }),
    );
  },
);

// ============================================
// VERIFY OTP
// ============================================
const verifyOtp = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { phoneNumber, otp } = req.body;

    // Find the latest active OTP
    const otpRecord = await Otp.findOne({
      where: {
        phoneNumber,
        isUsed: false,
      },
      order: [["createdAt", "DESC"]],
    });

    // Handle missing OTP
    if (!otpRecord) {
      throw new ApiError(
        404,
        "We couldn't find a valid verification code. Please request a new one.",
      );
    }

    // Check if the OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      await otpRecord.destroy();

      throw new ApiError(
        400,
        "This verification code has expired. Please request a new one.",
      );
    }

    // Check maximum verification attempts
    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      await otpRecord.destroy();

      throw new ApiError(
        429,
        "Too many incorrect attempts. Please request a new verification code.",
      );
    }

    // Handle incorrect OTP
    if (otpRecord.otp !== otp) {
      otpRecord.attempts += 1;

      await otpRecord.save();

      const remainingAttempts = MAX_OTP_ATTEMPTS - otpRecord.attempts;

      throw new ApiError(
        400,
        `That code isn't correct. You have ${remainingAttempts} attempt${
          remainingAttempts === 1 ? "" : "s"
        } remaining.`,
      );
    }

    // Mark OTP as verified
    otpRecord.isUsed = true;

    await otpRecord.save();

    let user = await User.findOne({
      where: { phoneNumber },
    });

    // Create user if this is a new user
    if (!user) {
      user = await User.create({ phoneNumber });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json(
      new ApiResponse(
        true,
        "Your phone number has been verified successfully.",
        {
          user: {
            id: user.id,
            phoneNumber: user.phoneNumber,
            role: user.role,
            status: user.status,
          },
          verified: true,
        },
      ),
    );
  },
);

export { sendOtp, verifyOtp };
