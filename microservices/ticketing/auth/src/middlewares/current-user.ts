import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// How we react into an existing type definition and make a modification to it
declare global {
  namespace Express {
    // we don't have to extend it
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) return next();
  try {
    const payload = jwt.verify(req.session.jwt, process.env.jwt!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
