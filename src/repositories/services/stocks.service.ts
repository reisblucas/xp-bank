import { PrismaClient } from '@prisma/client';

export default class StocksService {
  constructor(private prisma = new PrismaClient()) {}

  public getAll = async () => this.prisma.tickers.findMany(({
    include: {
      FSExchangeOverview: {},
      Stocks: {},
    },
  }));
}
