import { PrismaClient } from '@prisma/client';
import security from '../../utils/security';
import birthDate from '../../utils/birth_date';
import UsersPersonalData from '../../data/seeds/UsersPersonalData.json';
import RGs from '../../data/seeds/RG.json';
import CPFs from '../../data/seeds/CPF.json';
import Genders from '../../data/seeds/Genders.json';
import GendersRelation from '../../data/seeds/GendersRelation.json';
import Addresses from '../../data/seeds/Addresses.json';
import Platforms from '../../data/seeds/Platforms.json';
import AccessHRelations from '../../data/seeds/AccessHRelations.json';

const prisma = new PrismaClient();

function main() {
  // seed Gender
  Genders.map(async (gender) => prisma.genders.create({
    data: {
      name: gender,
    },
  }));

  // seed Plataforms
  Platforms.map(async (p) => prisma.platform.create({
    data: {
      name: p,
    },
  }));

  // seed users: UserLogin -> AccountsBalance -> Addresses | when user signup
  UsersPersonalData.map(async (user, i) => prisma.usersLogin.create({
    data: {
      email: user.email,
      password: security.encryptAndHash(user.password),
      salt: security.salt.dynamic,
      AccountsBalance: {
        create: {
          balance: 0,
        },
      },
      PersonalDatas: {
        create: {
          first_name: user.first_name,
          last_name: user.last_name,
          birth_date: birthDate.serialize(user.birth_date), // yyyy/mm/dd -> yyyy-mm-dd
          rg: RGs[i],
          cpf: CPFs[i],
          Genders_id: Number(GendersRelation[i].userRelation),
          Addresses: {
            create: {
              postal_code: Addresses[i].cep,
              logradouro: Addresses[i].logradouro,
              complement: Addresses[i].complemento,
              number: Addresses[i].numero,
              district: Addresses[i].bairro,
              city: Addresses[i].cidade,
              state: Addresses[i].estado,
              state_code: Addresses[i].estadoSigla,
            },
          },
        },
      },
      AccessHistory: {
        create: {
          Platform_id: Number(AccessHRelations[i]),
        },
      },
    },
  }));
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
