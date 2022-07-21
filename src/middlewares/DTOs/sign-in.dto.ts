import { EMAIL_REGEX } from '@utils/regex';
import { z } from 'zod';

const signInDTO = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Can't be empty" })
      .email({ message: 'Must be a valid email' })
      .regex(EMAIL_REGEX),
    password: z.string().min(4),
  }),
});

export default signInDTO;
