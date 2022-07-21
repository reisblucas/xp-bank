import { EMAIL_REGEX } from '@utils/regex';
import { z } from 'zod';

const signUpDTO = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Can't be empty" })
      .email({ message: 'Must be a valid email' })
      .regex(EMAIL_REGEX),
    password: z
      .string()
      .min(8),
  }),
  //     first_name: z.string().min(3),
  //     last_name: z.string().min(3),
  //     birth_date: z.date(), // yyyy/mm/dd -> yyyy-mm-dd
  //     rg: z.string().min(9),
  //     cpf: z.string().min(11),
  //     Genders_id: z.string().,
  //     Addresses: {
  //       create: {
  //         postal_code: Addresses[i].cep,
  //         logradouro: Addresses[i].logradouro,
  //         complement: Addresses[i].complemento,
  //         number: Addresses[i].numero,
  //         district: Addresses[i].bairro,
  //         city: Addresses[i].cidade,
  //         state: Addresses[i].estado,
  //         state_code: Addresses[i].estadoSigla,
  //       },
  //     },
  //   },
  // },
  // AccessHistory: {
  //   create: {
  //     Platform_id: Number(AccessHRelations[i]),
  //   },
  // },
  // Wallets: {
  //   create: {
  //     name: WalletsName[i].name,
  //   },
  // },
});

export default signUpDTO;
