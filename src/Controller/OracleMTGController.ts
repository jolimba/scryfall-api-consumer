import { CreateRequestService } from '../Service/CreateRequest.service';
import { Request, Response } from 'express';
import { redis } from '../data/Redis.client';

const createRequest: CreateRequestService = new CreateRequestService();

export class OracleMTGController {
    static async oracleMTGListRedis(req: Request, res: Response) {
        console.log(req.body);
        await redis.xadd(
            'stream:MTGRequest',
            '*',
            'request', req.body.request,
            'request_id', req.body.id
        );
    }
}