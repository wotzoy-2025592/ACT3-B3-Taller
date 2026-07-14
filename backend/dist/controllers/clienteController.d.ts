import type { Request, Response } from 'express';
/**
 * POST /api/clientes
 * Agrega un nuevo cliente. Valida formato y codigo duplicado antes de insertar.
 */
export declare function agregarCliente(req: Request, res: Response): Promise<void>;
/**
 * GET /api/clientes
 * Lista todos los clientes almacenados en PostgreSQL (fuente de verdad).
 */
export declare function listarClientes(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=clienteController.d.ts.map