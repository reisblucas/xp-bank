import { PrismaClient } from '@prisma/client';
import HttpException from '@utils/HttpException';
import { StatusCodes } from 'http-status-codes';

export default class CompaniesService {
  constructor(private prisma = new PrismaClient()) {}

  public getAllCompaniesInfo = async () => {
    const allCompanies = await this.prisma.stocks.findMany({
      include: {
        Tickers: {},
      },
    });

    if (!allCompanies) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Companies not found');
    }

    return allCompanies;
  };

  public getCompanyInfo = async (ticker: string) => {
    const company = await this.prisma.stocks.findFirst({
      include: {
        Tickers: {
          select: {
            id: true,
            ticker: true,
          },
        },
      },
      where: {
        Tickers: {
          some: {
            ticker,
          },
        },
      },
    });

    if (!company) {
      throw new HttpException(404, `Does not exists companies with this symbol ${ticker}`);
    }

    return company;
  };
}
