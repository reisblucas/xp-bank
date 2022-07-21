import HttpException from '@utils/HttpException';
import jwt from '@utils/jwt';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }

  const { authorization } = req.headers;

  try {
    // console.log(authorization);

    const validate = jwt.validateToken(authorization);
    res.locals.provider = validate;

    return next();
  } catch (e) {
    if (e instanceof Error) {
      console.log('Authentication error:', e.message);
      throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }
  }

  console.log('Auth middleware: \n\nFor some reason, the try-catch block has been bypassed.\n');
  throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default auth;
