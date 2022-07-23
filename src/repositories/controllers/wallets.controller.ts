import WalletsServices from '@services/wallets.service';
import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

require('express-async-errors');

class WalletsController {
  constructor(private service = new WalletsServices()) {}

  public getAll = async (_req: Request, res: Response) => {
    const userId = res.locals.provider.id as number;

    if (!userId) {
      console.log('Payload does not exists');
      throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    const wallets = await this.service.getAll(userId);

    res.status(StatusCodes.OK).json(wallets);
  };

  public getOne = async (req: Request, res: Response) => {
    const userId = res.locals.provider.id as number;
    const { walletName } = req.params;

    if (!userId) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    const wallet = await this.service.getOne(userId, walletName);

    res.status(StatusCodes.OK).json(wallet);
  };
}

export default new WalletsController();
