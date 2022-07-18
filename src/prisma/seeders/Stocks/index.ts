import { PrismaClient } from '@prisma/client';
import Stocks from '../../../data/seeds/Stocks.json';

const sStocks = (prisma: PrismaClient) => Stocks
  .map(async (stock) => prisma.stocks.create({
    data: {
      symbol: stock.cd_acao_rdz,
      name: stock.nm_empresa,
      economic_sector: stock.setor_economico,
      sub_sector: stock.subsetor,
      segment: stock.segmento,
      segment_b3: stock.segmento_b3,
      cnpj: stock.vl_cnpj,
      dash_cnpj: stock.tx_cnpj,
    },
  }));

export default sStocks;
