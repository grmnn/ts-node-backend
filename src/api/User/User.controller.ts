import { Request, Response } from "express";
import argon2 from "argon2";

import { getManager, EntityManager } from "typeorm";
import { User } from "./User.entity";

import { validateEmail, validatePassword } from "../utils/validateUserInput";

export class UserController {
  em: EntityManager;

  constructor() {
    this.em = getManager();
  }

  async register(req: Request, res: Response) {
    const userInput = req.body;
    const registerErrors = [];

    if (!validateEmail(userInput.email)) {
      registerErrors.push({
        field: "email",
        message: "E-Mail is not valid.",
      });
    }

    const candidateUser = await this.em.findOne(User, {
      email: userInput.email,
    });

    if (candidateUser) {
      registerErrors.push({
        field: "user",
        message: "User already exists.",
      });
    }

    if (!validatePassword(userInput.password)) {
      registerErrors.push({
        field: "password",
        message: "Password is not valid.",
      });
    }

    if (registerErrors.length) {
      res.status(400).json(registerErrors);
      return;
    }

    const hashedPassword = await argon2.hash(userInput.password);

    const newUserInstance = await this.em.create(User, {
      email: userInput.email,
      password: hashedPassword,
    });

    const newUser = await this.em.save(newUserInstance);

    req.session!.userId = String(newUser!.id);
    res
      .status(200)
      .json({ user: { newUser }, message: "user successfully registered." });
  }

  async login(req: Request, res: Response) {
    const userInput = req.body;
    const registerErrors = [];

    const user = await this.em.findOne(User, {
      email: userInput.email,
    });

    const validPassword = await argon2.verify(
      user!.password,
      userInput.password
    );

    if (!validPassword || !user) {
      registerErrors.push({
        field: "password",
        message: "Wrong credentials.",
      });
    }

    if (registerErrors.length) {
      res.status(400).json(registerErrors);
      return;
    }

    req.session!.userId = String(user!.id);

    res.status(200).json({
      user: { id: user!.id, email: user!.email },
      message: "user successfully logged in.",
    });
  }
}
