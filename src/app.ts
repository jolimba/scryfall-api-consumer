import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { oracleMTG } from './routes/oracleMTG';
import { validateMTOOracle } from './middleware/MTGOracle.middleware';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { mtgQueue } from './queues/RedisMTOOracle.queue';

const app: Express = express();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(mtgQueue)],
  serverAdapter,
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/status', (req: Request, res: Response) => {
  return res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

app.post('/mtg_oracle', validateMTOOracle, oracleMTG);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

app.use('/admin/queues', serverAdapter.getRouter());

export { app };