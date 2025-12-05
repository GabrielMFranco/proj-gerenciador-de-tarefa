import { Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/App.Error.js";

export class TasksHistoryController{
    async index(request: Request, response: Response){
        const role = request.user?.role
        const id = request.user?.id
        const userId  = Number(id)

        let history

        if(isNaN(userId)){
            throw new AppError("invalid task id", 400)
        }

        if(role === "admin"){
            history = await prisma.task_history.findMany()
        }
        else{
            const tasksUser = await prisma.task.findMany({
                where: {assigned_to: userId}
            })

            if(!tasksUser){
                throw new AppError("dont have tasks history for the user")
            }

            history = await prisma.task_history.findMany({
                where: {
                    task_id: { in: tasksUser.map(filter => filter.id)} 
                }
            })
        }

        return response.json(history)
    }
}