import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import swaggerJson from '../../swg/swagger.json';

require('express-async-errors');

const getStats = async (req: Request, res: Response) => {
  const swagger = swaggerJson;

  if (!swagger) {
    throw new HttpException(StatusCodes.BAD_REQUEST, 'Swagger Controller Service Error');
  }

  res.status(200).json(swagger);
};

const SwaggerController = { getStats };

export default SwaggerController;
