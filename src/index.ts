import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('ok');
});

app.listen(3000, () => {
  console.log('Server running on 3000');
});