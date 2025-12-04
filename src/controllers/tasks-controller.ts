import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/App.Error.js";

export class TasksController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            title: z.string(),
            description: z.string().nullable().optional(),
            priority: z.enum([ "high","medium","low" ]),
            assigned_to: z.int(),
            team_id: z.int(),
        })

        const { title, description, priority, assigned_to, team_id }
         = bodySchema.parse(request.body)

        const hasTeamId = await prisma.team.findUnique({
            where: { id: team_id}
        })
        if(!hasTeamId){
            throw new AppError("team_id not found", 404)
        }

        const hasUserId = await prisma.user.findUnique({
            where: {id: assigned_to}
        })
        if(!hasUserId){
            throw new AppError("assigned_to not found", 404)
        }

        const isMember = await prisma.team_member.findFirst({
            where: {
                user_id: assigned_to,
                team_id,
            }
        })
        if(!isMember){
            throw new AppError("User is not a member of this team", 401)
        }

        await prisma.task.create({
            data: {
                title,
                description,
                priority,
                status: "pending",
                assigned_to,
                team_id,
            }
        })
        
        return response.json({message: "created successfully"})
    }

    async index(request: Request, response: Response){
        const userRole = request.user?.role
        
        let tasks

        if(userRole === "admin"){
            tasks = await prisma.task.findMany()
        }
        else{
            const userId = Number(request.user?.id)

            if(isNaN(userId)){
                throw new AppError("Invalid user_id", 400);
            }

            const memberShip = await prisma.team_member.findFirst({
                where: { user_id : userId}
            })
            if(!memberShip){
                throw new AppError("member not have team", 404)
            }

            tasks = await prisma.task.findMany({
                where: { team_id : memberShip.team_id}
            })
        }

        return response.json(tasks)
    }

    async show(request: Request, response: Response){
        const { id } = request.params
        const taskId = Number(id)
        const userRole = request.user?.role
        const userId = Number(request.user?.id)

        const task = await prisma.task.findUnique({
            where: { id: taskId}
        })
        if(!task){
            throw new AppError("task not found", 404)
        }

        if(userRole !== "admin"){
            if (isNaN(userId)) {
                throw new AppError("Invalid user id", 400);
            }

            const membership = await prisma.team_member.findFirst({
                where: { user_id: userId }
            });
            if (!membership) {
                throw new AppError("user does not belong to any team", 403);
            }
            if (task.team_id !== membership.team_id) {
                throw new AppError("you are not allowed to access this task", 403);
            }
        }
        
        return response.json(task)
    }
    
    async remove(request: Request, response: Response){
        const { id } = request.params
        const removeTaskId  = Number(id)

        if(isNaN(removeTaskId)){
            throw new AppError("Invalid task_id", 400);
        }

        const verify = await prisma.task.findUnique({
            where: { id: removeTaskId }
        })

        if(!verify){
            throw new AppError("task not found", 404)
        }

        await prisma.task.delete({
            where: { id: removeTaskId }
        })

        return response.json({message: "deleted successfully"})
    }
}