import { IBuySellStocks } from '@interfaces/stocks.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import Operation, { OperationId } from '@utils/operations';
import changeFormat from '@utils/dateChangeFormat';
import HttpException from '@utils/HttpException';
import newDateMethods from '@utils/newDateMethods';
import { StatusCodes } from 'http-status-codes';

export default class StocksService {
  constructor(private prisma = new PrismaClient()) {}

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
    const { tickerId, quantity } = body;

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
        id: uidToken,
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
                      Users_id: uidToken,
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
        id: uidToken,
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
      userId: uidToken,
      stockPriceUnit: stock.lastSell,
      quantity,
      transactionValue: Number(value.toFixed(2)),
      updatedBalance: Number(newBalance.toFixed(2)),
      ticker: {
        tickerId,
        symbol: ticker,
      },
    };
  };

  public sellStock = async (body: IBuySellStocks, uidToken: number) => {
    const { tickerId, quantity } = body;

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

    console.log('finStock', findStock);
    

    const findUser = await this.prisma.users.findFirst({
      where: {
        id: uidToken,
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

    console.log('finStock', findUser);

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

    const totalStocksInPortfolio = transactionsByTicker
      .reduce((prev, crr, i) => {
        if (transactionsByTicker.length === 1) {
          console.log('pai ta no if', crr.quantity);
          return -Number(crr.quantity);
        }
        if (transactionsByTicker[i].OperationTypes_id === 2) {
          console.log('to no outro if');
          return prev - Number(crr.quantity);
        }

        return prev + Number(crr.quantity);
      }, 0);

    if (quantity > totalStocksInPortfolio || totalStocksInPortfolio <= 0) {
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
                      Users_id: uidToken,
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
        id: uidToken,
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
      userId: uidToken,
      stockPriceUnit: stock.lastSell,
      quantity,
      transactionValue: Number(value.toFixed(2)), // SEND FORMATTED NUMBER TO THE CLIENT
      updatedBalance: Number(newBalance.toFixed(2)),
      ticker: {
        tickerId,
        symbol: ticker,
      },
    };
  };
}
