import { PrismaClient } from '@prisma/client';
import tickerSplitter from '../../../utils/splitStock';
import Stocks from '../../../data/seeds/Stocks.json';

const sStocksTicker = (prisma: PrismaClient) => Stocks
  .map(async (stock) => {
    const createdStock = await prisma.stocks.create({
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
    });

    if (stock.cd_acao) {
      // this trick is used becasue of unique constraint setted in my schema
      // unique ticker and some stocks in my seeder are emprty strings
      // example -> cd_acao: ""
      tickerSplitter(stock.cd_acao)
        .map(async (tckr) => prisma.tickers.create({
          data: {
            ticker: tckr,
            Stocks_id: createdStock.id,
          },
        }));
    }

    return createdStock;
  });

export default sStocksTicker;
