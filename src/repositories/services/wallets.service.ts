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
      where: {
        Users_id: {
          equals: userId,
        },
        AND: {
          name: {
            in: walletName,
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
