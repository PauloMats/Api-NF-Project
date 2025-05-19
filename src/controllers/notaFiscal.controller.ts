import { Request, Response } from 'express';
import * as service from '../services/notaFiscal.service';

const criar = async (req: Request, res: Response) => {
  try {
    const nova = await service.criarSolicitacao(req.body);
    res.status(201).json(nova);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(400).json({ erro: errorMessage });
  }
};

const listar = async (_: Request, res: Response) => {
  const todas = await service.listarSolicitacoes();
  res.json(todas);
};

const buscar = async (req: Request, res: Response): Promise<void> => {
  const nota = await service.buscarPorId(req.params.id);
  if (!nota) {
    res.status(404).json({ erro: 'Não encontrada' });
    return;
  }
  res.json(nota);
};

const emitir = async (req: Request, res: Response) => {
  try {
    const emitida = await service.emitirNota(req.params.id);
    res.json(emitida);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(400).json({ erro: errorMessage });
  }
};

export { criar, listar, buscar, emitir };