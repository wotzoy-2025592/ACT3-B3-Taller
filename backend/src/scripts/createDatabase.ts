import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Script utilitario: crea la base de datos indicada en PGDATABASE si no existe.
 * Se conecta a la base de mantenimiento "postgres" porque no es posible
 * crear una base de datos estando conectado a ella misma.
 * Uso: npm run db:create
 */
async function crearBaseDeDatos(): Promise<void> {
  const nombreBD = process.env.PGDATABASE || 'clientes_db';

  const client = new Client({
    host: process.env.PGHOST || 'localhost',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    port: Number(process.env.PGPORT) || 5432,
    database: 'postgres',
  });

  try {
    await client.connect();

    const resultado = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [nombreBD]
    );

    if ((resultado.rowCount ?? 0) === 0) {
      // No se puede parametrizar el nombre de la BD en CREATE DATABASE,
      // por eso se valida/escapa manualmente contra inyeccion.
      if (!/^[a-zA-Z0-9_]+$/.test(nombreBD)) {
        throw new Error('Nombre de base de datos invalido en PGDATABASE.');
      }
      await client.query(`CREATE DATABASE ${nombreBD}`);
      console.log(`Base de datos "${nombreBD}" creada correctamente.`);
    } else {
      console.log(`La base de datos "${nombreBD}" ya existe.`);
    }
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

crearBaseDeDatos();
