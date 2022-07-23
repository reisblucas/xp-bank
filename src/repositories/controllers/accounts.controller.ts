import { IDeposit } from '@interfaces/users.interface';
import AccountsService from '@services/accounts.service';
import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

require('express-async-errors');

class AccountsController {
  constructor(private service = new AccountsService()) {}

  public getBalance = async (_req: Request, res: Response) => {
    const userId = res.locals.provider.id as number;
    if (!userId) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Provider does not exists');
    }

    const balance = await this.service.getBalance(userId);

    res.status(StatusCodes.OK).json(balance);
  };

  public getStatement = async (_req: Request, res: Response) => {
    const userId = res.locals.provider.id as number;
    if (!userId) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Provider does not exists');
    }

    const statement = await this.service.getStatement(userId);

    res.status(StatusCodes.OK).json(statement);
  };

  public deposit = async (req: Request, res: Response) => {
    const userId = res.locals.provider.id as number;
    if (!userId) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Provider does not exists');
    }

    const deposit = await this.service.deposit(req.body as IDeposit, userId);
    // const deposit = await this.service.testUpdateWhenFieldIsZero(req.body as IDeposit, userId);

    res.status(StatusCodes.OK).json(deposit);
  };

  public withdraw = async (req: Request, res: Response) => {
    const userId = res.locals.provider.id as number;
    if (!userId) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Provider does not exists');
    }

    const withdraw = await this.service.withdraw(req.body as IDeposit, userId);
    // const withdraw = await this.service.testUpdateWhenFieldIsZero(req.body as IDeposit, userId);

    res.status(StatusCodes.OK).json(withdraw);
  };
}

export default new AccountsController();
