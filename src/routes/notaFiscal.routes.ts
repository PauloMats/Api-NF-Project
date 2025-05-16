import { Router } from 'express';
import * as controller from '../controllers/notaFiscal.controller';

const router = Router();

router.post('/', controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/:id/emitir', controller.emitir);

export default router;