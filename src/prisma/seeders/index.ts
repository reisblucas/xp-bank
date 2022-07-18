import { PrismaClient } from '@prisma/client';
import Gender from './Genders';
import Platform from './Platforms';
import UserPersonalData from './UsersPersonalDatas';

const prisma = new PrismaClient();

function main() {
  Gender(prisma);
  Platform(prisma);
  UserPersonalData(prisma);
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
