import { Request, Response } from 'express';
import * as service from '../services/notaFiscal.service';

export const criar = async (req: Request, res: Response) => {
  try {
    const nova = await service.criarSolicitacao(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const listar = async (_: Request, res: Response) => {
  const todas = await service.listarSolicitacoes();
  res.json(todas);
};

export const buscar = async (req: Request, res: Response) => {
  const nota = await service.buscarPorId(req.params.id);
  if (!nota) return res.status(404).json({ erro: 'Não encontrada' });
  res.json(nota);
};

export const emitir = async (req: Request, res: Response) => {
  try {
    const emitida = await service.emitirNota(req.params.id);
    res.json(emitida);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
