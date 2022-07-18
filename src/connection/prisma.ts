import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = prisma.usersLogin.create({
  data: {
    email: 'lucas@gmail.com',
    password: 'testando123',
    salt: 'uhu',
    AccountsBalance: {
      create: {
        balance: 0,
      },
    },
  },
});

export default prisma;
