import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Pool de conexiones a PostgreSQL.
 * La configuracion se obtiene de variables de entorno (ver .env.example).
 * "PGHOST" corresponde al servidor/instancia indicado en los requerimientos.
 */
export const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    database: process.env.PGDATABASE || 'clientes_db',
    port: Number(process.env.PGPORT) || 5432,
});
/**
 * Verifica la conexion y crea la tabla "cliente" si no existe.
 * Se ejecuta al iniciar el servidor (ver server.ts).
 */
export async function inicializarBaseDeDatos() {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS cliente (
        codigo_cliente    VARCHAR(20)  PRIMARY KEY,
        nombre_cliente    VARCHAR(100) NOT NULL,
        direccion_cliente VARCHAR(200) NOT NULL,
        telefono_cliente  VARCHAR(20)  NOT NULL
      );
    `);
        console.log('[DB] Tabla "cliente" verificada/creada correctamente.');
    }
    catch (error) {
        console.error('[DB] Error al inicializar la base de datos:', error);
        throw error;
    }
}
//# sourceMappingURL=db.js.map