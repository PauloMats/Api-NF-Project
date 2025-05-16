import { prisma } from '../../prisma';
import { apiClient } from '../utils/apiClient';

export const criarSolicitacao = async (data: any) => {
  return await prisma.notaFiscal.create({ data });
};

export const listarSolicitacoes = async () => {
  return await prisma.notaFiscal.findMany();
};

export const buscarPorId = async (id: string) => {
  return await prisma.notaFiscal.findUnique({ where: { id } });
};

export const emitirNota = async (id: string) => {
  const nota = await buscarPorId(id);
  if (!nota || nota.status !== 'PENDENTE_EMISSAO') throw new Error('Solicitação inválida');

  try {
    const response = await apiClient.post('/notas-fiscais', {
      cnpj: nota.cnpj,
      municipio: nota.municipio,
      estado: nota.estado,
      valor: nota.valor,
      dataDesejada: nota.dataDesejada,
      descricao: nota.descricao
    });

    return await prisma.notaFiscal.update({
      where: { id },
      data: {
        status: 'EMITIDA',
        numeroNF: response.data.numeroNF,
        dataEmissao: new Date(response.data.dataEmissao)
      }
    });
  } catch (error: any) {
    throw new Error(`Erro ao emitir nota: ${error.response?.status || error.message}`);
  }
};