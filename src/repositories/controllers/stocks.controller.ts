import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StocksService from '../services/stocks.service';

class StocksController {
  constructor(private service = new StocksService()) {}

  public getAllStocks = async (_req: Request, res: Response) => {
    const stocks = await this.service.getAllStocks();

    if (!stocks.length) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'No stocks available to get info');
    }

    res.status(StatusCodes.OK).json(stocks);
  };

  public getAllTickers = async (_req: Request, res: Response) => {
    const allTickers = await this.service.getAllTickers();

    res.status(StatusCodes.OK).json(allTickers);
  };

  public getTickerInfos = async (req: Request, res: Response) => {
    const { ticker } = req.params;
    const stock = await this.service.getTickerInfos(ticker);

    if (!stock) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Ticker does not exists');
    }

    res.status(StatusCodes.OK).json(stock);
  };

  public getAllCompaniesInfo = async (_req: Request, res: Response) => {
    const allCompanies = await this.service.getAllCompaniesInfo();

    if (!allCompanies) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Companies not found');
    }

    res.status(StatusCodes.OK).json(allCompanies);
  };

  public getCompanyInfo = async (req: Request, res: Response) => {
    const { ticker } = req.params;
    const company = await this.service.getCompanyInfo(ticker);

    res.status(StatusCodes.OK).json(company);
  };
}

export default new StocksController();
