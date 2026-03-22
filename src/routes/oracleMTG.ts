import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import { OracleMTGController } from '../Controller/OracleMTGController';

export const oracleMTG: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    console.log('BODY:', req.body);
    return await OracleMTGController.oracleMTGListRedis(req, res);
};