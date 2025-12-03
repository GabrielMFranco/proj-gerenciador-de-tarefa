import { Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import { z } from "zod"
import { AppError } from "@/utils/App.Error.js";

export class TeamController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().min(2).max(100),
            description: z.string().nullable().optional(),
        })

        const { name, description } = bodySchema.parse(request.body)

        await prisma.team.create({
            data:{
                name,
                description
            }
        })

        return response.status(201).json("successfully created")
    }

    async index(request: Request, response: Response){
        const team = await prisma.team.findMany()

        return response.json(team)
    }

    async patch(request: Request, response: Response){
        const { id } = request.params
        const team_id = Number(id)
        
        const bodySchema = z.object({
            name: z.string().min(2).max(100).optional(),
            description: z.string().nullable().optional(),
        })

        const { name, description } = bodySchema.parse(request.body)
        
        const verifyTeamId = await prisma.team.findUnique({
            where: {id: team_id}
        })
        if(!verifyTeamId){
            throw new AppError("Team_id not found", 404)
        }

        if ((name === undefined || name === "")
        &&(description === undefined || description === null || description === "")
        ) {
            throw new AppError("Nothing to update", 400)
        }

        await prisma.team.update({
            where: { id: team_id},
            data:{
                name,
                description
            }
        })

        return response.json("ok")
    }
}