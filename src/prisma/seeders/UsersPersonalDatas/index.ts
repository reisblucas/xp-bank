import { PrismaClient } from '@prisma/client';
import UsersPersonalData from '../../../data/seeds/UsersPersonalData.json';
import security from '../../../utils/security';
import birthDate from '../../../utils/birth_date';
import RGs from '../../../data/seeds/RG.json';
import CPFs from '../../../data/seeds/CPF.json';
import GendersRelation from '../../../data/seeds/GendersRelation.json';
import Addresses from '../../../data/seeds/Addresses.json';
import AccessHRelations from '../../../data/seeds/AccessHRelations.json';

// seed users: UserLogin -> AccountsBalance -> Addresses | when user signup
const UserPersonalData = (prisma: PrismaClient) => UsersPersonalData
  .map(async (user, i) => prisma.usersLogin.create({
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

export default UserPersonalData;
