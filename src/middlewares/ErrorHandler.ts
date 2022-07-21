import HttpException from '@utils/HttpException';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ZodError } from 'zod';

const ErrorHandler = (err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  // if ()

  const errResponse = {
    status: err.status,
    message: err.message,
  };

  console.log(`Status: ${err.status} \nMessage: ${err.message} \nFrom: ${err.from as string}`);
  return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errResponse || ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default ErrorHandler;
