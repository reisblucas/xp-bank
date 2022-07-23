import { IDeposit } from '@interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import changeFormat from '@utils/dateChangeFormat';
import HttpException from '@utils/HttpException';
import newDateMethods from '@utils/newDateMethods';
import { OperationId } from '@utils/operations';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

require('express-async-errors');

export default class AccountsService {
  constructor(private prisma = new PrismaClient()) {}

  public getBalance = async (userId: number) => this.prisma
    .accountsBalance.findFirst({
      where: {
        Users_id: userId,
      },
    });

  public getStatement = async (userId: number) => {
    const statement = await this.prisma.accountsStatement
      .findMany({
        where: {
          Users_id: userId,
        },
        orderBy: {
          created_at: 'desc',
        },
      });

    return statement;
  };

  private updateAccount = (
    quantity: number,
    uidToken: number,
    op: string,
    operationType: number,
  ) => this.prisma.users
    .update({
      data: {
        AccountsBalance: {
          update: {
            data: {
              balance: {
                [op]: quantity,
              },
            },
            where: {
              id: uidToken,
            },
          },
        },
        AccountsStatement: {
          create: {
            value: quantity,
            OperationTypes_id: operationType,
            created_at: changeFormat(newDateMethods
              .removeTZ(new Date()), 'ymd'),
          },
        },
      },
      where: {
        id: uidToken,
      },
    });

  public deposit = async (body: IDeposit, uidToken: number) => {
    const { userId, quantity } = body;

    if (userId !== uidToken) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    const accId = await this.prisma.accountsBalance.findFirst({
      where: {
        Users_id: uidToken,
      },
    });

    if (!accId) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'User does not exist');
    }

    try {
      await this.prisma.$transaction(
        [this.updateAccount(quantity, uidToken, 'increment', OperationId.DEPOSIT)],
      );
    } catch (e) {
      if (e instanceof PrismaClientUnknownRequestError) {
        console.log('Error in accounts service:', e.message);
        throw new HttpException(StatusCodes.BAD_REQUEST, e.message);
      }
    }

    return {
      userId: uidToken,
      quantity,
      balance: Number(accId.balance.toFixed(2)) + quantity,
    };
  };

  public withdraw = async (body: IDeposit, uidToken: number) => {
    const { userId, quantity } = body;

    if (userId !== uidToken) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    const accId = await this.prisma.accountsBalance.findFirst({
      where: {
        Users_id: uidToken,
      },
    });

    const withdrawGreaterThanZero = (Number(accId?.balance) - quantity) < 0;
    const validateOperation = quantity > Number(accId?.balance) || withdrawGreaterThanZero;
    if (validateOperation) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'You can\'t withdraw more than you have');
    }

    if (!accId) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'User does not exist');
    }

    try {
      await this.prisma.$transaction(
        [this.updateAccount(quantity, uidToken, 'decrement', OperationId.WITHDRAW)],
      );

      return {
        userId: uidToken,
        quantity,
        balance: Number(accId.balance.toFixed(2)) - quantity,
      };
    } catch (e) {
      if (e instanceof PrismaClientUnknownRequestError) {
        console.log('Error in accounts service:', e.message);
        throw new HttpException(StatusCodes.BAD_REQUEST, e.message);
      }
    }

    throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong');
  };
}
