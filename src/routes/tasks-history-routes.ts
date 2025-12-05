import { Router } from "express";
import { TasksHistoryController } from "@/controllers/tasks-history-controller.js";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated.js";

export const tasksHistoryRoutes = Router()
const tasksHistoryController = new TasksHistoryController()

tasksHistoryRoutes.get("/", ensureAuthenticated, tasksHistoryController.index)