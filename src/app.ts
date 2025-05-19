import express from 'express';
import dotenv from 'dotenv';
import notaFiscalRoutes from './routes/notaFiscal.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/notas-fiscais', notaFiscalRoutes);

export default app;