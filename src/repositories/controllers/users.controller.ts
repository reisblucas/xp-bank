import { IUserSignIn, IUserSignUp } from '@interfaces/users.interface';
import UsersService from '@services/users.service';
import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

require('express-async-errors');

class UsersController {
  constructor(private service = new UsersService()) {}

  public signUp = async (req: Request, res: Response) => {
    const isSigned = await this.service.signUp(req.body as IUserSignUp);

    res.status(StatusCodes.CREATED).json(isSigned);
  };

  public signIn = async (req: Request, res: Response) => {
    const isSigned = await this.service.signIn(req.body as IUserSignIn);

    res.status(StatusCodes.OK).json(isSigned);
  };

  public getBalance = async (req: Request, res: Response) => {
    const userId = res.locals.provider.id as number;
    if (!userId) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Provider does not exists');
    }

    const balance = await this.service.getBalance(userId);

    res.status(StatusCodes.OK).json(balance);
  };
}

export default new UsersController();
