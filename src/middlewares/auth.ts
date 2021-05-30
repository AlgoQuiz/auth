import { Request, Response, NextFunction } from "express";

import { isLoggedIn, logOut, BadRequest, Unauthorized } from "../services";
import { catchAsync } from "../middlewares/errorHandler";

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new BadRequest("You are already logged in"));
  }

  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized("You must be logged in"));
  }

  next();
};

export const active = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (isLoggedIn(req)) {
      const now = Date.now();
      const { createdAt } = req.session as any;

      if (now > createdAt + process.env.SESSION_ABSOLUTE_TIMEOUT) {
        await logOut(req, res);

        return next(new Unauthorized("Session expired"));
      }
    }

    next();
  }
);
