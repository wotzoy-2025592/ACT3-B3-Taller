import type { Cliente } from '../models/clienteModel.js';
/**
 * Capa de persistencia principal (PostgreSQL) para la entidad Cliente.
 * Usa consultas parametrizadas en todos los casos para evitar SQL Injection.
 */
export declare class ClientePostgresRepository {
    existeCodigo(codigoCliente: string): Promise<boolean>;
    insertar(cliente: Cliente): Promise<Cliente>;
    listar(): Promise<Cliente[]>;
}
//# sourceMappingURL=clientePostgresPersistence.d.ts.map