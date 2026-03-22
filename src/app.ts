import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { oracleMTG } from './routes/oracleMTG'

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/status', (req: Request, res: Response) => {
    return res.json({
        status: 'online',
        'timestamp': new Date().toISOString()
    });
});

app.post('/mtg_oracle', oracleMTG);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    return res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

export { app };