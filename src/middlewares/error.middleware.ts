import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import { ApiError } from "../utils/ApiError";

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // ZOD VALIDATION ERROR
  if (err instanceof ZodError) {
    const firstError = err.issues[0];

    res.status(400).json({
      success: false,
      message: firstError?.message ?? "Validation failed",
      data: null,
    });

    return;
  }

  // CUSTOM API ERROR
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      data: err.data,
    });

    return;
  }

  // UNKNOWN ERROR
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    data: null,
  });
};

export { errorMiddleware };
