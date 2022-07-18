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

  try {
    const response = await createUser;
    console.log('prisma response', response);
    return res.status(StatusCodes.OK).json({ message: response });
  } catch (e) {
    let error = e;
    if (e instanceof Error) {
      error = e.message;
    }
    console.log('alo', error);

    return res.status(StatusCodes.BAD_REQUEST).json({ nessage: 'error' });
  }
});

app.use(boiler);

export default app;
