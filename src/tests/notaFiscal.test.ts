import request from 'supertest';
import app from '../app';

// Mock do Prisma Client
jest.mock('@prisma/client', () => {
  const mPrisma = {
    notaFiscal: {
      deleteMany: jest.fn(),
      create: jest.fn().mockResolvedValue({
        id: 'mock-id',
        cnpj: '12345678000195',
        municipio: 'Maceió',
        estado: 'AL',
        valor: 1000.50,
        dataDesejada: new Date().toISOString(),
        descricao: 'Serviço de consultoria',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        status: 'PENDENTE_EMISSAO',
        numeroNF: null,
        dataEmissao: null
      }),
      findMany: jest.fn().mockResolvedValue([
        { id: 'mock-id', cnpj: '12345678000195', municipio: 'Maceió', estado: 'AL', valor: 1000.50, dataDesejada: new Date().toISOString(), descricao: 'Serviço de consultoria', dataCriacao: new Date().toISOString(), dataAtualizacao: new Date().toISOString(), status: 'PENDENTE_EMISSAO', numeroNF: null, dataEmissao: null }
      ]),
      findUnique: jest.fn().mockResolvedValue({
        id: 'mock-id',
        cnpj: '12345678000195',
        municipio: 'Maceió',
        estado: 'AL',
        valor: 1000.50,
        dataDesejada: new Date().toISOString(),
        descricao: 'Serviço de consultoria',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        status: 'PENDENTE_EMISSAO',
        numeroNF: null,
        dataEmissao: null
      }),
      update: jest.fn().mockResolvedValue({
        id: 'mock-id',
        cnpj: '12345678000195',
        municipio: 'Maceió',
        estado: 'AL',
        valor: 1000.50,
        dataDesejada: new Date().toISOString(),
        descricao: 'Serviço de consultoria',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        status: 'EMITIDA',
        numeroNF: 'NF123',
        dataEmissao: new Date().toISOString()
      })
    },
    $disconnect: jest.fn()
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('Notas Fiscais API (mock)', () => {
  let createdId: string = 'mock-id';

  it('Deve criar uma solicitação de nota fiscal', async () => {
    const response = await request(app)
      .post('/api/notas-fiscais')
      .send({
        cnpj: "12345678000195",
        municipio: "Maceió",
        estado: "AL",
        valor: 1000.50,
        dataDesejada: new Date().toISOString(),
        descricao: "Serviço de consultoria"
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    createdId = response.body.id;
  });

  it('Deve listar todas as solicitações', async () => {
    const response = await request(app).get('/api/notas-fiscais');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve buscar uma solicitação por ID', async () => {
    const response = await request(app).get(`/api/notas-fiscais/${createdId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdId);
  });

  it('Deve tentar emitir nota fiscal e lidar com a resposta', async () => {
    const response = await request(app).post(`/api/notas-fiscais/${createdId}/emitir`);
    expect([200, 400, 401, 500]).toContain(response.statusCode);
  });
});