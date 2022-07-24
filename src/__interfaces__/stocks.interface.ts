export interface IAllStocks extends IFSExchangeOverview {
  id: number,
  ticker: string;
  Stocks_id: number;
}

export interface IFSExchangeOverview {
  id: number;
  Tickers_id: number;
  date: string;
  lastSell: string;
  varDay: string;
  varSem: string;
  varMon: string;
  varYear: string;
  var12m: string;
  max: string;
  min: string;
  vol: number,
  lot_min: number;
}

export interface IBuySellStocks {
  tickerId: number;
  quantity: number;
}
