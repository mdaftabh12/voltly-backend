import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

interface AccessTokenPayload {
  userId: string;
}

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    // Get access token from cookie
    let accessToken = req.cookies?.accessToken;

    // ----------------------------------------
    // Fallback: Authorization header
    // ----------------------------------------

    if (!accessToken) {
      const authHeader = req.headers.authorization;

      if (authHeader?.startsWith("Bearer ")) {
        accessToken = authHeader.split(" ")[1];
      }
    }

    // ----------------------------------------
    // Token required
    // ----------------------------------------

    if (!accessToken) {
      throw new ApiError(401, "Access token is required.");
    }

    // ----------------------------------------
    // Verify access token
    // ----------------------------------------

    const decoded = jwt.verify(
      accessToken,
      env.jwt.accessTokenSecret,
    ) as AccessTokenPayload;

    if (!decoded.userId) {
      throw new ApiError(401, "Invalid access token.");
    }

    // ----------------------------------------
    // Find user
    // ----------------------------------------

    const user = await User.findByPk(decoded.userId, {
      attributes: ["id", "phoneNumber", "role", "status"],
    });

    if (!user) {
      throw new ApiError(401, "User not found.");
    }

    // ----------------------------------------
    // Check account status
    // ----------------------------------------

    if (user.status === "DISABLED") {
      throw new ApiError(403, "Your account has been disabled.");
    }

    // ----------------------------------------
    // Attach user to request
    // ----------------------------------------

    req.user = {
      userId: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    return next(new ApiError(401, "Invalid or expired access token."));
  }
};

// ============================================
// ROLE AUTHORIZATION
// ============================================

const authorizeRoles = (
  ...allowedRoles: ("USER" | "OWNER")[]
): RequestHandler => {
  return (req, _res, next) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ApiError(401, "Unauthorized.");
      }

      if (!allowedRoles.includes(user.role)) {
        throw new ApiError(
          403,
          "You do not have permission to access this resource.",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export { authMiddleware, authorizeRoles };
