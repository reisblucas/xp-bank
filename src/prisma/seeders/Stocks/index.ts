import { PrismaClient } from '@prisma/client';
import Stocks from '../../../data/seeds/Stocks.json';

const sStocks = (prisma: PrismaClient) => Stocks
  .map(async (stock) => prisma.stocks.create({
    data: {
      name: stock.nm_empresa,
      symbol: stock.cd_acao_rdz,
    },
  }));

export default sStocks;
