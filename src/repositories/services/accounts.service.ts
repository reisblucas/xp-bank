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

  private updateAccount = (quantity: number, uidToken: number, op: string) => this.prisma.users
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
            OperationTypes_id: OperationId.DEPOSIT,
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

    if (userId === uidToken) {
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
        [this.updateAccount(quantity, uidToken, 'increment')],
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
    };
  };
}
