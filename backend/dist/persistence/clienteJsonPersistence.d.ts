import type { Cliente } from '../models/clienteModel.js';
/**
 * Respaldo secundario de clientes en un archivo JSON.
 * PostgreSQL es la fuente de verdad; este modulo NUNCA debe impedir
 * que una operacion principal se complete si el respaldo falla.
 * Escritura segura: se escribe primero a un archivo temporal y luego
 * se renombra, evitando corromper clientes.json ante un fallo a mitad de escritura.
 */
export declare class ClienteJsonBackup {
    private asegurarArchivo;
    private leer;
    guardarBackup(cliente: Cliente): Promise<void>;
    leerBackup(): Promise<Cliente[]>;
}
//# sourceMappingURL=clienteJsonPersistence.d.ts.map