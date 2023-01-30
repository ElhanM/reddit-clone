import { NextFunction, Request, Response } from "express";

// we need to have next function here in order to recive json response
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: { statusCode: number; message: string }, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
