import { Router } from 'express';
import { agregarCliente, listarClientes } from '../controllers/clienteController.js';
const router = Router();
router.post('/clientes', agregarCliente);
router.get('/clientes', listarClientes);
export default router;
//# sourceMappingURL=clienteRoutes.js.map