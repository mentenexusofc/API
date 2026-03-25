import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import 'express-async-errors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP', message: 'Mente Nexus API is running smoothly!' });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;
