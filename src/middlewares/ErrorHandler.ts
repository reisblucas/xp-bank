import HttpException from '@utils/HttpException';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const ErrorHandler = (err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  const errResponse = {
    status: err.status,
    message: err.message,
  };

  if (err.from?.match(/zod/i)) {
    const zodMessage = JSON.parse(err.message)[0].message as string;
    errResponse.message = zodMessage;
  }

  console.log(`Status: ${err.status} \nMessage: ${err.message} \nFrom: ${err.from as string}`);
  return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errResponse || ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default ErrorHandler;
