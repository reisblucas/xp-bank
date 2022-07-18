import { PrismaClient } from '@prisma/client';
import sGenders from './Genders';
import sPlatforms from './Platforms';
import sStocksTicker from './Stocks';
import sUsers from './UsersPersonalDatas';

const prisma = new PrismaClient();

const seeders = {
  genders: sGenders,
  platforms: sPlatforms,
  users: sUsers,
  stocks: sStocksTicker,
};

function main() {
  const {
    genders, platforms, users, stocks,
  } = seeders;

  genders(prisma);
  platforms(prisma);
  users(prisma);
  stocks(prisma);
}

// // when main is async
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   }).finally(async () => prisma.$disconnect());

try {
  main();
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  const disconnect = async () => {
    await prisma.$disconnect();
  };

  disconnect().then((): void => {}).catch((e) => console.log('Error while Prisma disconnect:', e));
}
