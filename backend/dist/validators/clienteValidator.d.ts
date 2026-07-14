import type { Cliente } from '../models/clienteModel.js';
export interface ResultadoValidacion {
    valido: boolean;
    errores: string[];
}
/**
 * Valida los datos de un Cliente antes de persistirlo.
 * Reglas: campos obligatorios, cadenas no vacias, longitud adecuada,
 * telefono valido. La validacion de codigo repetido se hace aparte
 * contra la base de datos (requiere acceso asincrono).
 */
export declare function validarCliente(data: Partial<Cliente>): ResultadoValidacion;
//# sourceMappingURL=clienteValidator.d.ts.map