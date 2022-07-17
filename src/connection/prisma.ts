import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = prisma.usersLogin.create({
  data: {
    email: 'lucaess@gmail.com',
    password: 'testando123',
    AccountsBalance: {
      create: {
        balance: 0,
      },
    },
  },
});

export default prisma;
