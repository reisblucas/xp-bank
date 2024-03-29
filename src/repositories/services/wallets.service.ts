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

    const walletNormalized = wallets
      .map((wll) => ({
        userId: wll.Users_id,
        walletId: wll.id,
        name: wll.name,
        createdAt: wll.created_at,
        updatedAt: wll.updated_at,
      }));

    return walletNormalized;
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

    const { Transactions } = wallet;
    const transactionsNormalized = Transactions.map(({
      id, Wallets_id, Tickers_id, price, quantity, created_at, OperationTypes_id, Tickers,
    }) => ({
      transactionId: id,
      walletId: Wallets_id,
      tickerId: Tickers_id,
      symbol: Tickers.ticker,
      quantity,
      price,
      operationType: OperationTypes_id,
      createdAt: created_at,
    }));

    const walletNormalized = {
      userId: wallet.Users_id,
      walletId: wallet.id,
      name: wallet.name,
      transactions: transactionsNormalized,
    };

    return walletNormalized;
  };
}
