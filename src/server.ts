// import "reflect-metadata";

import express, { Express } from "express";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";

import {
  __serverPort__,
  __cookieName__,
  __isProd__,
  __sessionSecret__,
} from "./constants";

import router from "./router";

export class Server {
  app: Express;
  port: Number;

  constructor() {
    this.app = express();
    this.port = __serverPort__;

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: "http://localhost:8080",
        credentials: true,
      })
    );

    this.createRedisSessionMiddleware();

    this.app.use("/api/v1", router);
  }

  private createRedisSessionMiddleware() {
    const RedisStore = connectRedis(session);
    const redis = new Redis();

    this.app.use(
      session({
        name: __cookieName__,
        store: new RedisStore({
          client: redis,
          disableTouch: true,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
          httpOnly: true,
          sameSite: "lax", // csrf
          secure: false, // cookie only works in https
          // domain: __isProd__ ? ".codeponder.com" : undefined,
        },
        saveUninitialized: false,
        secret: __sessionSecret__,
        resave: false,
      })
    );
  }

  async start() {
    await this.app.listen(this.port, () => {
      console.log(
        `⚡️ [Express]: Server is running at https://localhost:${this.port}`
      );
    });
  }
}
