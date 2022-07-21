import { Users } from '@prisma/client';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import HttpException from './HttpException';

// require('express-async-errors');

const unauthorized = (data: Users | null | boolean) => {
  if (!data) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }

  return data;
};

export default unauthorized;
