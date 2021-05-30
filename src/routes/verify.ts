import { Router, Request, Response } from "express";

import { User } from "../models";
import { validate, resendEmailSchema, verifyEmailSchema } from "../validation";
import { sendMail, BadRequest, markAsVerified } from "../services";
import { catchAsync } from "../middlewares";

const router = Router();

router.post(
  "/email/verify",
  catchAsync(async (req: Request, res: Response) => {
    await validate(verifyEmailSchema, req.query);

    const { id } = req.query;

    const user = await User.findById(id).select("verifiedAt");

    if (!user || !User.hasValidVerificationUrl(req.originalUrl, req.query)) {
      throw new BadRequest("Invalid activation link");
    }

    if (user.verifiedAt) {
      throw new BadRequest("Email already verified");
    }

    await markAsVerified(user);

    res.json({ message: "OK" });
  })
);

router.post(
  "/email/resend",
  catchAsync(async (req: Request, res: Response) => {
    await validate(resendEmailSchema, req.body);

    const { email } = req.body;

    const user = await User.findOne({ email }).select("email verifiedAt");

    if (user && !user.verifiedAt) {
      const link = user.verificationUrl();

      await sendMail({
        to: email,
        subject: "Verify your email address",
        text: link,
      });
    }

    res.json({
      message:
        "If your email address needs to be verified, you will receive an email with the activation link",
    });
  })
);

export { router as verify };
