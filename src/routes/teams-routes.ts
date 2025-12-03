import { Router } from "express";
import { TeamController } from "@/controllers/teams-controller.js";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization.js";

export const teamsRoutes = Router()
const teamController = new TeamController()

teamsRoutes.get("/", teamController.index)
teamsRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin"]))
teamsRoutes.post("/", teamController.create)