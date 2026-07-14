import { Pool } from 'pg';
/**
 * Pool de conexiones a PostgreSQL.
 * La configuracion se obtiene de variables de entorno (ver .env.example).
 * "PGHOST" corresponde al servidor/instancia indicado en los requerimientos.
 */
export declare const pool: Pool;
/**
 * Verifica la conexion y crea la tabla "cliente" si no existe.
 * Se ejecuta al iniciar el servidor (ver server.ts).
 */
export declare function inicializarBaseDeDatos(): Promise<void>;
//# sourceMappingURL=db.d.ts.map