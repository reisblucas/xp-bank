import HttpException from '@utils/HttpException';
import { NextFunction, Request, Response } from 'express';

const idParameter = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!Number.isNaN(+id)) {
    return next();
  }

  throw new HttpException(400, 'Id provided need to be a number');
};

export default idParameter;
