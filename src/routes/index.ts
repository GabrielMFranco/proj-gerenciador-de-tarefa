import { Router } from "express";
import { usersRoutes } from "./users-routes.js";
import { sessionsRoutes } from "./sessions-routes.js";
import { tasksRoutes } from "./tasks-routes.js";
import { teamsRoutes } from "./teams-routes.js";
import { teamMemberRoutes } from "./team-members-routes.js";

export const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/login", sessionsRoutes)
routes.use("/tasks", tasksRoutes)
routes.use("/teams", teamsRoutes)
routes.use("/team_member", teamMemberRoutes)