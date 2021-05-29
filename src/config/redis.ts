import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";

const redisAdapter = () => {
  try {
    const RedisStore = connectRedis(session);
    const client = new Redis({
      port: process.env.REDIS_PORT as unknown as number,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
    });

    return new RedisStore({ client });
  } catch (error) {
    console.error(`Redis store creation failed, ${error}`);
  }
};

export default redisAdapter;
