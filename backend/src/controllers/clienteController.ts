import type { Request, Response } from 'express';
import { ClientePostgresRepository } from '../persistence/clientePostgresPersistence.js';
import { ClienteJsonBackup } from '../persistence/clienteJsonPersistence.js';
import type { Cliente } from '../models/clienteModel.js';
import { validarCliente } from '../validators/clienteValidator.js';

const repositorioPostgres = new ClientePostgresRepository();
const respaldoJson = new ClienteJsonBackup();

/**
 * POST /api/clientes
 * Agrega un nuevo cliente. Valida formato y codigo duplicado antes de insertar.
 */
export async function agregarCliente(req: Request, res: Response): Promise<void> {
  try {
    const datos: Partial<Cliente> = req.body;

    const validacion = validarCliente(datos);
    if (!validacion.valido) {
      res.status(400).json({
        mensaje: 'Datos de cliente invalidos.',
        errores: validacion.errores,
      });
      return;
    }

    const cliente: Cliente = {
      codigoCliente: datos.codigoCliente!.toString().trim(),
      nombreCliente: datos.nombreCliente!.toString().trim(),
      direccionCliente: datos.direccionCliente!.toString().trim(),
      telefonoCliente: datos.telefonoCliente!.toString().trim(),
    };

    const existe = await repositorioPostgres.existeCodigo(cliente.codigoCliente);
    if (existe) {
      res.status(409).json({
        mensaje: `Ya existe un cliente con el codigo "${cliente.codigoCliente}".`,
        errores: ['codigoCliente duplicado'],
      });
      return;
    }

    const clienteCreado = await repositorioPostgres.insertar(cliente);

    // Respaldo no bloqueante en clientes.json
    await respaldoJson.guardarBackup(clienteCreado);

    res.status(201).json({
      mensaje: 'Cliente agregado correctamente.',
      cliente: clienteCreado,
    });
  } catch (error) {
    console.error('[cliente.controller] Error en agregarCliente:', error);
    res.status(500).json({
      mensaje: 'Ocurrio un error interno al agregar el cliente. Intente nuevamente.',
    });
  }
}

/**
 * GET /api/clientes
 * Lista todos los clientes almacenados en PostgreSQL (fuente de verdad).
 */
export async function listarClientes(req: Request, res: Response): Promise<void> {
  try {
    const clientes = await repositorioPostgres.listar();
    res.status(200).json({ clientes });
  } catch (error) {
    console.error('[cliente.controller] Error en listarClientes:', error);
    res.status(500).json({
      mensaje: 'Ocurrio un error interno al listar los clientes. Intente nuevamente.',
    });
  }
}
