export const SESSION_OPTIONS = {
  secret: process.env.SESSION_SECRET as string,
  name: process.env.SESSION_NAME as string,
  cookie: {
    maxAge: process.env.SESSION_IDLE_TIMEOUT as string,
    // TODO: enable secure cookie on PROD
    secure: false,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
