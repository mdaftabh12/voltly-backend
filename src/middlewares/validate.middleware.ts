import { RequestHandler } from "express";
import { ZodType } from "zod";

type ValidationData = {
  body?: unknown;
  params?: Record<string, string>;
  query?: unknown;
};

// ============================================
// REQUEST VALIDATION MIDDLEWARE
// ============================================
const validate = (schema: ZodType<ValidationData>): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body ?? {},
      params: req.params,
      query: req.query,
    });

    // Forward validation errors to the error middleware
    if (!result.success) {
      return next(result.error);
    }

    // Replace request body with validated data
    if (result.data.body !== undefined) {
      req.body = result.data.body;
    }

    // Replace request params with validated data
    if (result.data.params !== undefined) {
      req.params = result.data.params;
    }

    // DO NOT assign req.query
    // Express 5 req.query is getter-only, so it cannot be reassigned

    next();
  };
};

export { validate };
