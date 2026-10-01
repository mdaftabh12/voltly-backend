class ApiError extends Error {
  // HTTP response status code
  statusCode: number;
  
  // Indicates whether the operation was successful
  success: boolean;

  // Additional response data
  data: unknown;

  // ============================================
  // API ERROR CONSTRUCTOR
  // ============================================
  constructor(
    statusCode: number,
    message: string,
    success = false,
    data: unknown = null,
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;

    // Preserve the original stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
