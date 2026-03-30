import { Request, Response, NextFunction } from "express";

export function validateMTOOracle(req: Request, res: Response, next: NextFunction) {
    if(!req.is('application/json')) {
        return res.status(415).json({
            message: 'Content-Type must be application/json'
        });
    }
    const { message } = req.body
    if(message.length === 0 || message.length > 300) {
        return res.status(400).json({
            error: 'Invalid payload',
            message: '"message" must be between 1 and 300 characters'
        });
    }
    next();
}