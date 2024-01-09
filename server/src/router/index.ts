import { Router } from "express";
import { authController } from "../controllers/auth-controller";

import { UserMiddleware } from "../middlewares/user-middleware";
import { AuthMiddleware } from "../middlewares/auth-middleware";

export const router = Router();

router.post("/registration", UserMiddleware, authController.registration);
router.post("/login", authController.login);
router.get("/users", AuthMiddleware, authController.getUsers);
