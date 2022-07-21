import { PrismaClient } from '@prisma/client';

export default class StocksService {
  constructor(private prisma = new PrismaClient()) {}

  public getAllStocks = async () => this.prisma.tickers.findMany(({
    include: {
      FSExchangeOverview: {},
    },
  }));

  public getAllTickers = async () => this.prisma.stocks.findMany({
    select: {
      id: true,
      name: true,
      symbol: true,
      Tickers: {
        select: {
          ticker: true,
        },
      },
    },
  });

  public getTickerInfos = async (ticker: string) => this.prisma.tickers.findFirst({
    where: {
      ticker,
    },
    include: {
      FSExchangeOverview: {},
    },
  });

  public getAllCompaniesInfo = async () => this.prisma.stocks.findMany({
    include: {
      Tickers: {},
    },
  });

  public getCompanyInfo = async (ticker: string) => this.prisma.stocks.findFirst({
    include: {
      Tickers: {
        select: {
          id: true,
          ticker: true,
        },
      },
    },
    where: {
      Tickers: {
        some: {
          ticker,
        },
      },
    },
  });
}
