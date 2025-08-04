import 'dotenv/config';
import './config/firebase';
import express from 'express';
import cors from 'cors';
import incidentsRouter from './routes/incidents';
import { swaggerSpec, swaggerUi } from './config/swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/incidents', incidentsRouter);

// Routes
app.get('/', (_, res) => res.send('Backend running'));

export default app;