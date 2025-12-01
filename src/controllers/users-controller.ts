import { Request, Response } from "express";
import { z } from "zod";

export class UserController {
    create(request: Request, response: Response){
        const bodyShema = z

        return response.json({ message: "ok" })
    }
}