import express, {
  NextFunction, Request, Response, Router,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from './connection/prisma';

const app = express();
app.use(express.json());

const boiler = Router();

boiler.post('/neural', async (req: Request, res: Response, _next: NextFunction) => {
  console.log('o neural');

  const response = await prisma.usersLogin.create({
    data: {
      email: 'lucao@gmail.com',
      password: 'batatinha123',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  console.log('prisma response', response);
  return res.status(StatusCodes.OK).json({ message: response });
});

app.use(boiler);

export default app;
