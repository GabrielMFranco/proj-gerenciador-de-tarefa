import { Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import { z } from "zod"
import { compare } from "bcrypt";
import { AppError } from "@/utils/App.Error.js";

export class TeamMembersController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            user_id: z.int(),
            team_id: z.int()
        })
        
        const { user_id, team_id } = bodySchema.parse(request.body)

        const hasUserId = await prisma.user.findUnique({
            where: { id: user_id}
        })
        if(!hasUserId){
            throw new AppError("user_id not found", 401)
        }

        const hasTeamId = await prisma.team.findUnique({
            where: {id: team_id}
        })
        if(!hasTeamId){
            throw new AppError("team_id not found", 401)
        }

        await prisma.team_member.create({
            data: {
                user_id,
                team_id
            }
        })

        return response.json()
    }

    async remove(request: Request, response: Response){
        const { id } = request.params
        const teamMemberId = Number(id)

        if (isNaN(teamMemberId)) {
            throw new AppError("Invalid member_id", 400);
        }

        const verify = await prisma.team_member.findUnique({
            where: { id: teamMemberId }
        })

        if(!verify){
            throw new AppError("member not found", 404)
        }

        await prisma.team_member.delete({
            where: { id: teamMemberId }
        })

        return response.json({ message: "removed member from team"})
    }
}