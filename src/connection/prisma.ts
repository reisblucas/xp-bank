import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = prisma.usersLogin.create({
  data: {
    email: 'lucao@gmail.com',
    password: 'batatinha123',
    created_at: '',
    updated_at: '',
  },
});

export default prisma;
