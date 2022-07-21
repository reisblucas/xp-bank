import { PrismaClient } from '@prisma/client';
import HttpException from '@utils/HttpException';
import { StatusCodes } from 'http-status-codes';

export default class WalletsServices {
  constructor(private prisma = new PrismaClient()) {}

  public getAll = async (userId: number) => {
    const wallets = await this.prisma.wallets.findMany({
      where: {
        Users_id: {
          equals: userId,
        },
      },
    });

    if (!wallets.length) { return []; }

    return wallets;
  };

  public getOne = async (userId: number, walletName: string) => {
    const wallet = await this.prisma.wallets.findFirst({
      select: {
        id: true,
        name: true,
        Users_id: true,
        Transactions: {
          include: {
            Tickers: {
              select: {
                ticker: true,
              },
            },
          },
          orderBy: {
            created_at: 'desc',
          },
        },
      },
      where: {
        Users_id: {
          equals: userId,
        },
        AND: {
          name: {
            equals: walletName,
          },
        },
      },
    });

    if (!wallet) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Wallet with this name does not exists');
    }

    return wallet;
  };
}
