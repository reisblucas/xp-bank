import { IUserSignUp, IUserSignIn } from '@interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import HttpException from '@utils/HttpException';
import jwt from '@utils/jwt';
import newDateMethods from '@utils/newDateMethods';
import security from '@utils/security';
import unauthorized from '@utils/unauthorized';

export default class UsersService {
  constructor(private prisma = new PrismaClient()) {}

  public signUp = async ({
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    birth_date,
    rg,
    cpf,
    // gender,
    postal_code,
    logradouro,
    complement,
    number,
    district,
    city,
    state,
    state_code,
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

    try {
      const { id } = await this.prisma.users.create({
        data: {
          email,
          password: security.encryptAndHash(password),
          salt: security.salt.dynamic,
          AccountsBalance: {
            create: {},
          },
          PersonalDatas: {
            create: {
              first_name: firstName,
              last_name: lastName,
              // change format of BR date to yyyy-mm-dd
              birth_date: newDateMethods.brFormatToDB(birth_date), // yyyy/mm/dd -> yyyy-mm-dd
              rg,
              cpf,
              // Gênero quando não informado como padrão, registra como Uninformed
              // Genders_id: Number(GendersRelation[i].userRelation),
              Addresses: {
                create: {
                  postal_code,
                  logradouro,
                  complement,
                  number,
                  district,
                  city,
                  state,
                  state_code,
                },
              },
            },
          },
          // Fazer um script para gerar um número random baseado na length das opções
          // AccessHistory: {
          //   create: {
          //     Platform_id: Number(AccessHRelations[i]),
          //   },
          // },
        },
      });
      const token = jwt.generateToken({
        id, email, firstName, lastName,
      });

      return { token };
    } catch (e) {
      if (e instanceof PrismaClientUnknownRequestError) {
        console.log('Prisma Error: ', e.message);
        throw new HttpException(400, 'Error in sign up');
      }
    }

    throw new HttpException(400, 'Server error while user sign up');
  };

  public signIn = async ({ email, password }: IUserSignIn) => {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    unauthorized(user);

    const validatePassword = security
      .validateHash(user?.password as string, password, user?.salt as string);

    unauthorized(validatePassword);

    const JWTpayload = await this.prisma.users.findFirst({
      select: {
        id: true,
        email: true,
        PersonalDatas: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
      where: {
        email,
      },
    });

    if (JWTpayload) {
      const { id, PersonalDatas: [pData] } = JWTpayload;
      const { first_name: firstName, last_name: lastName } = pData;

      const token = jwt.generateToken({
        id, email, firstName, lastName,
      });

      return { token };
    }

    console.log('Error in generate JWT');
    throw new Error();
  };
}
