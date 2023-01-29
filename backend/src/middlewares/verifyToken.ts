import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "types/express";

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    const token = cookies.split("=")[1];
    if (!token) {
      res.status(404).json({ message: "No token found" });
    }
    if (process.env.JWT_SECRET) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ message: "Invalid Token" });
        }
        // to avoid error that userId does not exist on user: string | jwt.JwtPayload | undefined
        const { userId } = user as { userId: string };
        // in order to add userId to req object, we need to add it to the req type, hence the AuthRequest type
        req.userId = userId;
        next();
      });
    } else {
      return res.status(404).json({ message: "No environment variable found" });
    }
  } else {
    return res.status(404).json({ message: "No cookie found" });
  }
};

export default verifyToken;
