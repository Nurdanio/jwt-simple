import { Request, Response } from "express";
import { hashSync, compareSync } from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User, Role } from "../model";

const generateAccessToken = (id: unknown, roles: string[]) => {
  const payload = { id, roles };

  return jwt.sign(payload, "some-secret-key", { expiresIn: "15d" });
};

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
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      const validPassword = compareSync(password, user!.password);

      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }

      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }

      return res.json({ token: generateAccessToken(user._id, user.roles) });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login Error" });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      return res.json({ users: await User.find() });
    } catch (error) {
      console.log(error);
    }
  }

  async removeUser() {}
}

export const authController = new AuthController();
