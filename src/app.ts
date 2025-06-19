import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { healthRouter } from './routes/health.route';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);

app.use(errorHandler);

export default app;