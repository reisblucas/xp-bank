import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import StocksService from '../services/stocks.service';

class StocksController {
  constructor(private service = new StocksService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const stocks = await this.service.getAll();

    if (!stocks.length) {
      throw new HttpException(404, 'No stocks available to get info');
    }

    res.status(200).json(stocks);
  };
}

export default new StocksController();
