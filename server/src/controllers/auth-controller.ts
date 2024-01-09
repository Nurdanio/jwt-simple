import { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import { validationResult } from "express-validator";
import { User, Role } from "../model";

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!validationResult(req).isEmpty()) {
        return res.status(400).json({
          message: `Ошибка`,
        });
      }

      if (await User.findOne({ username })) {
        return res.status(400).json({
          message: `Пользователь под именем ${username} уже есть`,
        });
      }

      User.create({
        username,
        password: hashSync(password, 5),
        roles: [await Role.findOne({ value: "USER" })],
      }).then(async (newUser) => await newUser.save());

      return res.json({
        message: `Пользователь ${username} создан`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration Error" });
    }
  }
  async login(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login Error" });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async removeUser() {}
}

export const authController = new AuthController();
