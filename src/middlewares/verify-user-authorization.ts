import { AppError } from "@/utils/App.Error.js";
import { Request, Response, NextFunction } from "express";
import { request } from "http";

export function verifyUserAuthorization(role: string[]){
    return (request: Request, response: Response, next: NextFunction) => {
        if(!request.user
        || !role.includes(request.user.role)){
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}