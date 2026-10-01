class ApiResponse<T> {
  // Indicates whether the operation was successful
  success: boolean;

  // Response message
  message: string;

  // Response payload
  data: T;

  // ============================================
  // API RESPONSE CONSTRUCTOR
  // ============================================
  constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export { ApiResponse };
