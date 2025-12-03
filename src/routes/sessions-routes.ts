import { Router } from "express";
import { SessionsController } from "@/controllers/sessions-controller.js";

export const sessionsRoutes = Router ()
const sessionsController = new SessionsController()

sessionsRoutes.post("/", sessionsController.create)