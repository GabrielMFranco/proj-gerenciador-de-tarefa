import { Router } from "express";
import { TasksController } from "@/controllers/Tasks-controller.js";

export const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post("/", tasksController.create)