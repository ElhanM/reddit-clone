class ErrorResponse extends Error {
  statusCode: number;
  constructor(msg: string | undefined, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
