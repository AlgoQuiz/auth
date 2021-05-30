import { Router, Response, Request } from "express";

import { guest } from "../middlewares";
import { catchAsync, BadRequest, logIn, sendMail } from "../services";
import { User } from "../models";
import { validate, registerSchema } from "../validation";

const router = Router();

router.post(
  "/register",
  guest,
  catchAsync(async (req: Request, res: Response) => {
    await validate(registerSchema, req.body);

    const { email, name, password } = req.body;

    const existingUser = await User.exists({ email });

    if (existingUser) {
      throw new BadRequest("Invalid email");
    }

    const user = await User.create({
      email,
      name,
      password,
    });

    logIn(req, user.id);

    const link = user.verificationUrl();

    await sendMail({
      to: email,
      subject: "Verify your email address",
      text: link,
    });

    res.json({ message: "OK" });
  })
);

export { router as register };
