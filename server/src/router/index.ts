import { Router } from "express";
import { authController } from "../controllers/auth-controller";

import { UserMiddleware } from "../middlewares/user-middleware";

export const router = Router();

router.post("/registration", UserMiddleware, authController.registration);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);
