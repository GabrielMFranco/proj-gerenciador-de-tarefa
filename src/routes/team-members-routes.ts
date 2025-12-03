import { Router } from "express";
import { TeamMembersController } from "@/controllers/team-members-controller.js";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization.js";

export const teamMemberRoutes = Router()
const teamMembersController = new TeamMembersController()

teamMemberRoutes.post("/",
    ensureAuthenticated, 
    verifyUserAuthorization(["admin"]),
    teamMembersController.create, 
)
teamMemberRoutes.delete("/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    teamMembersController.remove,
)