import { Router } from "express";
import { UserController } from "@/controllers/users-controller.js";

export const usersRoutes = Router()
const userController = new UserController()

usersRoutes.post("/", userController.create)
usersRoutes.get("/", userController.index)