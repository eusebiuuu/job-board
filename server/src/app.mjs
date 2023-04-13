import * as dotenv from 'dotenv'
dotenv.config();
import 'express-async-errors'
import express from 'express'
import { version1Router } from './versions/api-v1.mjs';

const app = express();

app.use(express.json());
app.use('/api/v1', version1Router);

export default app;