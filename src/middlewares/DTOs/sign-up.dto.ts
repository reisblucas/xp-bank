import { EMAIL_REGEX } from '@utils/regex';
import { z } from 'zod';

const signUpDTO = z.object({
  body: z.object({
    // Users
    email: z
      .string({ required_error: "Can't be empty" })
      .email({ message: 'Must be a valid email' })
      .regex(EMAIL_REGEX),
    password: z.string().min(8),
    // Personal data
    first_name: z.string().max(20),
    last_name: z.string().max(50),
    birth_date: z.string().length(10), // yyyy/mm/dd -> yyyy-mm-dd
    rg: z.string().length(9),
    cpf: z.string().length(11),
    gender: z.string().max(15),
    // Addresses
    postal_code: z.string().length(9),
    logradouro: z.string(),
    complement: z.string(),
    number: z.number().positive().min(1),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    state_code: z.string(),
    // Access History
    // Platform_id: Number(AccessHRelations[i]),
  }),
});

export default signUpDTO;
