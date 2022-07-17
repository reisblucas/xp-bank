import { createUser } from '@connection/prisma';
import express, {
  NextFunction, Request, Response, Router,
} from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
app.use(express.json());

const boiler = Router();

boiler.post('/neural', async (req: Request, res: Response, _next: NextFunction) => {
  console.log('o neural');

  const response = await createUser;

  console.log('prisma response', response);
  return res.status(StatusCodes.OK).json({ message: response });
});

app.use(boiler);

export default app;
