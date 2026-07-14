import express from 'express';
import cors from 'cors';
import type { Application, Request, Response, NextFunction } from 'express';
import clienteRoutes from './routes/clienteRoutes.js';

export function crearApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api', clienteRoutes);

  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ estado: 'ok' });
  });

  // Manejador de rutas no encontradas
  app.use((req: Request, res: Response) => {
    res.status(404).json({ mensaje: 'Recurso no encontrado.' });
  });

  // Manejador de errores centralizado
  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error('[app] Error no controlado:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  });

  return app;
}
