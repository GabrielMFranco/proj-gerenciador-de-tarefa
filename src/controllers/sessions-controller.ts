import { Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import { z } from "zod"
import { compare } from "bcrypt";
import { AppError } from "@/utils/App.Error.js";
import jwt from "jsonwebtoken"
import { authConfig } from "@/configs/auth.js";

export class SessionsController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password } = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: {email },
        })

        if(!user){
            throw new AppError("invalid email or password", 401)
        }
        
        const passwordMatched = await compare(password, user.password)
        
        if(!passwordMatched){
            throw new AppError("invalid email or password", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = jwt.sign({role: user.role ?? "customer"}, secret, {
            subject: user.id.toString(),
            expiresIn,
        })

        const { password: hashedPassword, ...userWithoutPassword } = user

        return response.json({token, ...userWithoutPassword})
    }
}