import { PrismaClient } from '@prisma/client';
import HttpException from '@utils/HttpException';
import { StatusCodes } from 'http-status-codes';

export default class StocksService {
  constructor(private prisma = new PrismaClient()) {}

  public getAllStocks = async () => {
    const stocks = await this.prisma.tickers.findMany(({
      include: {
        FSExchangeOverview: {},
      },
    }));

    if (!stocks.length) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'No stocks available to get info');
    }

    return stocks;
  };

  public getAllTickers = async () => {
    const stocksByTicker = await this.prisma.stocks.findMany({
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

    if (!stocksByTicker) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Stocks not found');
    }

    return stocksByTicker;
  };

  public getTickerOverview = async (ticker: string) => {
    const tickerOverview = await this.prisma.tickers.findFirst({
      where: {
        ticker,
      },
      include: {
        FSExchangeOverview: {},
      },
    });

    if (!tickerOverview) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Ticker does not exists');
    }

    return tickerOverview;
  };

  public getAllCompaniesInfo = async () => {
    const allCompanies = await this.prisma.stocks.findMany({
      include: {
        Tickers: {},
      },
    });

    if (!allCompanies) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Companies not found');
    }

    return allCompanies;
  };

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
