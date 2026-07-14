import { Router } from 'express';
import type { IRouter } from 'express';
import { agregarCliente, listarClientes } from '../controllers/clienteController.js';

const router: IRouter = Router();

router.post('/clientes', agregarCliente);
router.get('/clientes', listarClientes);

export default router;