import { Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import { z } from "zod"

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
}