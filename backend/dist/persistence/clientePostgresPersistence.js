import { pool } from './db.js';
/**
 * Capa de persistencia principal (PostgreSQL) para la entidad Cliente.
 * Usa consultas parametrizadas en todos los casos para evitar SQL Injection.
 */
export class ClientePostgresRepository {
    async existeCodigo(codigoCliente) {
        try {
            const resultado = await pool.query('SELECT 1 FROM cliente WHERE codigo_cliente = $1 LIMIT 1', [codigoCliente]);
            return (resultado.rowCount ?? 0) > 0;
        }
        catch (error) {
            console.error('[ClientePostgresRepository] Error en existeCodigo:', error);
            throw error;
        }
    }
    async insertar(cliente) {
        try {
            const resultado = await pool.query(`INSERT INTO cliente (codigo_cliente, nombre_cliente, direccion_cliente, telefono_cliente)
         VALUES ($1, $2, $3, $4)
         RETURNING codigo_cliente AS "codigoCliente",
                   nombre_cliente AS "nombreCliente",
                   direccion_cliente AS "direccionCliente",
                   telefono_cliente AS "telefonoCliente"`, [
                cliente.codigoCliente,
                cliente.nombreCliente,
                cliente.direccionCliente,
                cliente.telefonoCliente,
            ]);
            return resultado.rows[0];
        }
        catch (error) {
            console.error('[ClientePostgresRepository] Error en insertar:', error);
            throw error;
        }
    }
    async listar() {
        try {
            const resultado = await pool.query(`SELECT codigo_cliente AS "codigoCliente",
                nombre_cliente AS "nombreCliente",
                direccion_cliente AS "direccionCliente",
                telefono_cliente AS "telefonoCliente"
         FROM cliente
         ORDER BY codigo_cliente ASC`);
            return resultado.rows;
        }
        catch (error) {
            console.error('[ClientePostgresRepository] Error en listar:', error);
            throw error;
        }
    }
}
//# sourceMappingURL=clientePostgresPersistence.js.map