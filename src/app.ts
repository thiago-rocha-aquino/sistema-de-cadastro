import express, { Express } from 'express';
import cors from 'cors';
import { userRoutes } from './presentation/routes/userRoutes';

export function createApp(): Express {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Routes
  app.use('/api', userRoutes);

  return app;
}
