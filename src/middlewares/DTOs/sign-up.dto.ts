import newDateMethods from '@utils/newDateMethods';
import { EMAIL_REGEX } from '@utils/regex';
import { z } from 'zod';
import ValidStatesBrazil from '@data/seeds/StatesBrazil.json';

const signUpDTO = z.object({
  body: z.object({
    // Users
    email: z
      .string({ required_error: "Can't be empty" })
      .email({ message: 'Must be a valid email' })
      .regex(EMAIL_REGEX),
    password: z
      .string({ required_error: 'Password is required' })
      .min(4)
      .max(64),
    // Personal data
    first_name: z
      .string({ required_error: 'First name is required' })
      .min(2)
      .max(20),
    last_name: z
      .string({ required_error: 'Last name is required ' })
      .min(2)
      .max(50),
    birth_date: z
      .string({ required_error: 'Birth date is required ' })
      .length(10, 'Please insert a valid date, ex: dd/mm/yyyy')
      .refine(
        (date) => newDateMethods.verifySignUpAge(date),
        'You must be at least 18 years old to register',
      ),
    rg: z
      .string({ required_error: 'RG is required ' })
      .length(9, 'RG must be 9 characters length'),
    cpf: z
      .string({ required_error: 'CPF is required ' })
      .length(11, 'CPF must be 11 characters length'),
    gender: z
      .number({ required_error: 'Gender need to be a number between 1 and 6' })
      .int()
      .positive()
      .refine((v) => v > 0 || v < 7)
      .optional(),
    // Addresses
    postal_code: z
      .string({ required_error: 'Postal code is required' })
      .length(9, 'Postal code must be 9 characters length'),
    logradouro: z
      .string({ required_error: 'Logradouro is required' })
      .min(4)
      .max(20),
    complement: z.string({ required_error: 'Complement is required' }).min(3),
    number: z
      .number({ required_error: 'Number is required' })
      .positive()
      .min(1),
    district: z.string({ required_error: 'District is required' }).min(2),
    city: z.string({ required_error: 'City is required' }).min(2),
    state: z
      .string({ required_error: 'State is required' })
      .min(2)
      .refine((v) => ValidStatesBrazil
        .map((
          state,
        ) => state.nome.toLowerCase() === v.toLowerCase()), 'Need to be a Brazil valid State'),
    state_code: z
      .string({ required_error: 'State code is required' })
      .min(2)
      .refine((v) => ValidStatesBrazil
        .map((
          state,
        ) => state.uf === v.toUpperCase()), 'Need to be a Brazil valid State abbreviation'),
  }),
});

export default signUpDTO;
