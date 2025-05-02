import express, { Request, Response } from 'express';
import authRoutes from './modules/auth/routes';
import itemRoutes from './modules/item/routes';
import dotenv from 'dotenv';

// read env
dotenv.config();

const app = express();
const port = Number(process.env.APP_PORT) || 3000; // pastikan number

app.use(express.json());
app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/item`, itemRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
