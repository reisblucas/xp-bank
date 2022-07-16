import express, {
  NextFunction, Request, Response, Router,
} from 'express';

const app = express();
app.use(express.json());

const boiler = Router();

boiler.get('/neural', (req: Request, res: Response, _next: NextFunction) => {
  console.log('o neural');

  return res.status(200).json({ message: 'passei por aqui' });
});

app.use(boiler);

export default app;
