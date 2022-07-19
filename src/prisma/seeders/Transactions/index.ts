import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import Transactions from '../../../data/seeds/Transactions.json';
import Orders from '../../../data/seeds/Orders.json';

const sTransactions = (prisma: PrismaClient) => Transactions
  .map(async (trsct, i) => {
    const searchTicker = await prisma.tickers.findFirst({
      where: {
        id: trsct.Tickers_id,
      },
      include: {
        FSExchangeOverview: {
          where: {
            Tickers_id: trsct.Tickers_id,
          },
        },
      },
    });

    console.log(searchTicker);
    await prisma.transactions.create({
      data: {
        Wallets_id: trsct.Wallets_id,
        Tickers_id: searchTicker?.id as number,
        quantity: trsct.quantity,
        price: searchTicker?.FSExchangeOverview[0].lastSell as Decimal,
        OperationTypes_id: trsct.OperationTypes_id,
        // Orders: {
        //   create: {
        //     UsersLogin_id: Orders[i]
        //   }
        // }
      },
    });
    return searchTicker;
  });

export default sTransactions;
