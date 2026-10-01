import { RequestHandler } from "express";

// ============================================
// ASYNC REQUEST HANDLER
// ============================================
const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    // Forward rejected promises to the error middleware
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };
