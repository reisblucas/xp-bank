import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StocksService from '../services/stocks.service';

require('express-async-errors');

class StocksController {
  constructor(private service = new StocksService()) {}

  public getAllStocks = async (_req: Request, res: Response) => {
    const stocks = await this.service.getAllStocks();

    res.status(StatusCodes.OK).json(stocks);
  };

  public getAllTickers = async (_req: Request, res: Response) => {
    const allTickers = await this.service.getAllTickers();

    res.status(StatusCodes.OK).json(allTickers);
  };

  public getTickerOverview = async (req: Request, res: Response) => {
    const { ticker } = req.params;
    const stock = await this.service.getTickerOverview(ticker);

    res.status(StatusCodes.OK).json(stock);
  };

  public getAllCompaniesInfo = async (_req: Request, res: Response) => {
    const allCompanies = await this.service.getAllCompaniesInfo();

    res.status(StatusCodes.OK).json(allCompanies);
  };

  public getCompanyInfo = async (req: Request, res: Response) => {
    const { ticker } = req.params;
    const company = await this.service.getCompanyInfo(ticker);

    res.status(StatusCodes.OK).json(company);
  };

  public buyStock = async (req: Request, res: Response) => {
    const response = await this.service.buyStock(req.body);

    res.status(StatusCodes.OK).json(response);
  };
}

export default new StocksController();
