import { IDeposit } from '@interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import changeFormat from '@utils/dateChangeFormat';
import HttpException from '@utils/HttpException';
import newDateMethods from '@utils/newDateMethods';
import { OperationId } from '@utils/operations';
import { StatusCodes } from 'http-status-codes';

require('express-async-errors');

const { removeTZ } = newDateMethods;

export default class AccountsService {
  constructor(private prisma = new PrismaClient()) {}

  public getBalance = async (userId: number) => {
    const balance = await this.prisma
      .accountsBalance.findFirst({
        where: {
          Users_id: userId,
        },
      });

    if (!balance) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'User not found in db');
    }

    return {
      balanceId: balance.id,
      userId: balance.Users_id,
      updatedAt: changeFormat(removeTZ(balance.updated_at), 'ymd'),
    };
  };

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

    if (!statement) {
      return [];
    }

    const normalizeStatement = statement.map((
      {
        id, value, Users_id, OperationTypes_id, created_at,
      },
    ) => ({
      userId: Users_id,
      statementId: id,
      value,
      operationTypeId: OperationTypes_id,
      created_at,
    }));

    return normalizeStatement;
  };

  private updateAccount = (
    quantity: number,
    uidToken: number,
    accId: number,
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
              id: accId,
            },
          },
        },
        AccountsStatement: {
          create: {
            value: quantity,
            OperationTypes_id: operationType,
            created_at: new Date().toISOString(),
          },
        },
      },
      where: {
        id: uidToken,
      },
    });

  public deposit = async (body: IDeposit, uidToken: number) => {
    const { quantity } = body;

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
        [this.updateAccount(quantity, uidToken, accId.id, 'increment', OperationId.DEPOSIT)],
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
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
    const { quantity } = body;

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
        [this.updateAccount(quantity, uidToken, accId.id, 'decrement', OperationId.WITHDRAW)],
      );

      return {
        userId: uidToken,
        quantity,
        balance: Number(accId.balance.toFixed(2)) - quantity,
      };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        console.log('Error in accounts service:', e.message);
        throw new HttpException(StatusCodes.BAD_REQUEST, e.message);
      }
    }

    throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong');
  };
}
