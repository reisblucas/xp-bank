import { PrismaClient } from '@prisma/client';
import sAccountsStatement from './AccountStatement';
import sGenders from './Genders';
import sOperationTypes from './OperationTypes';
import sPlatforms from './Platforms';
import sTickersStocks from './Stocks';
import sTransactions from './Transactions';
import sUsers from './UsersPersonalDatas';

const prisma = new PrismaClient();

async function main() {
  try {
    await Promise.all(sTickersStocks(prisma));
    sGenders(prisma);
    sPlatforms(prisma);
    sUsers(prisma); // userslogin, accountbalance, personaldata, accesshistory and addresses
    sOperationTypes(prisma);

    sTransactions(prisma);
    sAccountsStatement(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// when main is async
main().catch((e) => console.log('Error while is seeded:', e));
