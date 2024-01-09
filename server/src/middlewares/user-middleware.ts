import { check } from "express-validator";

export const UserMiddleware = () => [
  check("username", "Поле не должно быть пустым").notEmpty(),
  check("password", "Поле не должно быть пустым").isLength({ min: 4, max: 10 }),
];
