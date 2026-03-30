import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import { OracleMTGController } from '../Controller/OracleMTGController';
import { mtgQueue, mtgQueueEvents } from '../queues/RedisMTOOracle.queue';

const controller = new OracleMTGController(mtgQueue, mtgQueueEvents);

export const oracleMTG: RequestHandler = async (req: Request, res: Response) => {
  console.log('BODY:', req.body);
  return controller.oracleMTGListRedis(req, res);
};