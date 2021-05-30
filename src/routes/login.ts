import { Router, Response, Request } from "express";
import { guest, auth } from "../middlewares";
import { catchAsync, BadRequest, logIn, logOut } from "../services";
import { User } from "../models";

import { validate, loginSchema } from "../validation";

const router = Router();

router.post(
  "/login",
  guest,
  catchAsync(async (req: Request, res: Response) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchesPassword(password))) {
      throw new BadRequest("Incorrect email or password");
    }

    logIn(req, user.id);

    res.json({ message: "OK" });
  })
);

router.post(
  "/logout",
  auth,
  catchAsync(async (req: Request, res: Response) => {
    await logOut(req, res);

    res.json({ message: "OK" });
  })
);

export { router as login };
