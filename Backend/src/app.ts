import express from 'express';
import cookie from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

import userRouter from './infrastructure/routes/user.routes';
import { ErrorHandler } from './infrastructure/middlewares/errorHandler.middleware';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(cookie());

app.use('/users', userRouter);

app.use(ErrorHandler)

export default app;