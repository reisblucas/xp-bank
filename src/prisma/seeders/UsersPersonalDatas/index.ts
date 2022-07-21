import { PrismaClient } from '@prisma/client';
import newDateMethods from '../../../utils/newDateMethods';
import UsersPersonalData from '../../../data/seeds/UsersPersonalData.json';
import security from '../../../utils/security';
import RGs from '../../../data/seeds/RG.json';
import CPFs from '../../../data/seeds/CPF.json';
import GendersRelation from '../../../data/seeds/GendersRelation.json';
import Addresses from '../../../data/seeds/Addresses.json';
import AccessHRelations from '../../../data/seeds/AccessHRelations.json';
import WalletsName from '../../../data/seeds/WalletsName.json';
import AccountsBalance from '../../../data/seeds/AccountsBalance.json';

const { removeTZ } = newDateMethods;

// seed users: UserLogin -> AccountsBalance -> Addresses | when user signup
const sUsers = (prisma: PrismaClient) => UsersPersonalData
  .map(async (user, i) => prisma.users.create({
    data: {
      email: user.email,
      password: security.encryptAndHash(user.password),
      salt: security.salt.dynamic,
      AccountsBalance: {
        create: {
          balance: AccountsBalance[i].balance,
        },
      },
      PersonalDatas: {
        create: {
          first_name: user.first_name,
          last_name: user.last_name,
          birth_date: removeTZ(new Date(user.birth_date)), // yyyy/mm/dd -> yyyy-mm-dd
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
      Wallets: {
        create: {
          name: WalletsName[i].name,
        },
      },
    },
  }));

export default sUsers;
