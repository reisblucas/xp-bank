/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import HttpException from '@utils/HttpException';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

const validate = (
  schema: AnyZodObject,
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (e) {
    if (e instanceof ZodError) {
      // make the res status be dinamycally based on ZodError
      // console.log(e.message);
      throw new HttpException(400, e.message, 'Zod Schema');
    }
    return next();
  }
};

export default validate;
