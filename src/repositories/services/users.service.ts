import { IUserSignUp } from '@interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import HttpException from '@utils/HttpException';
import security from '@utils/security';

export default class UsersService {
  constructor(private prisma = new PrismaClient()) {}

  public signUp = async ({
    email, password,
  }: IUserSignUp) => {
    const userAlreadyExists = await this.prisma.users
      .findUnique({
        select: {
          id: true,
          email: true,
        },
        where: {
          email,
        },
      });

    if (userAlreadyExists) {
      throw new HttpException(400, 'User already exists');
    }

    return this.prisma.users.create({
      data: {
        email,
        password: security.encryptAndHash(password),
        salt: security.salt.dynamic,
      },
    });
  };
}
