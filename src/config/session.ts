export const getSessionOptions = (env: any) => {
  return {
    secret: env.SESSION_SECRET as string,
    name: env.SESSION_NAME as string,
    cookie: {
      maxAge: Number(env.SESSION_IDLE_TIMEOUT),
      // TODO: enable secure cookie on PROD
      secure: false,
      sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  };
};
