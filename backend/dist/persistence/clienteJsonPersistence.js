import { promises as fs } from 'fs';
import path from 'path';
const RUTA_ARCHIVO = path.join(__dirname, '..', '..', 'data', 'clientes.json');
/**
 * Respaldo secundario de clientes en un archivo JSON.
 * PostgreSQL es la fuente de verdad; este modulo NUNCA debe impedir
 * que una operacion principal se complete si el respaldo falla.
 * Escritura segura: se escribe primero a un archivo temporal y luego
 * se renombra, evitando corromper clientes.json ante un fallo a mitad de escritura.
 */
export class ClienteJsonBackup {
    async asegurarArchivo() {
        try {
            await fs.access(RUTA_ARCHIVO);
        }
        catch {
            await fs.mkdir(path.dirname(RUTA_ARCHIVO), { recursive: true });
            await fs.writeFile(RUTA_ARCHIVO, '[]', 'utf-8');
        }
    }
    async leer() {
        try {
            await this.asegurarArchivo();
            const contenido = await fs.readFile(RUTA_ARCHIVO, 'utf-8');
            const datos = JSON.parse(contenido);
            if (!Array.isArray(datos)) {
                console.warn('[ClienteJsonBackup] Formato invalido en clientes.json, se reinicia a arreglo vacio.');
                return [];
            }
            return datos;
        }
        catch (error) {
            console.error('[ClienteJsonBackup] Error al leer clientes.json:', error);
            return [];
        }
    }
    async guardarBackup(cliente) {
        try {
            const clientes = await this.leer();
            const yaExiste = clientes.some(c => c.codigoCliente === cliente.codigoCliente);
            if (!yaExiste) {
                clientes.push(cliente);
            }
            const archivoTemporal = `${RUTA_ARCHIVO}.tmp`;
            await fs.writeFile(archivoTemporal, JSON.stringify(clientes, null, 2), 'utf-8');
            await fs.rename(archivoTemporal, RUTA_ARCHIVO);
        }
        catch (error) {
            // El respaldo es secundario: se registra el error pero no se relanza,
            // para no afectar la respuesta principal al cliente HTTP.
            console.error('[ClienteJsonBackup] Error al guardar el respaldo (no bloqueante):', error);
        }
    }
    async leerBackup() {
        return this.leer();
    }
}
//# sourceMappingURL=clienteJsonPersistence.js.map