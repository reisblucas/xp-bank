import { PrismaClient } from '@prisma/client';
import UsersPersonalData from '../../data/seeds/UsersPersonalData.json';

const prisma = new PrismaClient();

function main() {
  const userBalanceSeeder = UsersPersonalData.map(async (user, _i) => prisma.usersLogin.create({
    data: {
      email: user.email,
      password: user.password,
      AccountsBalance: {
        create: {
          balance: 0,
        },
      },
    },
  }));

  Promise.all(userBalanceSeeder).catch((e) => console.log('userBalanceSeeder: ', e));
}

try {
  main();
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  const disconnect = async () => {
    await prisma.$disconnect();
  };

  disconnect();
}
