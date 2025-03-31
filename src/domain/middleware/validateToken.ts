import { NextFunction, Request, Response } from "express";
import { AuthServices } from "../../presentation/services/auth/AuthServices";



export const validateToken = async(req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');
    if (!token) return res.status(400).json({ message: 'Token is required' });

    const authService = new AuthServices();
    /* validate token */
    const tokenValid = await authService.renewToken(token);
    if (tokenValid instanceof Error) return res.status(400).json({ message: tokenValid.message });

    /* get user from token */
    
    next();

}