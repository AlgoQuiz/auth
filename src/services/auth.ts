import { Request, Response } from "express";
import { UserDocument } from "../models";

// @ts-ignore
export const isLoggedIn = (req: Request) => !!req.session!.userId;

export const logIn = (req: Request, userId: string) => {
  // @ts-ignore
  req.session!.userId = userId;
  // @ts-ignore
  req.session!.createdAt = Date.now();
};

export const logOut = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err);

      res.clearCookie(process.env.SESSION_NAME as string);

      // @ts-ignore
      resolve();
    });
  });

export const markAsVerified = async (user: UserDocument) => {
  user.verifiedAt = new Date();
  await user.save();
};

export const resetPassword = async (user: UserDocument, password: string) => {
  user.password = password;
  await user.save();
};
