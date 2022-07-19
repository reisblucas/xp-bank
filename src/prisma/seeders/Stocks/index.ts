import { PrismaClient } from '@prisma/client';
import Stocks from '../../../data/seeds/Stocks.json';
import SerializedInfoMoney from '../../../data/seeds/SerializedInfoMoney.json';

export const OnlyStocksProvidedByInfoMoney = Stocks.filter(({ cd_acao }) => SerializedInfoMoney
  .find(({ ticker }) => cd_acao.includes(ticker)));

const sTickersStocks = (prisma: PrismaClient) => OnlyStocksProvidedByInfoMoney
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

    // this trick is used becasue of unique constraint setted in my schema
    // unique ticker and some stocks in my seeder are emprty strings
    // example -> cd_acao: ""
    if (stock.cd_acao) {
      stock.cd_acao
        .split(', ')
        .map((tckr) => SerializedInfoMoney
          .find(({ ticker }) => tckr === ticker)
            && SerializedInfoMoney
              .filter(({ ticker }) => tckr === ticker)
              .map(async ({
                ticker, date, lastSell, max, min, var12m, varDay, varMon, varSem, varYear, vol,
              }) => prisma.tickers.create({
                data: {
                  ticker,
                  Stocks_id: createdStock.id,
                  FSExchangeOverview: {
                    create: {
                      date,
                      lastSell,
                      varDay,
                      varSem,
                      varMon,
                      varYear,
                      var12m,
                      max,
                      min,
                      vol,
                    },
                  },
                },
              })));
    }
    return createdStock;
  });

export default sTickersStocks;
