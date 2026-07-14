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
export function validarCliente(data: Partial<Cliente>): ResultadoValidacion {
  const errores: string[] = [];

  const codigoCliente = (data.codigoCliente ?? '').toString().trim();
  const nombreCliente = (data.nombreCliente ?? '').toString().trim();
  const direccionCliente = (data.direccionCliente ?? '').toString().trim();
  const telefonoCliente = (data.telefonoCliente ?? '').toString().trim();

  // codigoCliente
  if (!codigoCliente) {
    errores.push('El codigo de cliente es obligatorio.');
  } else if (codigoCliente.length < 2 || codigoCliente.length > 20) {
    errores.push('El codigo de cliente debe tener entre 2 y 20 caracteres.');
  } else if (!/^[a-zA-Z0-9-_]+$/.test(codigoCliente)) {
    errores.push('El codigo de cliente solo puede contener letras, numeros, guiones y guion bajo.');
  }

  // nombreCliente
  if (!nombreCliente) {
    errores.push('El nombre del cliente es obligatorio.');
  } else if (nombreCliente.length < 3 || nombreCliente.length > 100) {
    errores.push('El nombre del cliente debe tener entre 3 y 100 caracteres.');
  }

  // direccionCliente
  if (!direccionCliente) {
    errores.push('La direccion del cliente es obligatoria.');
  } else if (direccionCliente.length < 5 || direccionCliente.length > 200) {
    errores.push('La direccion del cliente debe tener entre 5 y 200 caracteres.');
  }

  // telefonoCliente
  if (!telefonoCliente) {
    errores.push('El telefono del cliente es obligatorio.');
  } else if (!/^[0-9+()\-\s]{7,20}$/.test(telefonoCliente)) {
    errores.push('El telefono del cliente no tiene un formato valido (7 a 20 digitos, se permiten +, -, espacios y parentesis).');
  }

  return {
    valido: errores.length === 0,
    errores,
  };
}
