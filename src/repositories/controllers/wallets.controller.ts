import WalletsServices from '@services/wallets.service';
import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

require('express-async-errors');

class WalletsController {
  constructor(private service = new WalletsServices()) {}

  public getAll = async (req: Request, res: Response) => {
    const userId = res.locals?.payload?.id as number;

    if (!userId) {
      console.log('Payload does not exists');
      throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    const wallets = await this.service.getAll(userId);

    res.status(StatusCodes.OK).json(wallets);
  };
}

export default new WalletsController();
