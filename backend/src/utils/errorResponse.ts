class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string | undefined, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
