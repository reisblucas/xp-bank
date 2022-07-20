import HttpException from '@utils/HttpException';
import { NextFunction, Request, Response } from 'express';

const ErrorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json(message);
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default ErrorHandler;
