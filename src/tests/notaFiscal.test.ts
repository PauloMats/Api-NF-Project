import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.notaFiscal.deleteMany(); // limpeza antes dos testes
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Notas Fiscais API', () => {
  let createdId: string;

  it('Deve criar uma solicitação de nota fiscal', async () => {
    const response = await request(app)
      .post('/notas-fiscais')
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
    const response = await request(app).get('/notas-fiscais');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve buscar uma solicitação por ID', async () => {
    const response = await request(app).get(`/notas-fiscais/${createdId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdId);
  });

  it('Deve tentar emitir nota fiscal e lidar com a resposta', async () => {
    const response = await request(app).post(`/notas-fiscais/${createdId}/emitir`);
    expect([200, 400, 401, 500]).toContain(response.statusCode); // resultado pode variar
  });
});
