import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const handleValidationError = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array()[0]);
  }
  next();
};

export default handleValidationError;
