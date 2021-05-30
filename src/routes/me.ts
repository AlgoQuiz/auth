import { Router, Response, Request } from "express";
import { auth } from "../middlewares";
import { catchAsync } from "../services";
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
