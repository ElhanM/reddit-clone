import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// I had a problem where queries from rtk query keep on refetching until they get a 200 response
// to avoid this, and be able to handle errors for queries, I need to return errors for controllers like getPost.ts with 200 response, and then I can handle the errors on the fe
// to achive this, I need to wrap my middleware with a function that takes a status code and returns the middleware
// so that way I can pass arguments to the middleware
const handleValidationError =
  (status = 400) =>
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(status).json(error.array()[0]);
    }
    next();
  };

export default handleValidationError;
