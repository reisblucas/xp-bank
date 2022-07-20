import HttpException from '@utils/HttpException';
import { NextFunction, Request, Response } from 'express';

const ErrorHandler = (err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json(message);
  }

  console.log('Status:', err.status, '\nMessage:', err.message);
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default ErrorHandler;
