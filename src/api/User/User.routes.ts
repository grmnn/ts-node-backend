import { Router } from "express";
import { UserController } from "./User.controller";

const userRouter = Router();

userRouter.post("/register", (req, res) =>
  new UserController().register(req, res)
);

userRouter.post("/login", (req, res) => new UserController().login(req, res));

export default userRouter;
