import { Options } from "nodemailer/lib/smtp-connection";

export const MAIL_FROM = `noreply@${process.env.APP_HOSTNAME}`;

export const SMTP_OPTIONS: Options = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT as unknown as number,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};
