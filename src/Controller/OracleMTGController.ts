import { Request, Response } from 'express';
import { Queue, QueueEvents } from 'bullmq';
import { randomUUID } from 'crypto';

export class OracleMTGController {
  constructor(
    private queue: Queue,
    private queueEvents: QueueEvents
  ) {}
  async oracleMTGListRedis(req: Request, res: Response): Promise<Response> {
    const requestId = randomUUID();
    const job = await this.queue.add(
      'mtg-fetch',
      {
        requestId,
        text: req.body.message // corrigido
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 500
        },
        removeOnComplete: true,
        removeOnFail: true
      }
    );
    try {
      const result = await job.waitUntilFinished(this.queueEvents);

      return res.json({
        requestId,
        result
      });
    } catch {
      return res.status(504).json({
        requestId,
        error: 'timeout or worker failed'
      });
    }
  }
}