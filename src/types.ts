import { Request, Response } from "express";
import { Redis } from "ioredis";

export type CtrlContext = {
  req: Request & { session: Express.Session };
  redis: Redis;
  res: Response;
};
