import { IBuySellStocks } from '@interfaces/stocks.interface';
import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
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
    const buyDTO = req.body as IBuySellStocks;
    const uidToken = res.locals?.provider.id as number;

    if (!uidToken) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    const response = await this.service.buyStock(buyDTO, uidToken);

    res.status(StatusCodes.OK).json(response);
  };

  public sellStock = async (req: Request, res: Response) => {
    const response = await this.service.sellStock(req.body as IBuySellStocks);

    res.status(StatusCodes.OK).json(response);
  };
}

export default new StocksController();
