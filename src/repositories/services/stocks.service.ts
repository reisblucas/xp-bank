import { IBuySellStocks } from '@interfaces/stocks.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import Operation, { OperationId } from '@utils/operations';
import changeFormat from '@utils/dateChangeFormat';
import HttpException from '@utils/HttpException';
import newDateMethods from '@utils/newDateMethods';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

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

  public getCompanyInfo = async (ticker: string) => {
    const company = await this.prisma.stocks.findFirst({
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

    if (!company) {
      throw new HttpException(404, `Does not exists companies with this symbol ${ticker}`);
    }

    return company;
  };

  private updateBroker = (qnt: number, tickerId: number, operation: string) => {
    const response = this
      .prisma.fSExchangeOverview.update({
        data: {
          vol: {
            [operation]: qnt,
          },
        },
        where: {
          id: tickerId,
        },
      });

    return response;
  };

  public buyStock = async (body: IBuySellStocks, uidToken: number) => {
    const { userId, tickerId, quantity } = body;

    if (userId !== uidToken) {
      throw new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.UNAUTHORIZED);
    }

    // confirmation to the user in client side
    const findStock = await this.prisma.tickers.findFirst({
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

    const findUser = await this.prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        Wallets: {
          include: {
            Transactions: true,
          },
        },
        AccountsBalance: true,
        Orders: true,
        AccountsStatement: true,
      },
    });

    if (!findStock) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Something went wrong, stock not found');
    }

    const { FSExchangeOverview: [stock], ticker } = findStock;
    if (stock.vol < quantity || stock.vol - quantity < 0) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        'You can\'t buy more than avaiable in broker',
      );
    }

    if (!findUser) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Something went wrong, user not found');
    }

    const {
      AccountsBalance: [Account],
      Wallets: [wallets],
    } = findUser;

    const value = Operation('multiply')(stock.lastSell, quantity);
    const validateBalance = Number(Account.balance) >= value;

    if (!validateBalance) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'User does not have sufficient balance to fullfill the request',
      );
    }

    // stock -> id, vol and if exists
    // validations: account balance & FSExchangeOverview
    // where to bulk: transactions, which wallet, orders, accountStatement, operationtype, balance
    const newBalance = Operation('sub')(Account.balance, value);

    const buyProcess = this.prisma.users.update({
      data: {
        // wallets
        Wallets: {
          update: {
            data: {
              updated_at: new Date(),
              // transaction
              Transactions: {
                create: {
                  Tickers_id: tickerId,
                  quantity,
                  price: value,
                  OperationTypes_id: OperationId.BUY, // refers to Buy
                  // orders
                  Orders: {
                    create: {
                      Users_id: userId,
                      sale_at: newDateMethods.Dplus2(),
                    },
                  },
                },
              },
            },
            where: {
              id: wallets.id,
            },
          },
        },
        AccountsStatement: {
          create: {
            value,
            OperationTypes_id: OperationId.BUY,
            created_at: changeFormat(newDateMethods
              .removeTZ(new Date()), 'ymd'),
          },
        },
        AccountsBalance: {
          update: {
            data: {
              balance: {
                decrement: value,
              },
            },
            where: {
              id: Account.id,
            },
          },
        },
      },
      where: {
        id: userId,
      },
    });

    try {
      await this.prisma
        .$transaction(
          [buyProcess, this.updateBroker(quantity, stock.id, 'decrement')],
        );
    } catch (e) {
    // Errors to rollback
      if (e instanceof PrismaClientValidationError) {
        console.log(e.message);
      }
    }

    return {
      userId,
      quantity,
      stockPriceUnit: stock.lastSell,
      buyValue: Number(value.toFixed(2)),
      balance: Number(newBalance.toFixed(2)),
      ticker: {
        tickerId,
        symbol: ticker,
      },
    };
  };

  public sellStock = async (body: IBuySellStocks, uidToken: number) => {
    const { userId, tickerId, quantity } = body;

    if (userId !== uidToken) {
      throw new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.UNAUTHORIZED);
    }

    // confirmation to the user in client side
    const findStock = await this.prisma.tickers.findFirst({
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

    const findUser = await this.prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        Wallets: {
          include: {
            Transactions: true,
          },
        },
        AccountsBalance: true,
        Orders: true,
        AccountsStatement: true,
      },
    });

    if (!findStock) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Something went wrong, stock not found');
    }

    // Stocks need to be based in all stocks transactions to be removed
    const { FSExchangeOverview: [stock], ticker } = findStock;

    if (!findUser) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Something went wrong, user not found');
    }

    const {
      AccountsBalance: [Account],
      Wallets: [wallets],
    } = findUser;

    const { Transactions } = wallets;

    const transactionsByTicker = Transactions
      .filter((t) => t.Tickers_id === tickerId);

    // NEED TO VALIDATE THE CLIENT WALLET
    const totalStocksInPortfolio = transactionsByTicker
      .reduce((prev, crr) => prev + crr.quantity, 0);

    if (quantity > totalStocksInPortfolio) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'You can\'t sell more stocks than you have');
    }

    const value = Operation('multiply')(stock.lastSell, quantity);
    const newBalance = Operation('sum')(Account.balance, value);

    // stock -> id, vol and if exists
    // validations: account balance & FSExchangeOverview
    // where to bulk: transactions, which wallet, orders, accountStatement, operationtype, balance

    const updateVolume = this.prisma.users.update({
      data: {
        // wallets
        Wallets: {
          update: {
            data: {
              updated_at: new Date(),
              // transaction
              Transactions: {
                create: {
                  Tickers_id: tickerId,
                  quantity, // MUDAR AQUI
                  price: value,
                  OperationTypes_id: OperationId.SELL, // refers to Sell
                  // orders
                  Orders: {
                    create: {
                      Users_id: userId,
                      sale_at: newDateMethods.Dplus2(),
                    },
                  },
                },
              },
            },
            where: {
              id: wallets.id,
            },
          },
        },
        AccountsStatement: {
          create: {
            value, // MUDAR AQUI
            OperationTypes_id: OperationId.SELL,
            created_at: changeFormat(newDateMethods
              .removeTZ(new Date()), 'ymd'),
          },
        },
        AccountsBalance: {
          update: {
            data: {
              balance: {
                increment: value,
              },
            },
            where: {
              id: Account.id,
            },
          },
        },
      },
      where: {
        id: userId,
      },
    });

    try {
      await this.prisma
        .$transaction(
          [
            updateVolume,
            this.updateBroker(quantity, tickerId, 'increment'),
          ],
        );
    } catch (e) {
    // Errors to rollback
      if (e instanceof PrismaClientValidationError) {
        console.log(e.message);
      }
    }

    return {
      userId,
      quantity,
      stockPriceUnit: stock.lastSell,
      sellTotal: Number(value.toFixed(2)), // SEND FORMATTED NUMBER TO THE CLIENT
      balance: Number(newBalance.toFixed(2)),
      ticker: {
        tickerId,
        symbol: ticker,
      },
    };
  };
}
