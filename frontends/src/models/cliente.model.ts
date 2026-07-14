/**
 * Modelo de la entidad Cliente en el frontend.
 * Debe ser un espejo exacto del modelo del backend
 * (src/models/cliente.model.ts en el servidor).
 */
export interface Cliente {
  codigoCliente: string;
  nombreCliente: string;
  direccionCliente: string;
  telefonoCliente: string;
}
