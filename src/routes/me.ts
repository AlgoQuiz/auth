import { Router, Response, Request } from "express";

import { auth, catchAsync } from "../middlewares";
import { User } from "../models";

const router = Router();

router.get(
  "/me",
  auth,
  catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore TODO: resolve typings on express-session
    const user = await User.findById(req.session!.userId);
    res.json(user);
  })
);

export { router as me };
