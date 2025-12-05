import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller.js";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization.js";

export const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post(
    "/",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    tasksController.create
)
tasksRoutes.get(
    "/",
    ensureAuthenticated, 
    tasksController.index
)
tasksRoutes.delete(
    "/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    tasksController.remove
)
tasksRoutes.get(
    "/:id",
    ensureAuthenticated,
    tasksController.show
)
tasksRoutes.patch(
    "/:id",
    ensureAuthenticated,
    tasksController.patch
)