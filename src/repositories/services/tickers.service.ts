import { PrismaClient } from '@prisma/client';
import HttpException from '@utils/HttpException';
import { StatusCodes } from 'http-status-codes';

export default class TickersService {
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

  private findOneStockWithOverview = async (tickerId: number) => this.prisma.tickers.findFirst({
    select: {
      id: true,
      ticker: true,
      FSExchangeOverview: {
        select: {
          id: true,
          vol: true,
          lastSell: true,
        },
      },
    },
    where: {
      id: tickerId,
    },
  });
}
