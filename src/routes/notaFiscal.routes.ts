import { Router } from 'express';
import { criar, listar, buscar, emitir } from '../controllers/notaFiscal.controller';

const router = Router();

router.post('/', criar);
router.get('/', listar);
router.get('/:id', buscar);
router.post('/:id/emitir', emitir);

export default router;