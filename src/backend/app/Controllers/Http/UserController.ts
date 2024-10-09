import { User } from "Database/entities/user";
import { Request, Response } from "express";

export default class UserController {
    static async users(request: Request, response: Response) {
        const data = await User.find();

        response.json({
            status: 1,
            data,
            message: null
        });
    }
}