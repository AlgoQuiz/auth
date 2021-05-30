import nodemailer, { SendMailOptions } from "nodemailer";

export const sendMail = (options: SendMailOptions) => {
  const SMTP_OPTIONS = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT as unknown as number,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(SMTP_OPTIONS);

  return transporter.sendMail({
    ...options,
    from: `noreply@${process.env.APP_HOSTNAME}`,
  });
};
