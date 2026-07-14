import dotenv from 'dotenv';
import { crearApp } from './app.js';
import { inicializarBaseDeDatos } from './persistence/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function iniciar(): Promise<void> {
  try {
    await inicializarBaseDeDatos();

    const app = crearApp();
    app.listen(PORT, () => {
      console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
      console.log(`API disponible en http://localhost:${PORT}/api/clientes`);
    });
  } catch (error) {
    console.error('[server] No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
}

iniciar();
