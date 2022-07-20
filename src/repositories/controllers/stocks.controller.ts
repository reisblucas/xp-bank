import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';
import StocksService from '../services/stocks.service';

class StocksController {
  constructor(private service = new StocksService()) {}

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const stocks = await this.service.getAll();
      res.status(200).json(stocks);
    } catch (e) {
      throw new HttpException(404, 'uhu');
    }
  };
}

export default new StocksController();
