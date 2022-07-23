import { z } from 'zod';

const BuySellDTO = z.object({
  body: z.object({
    userId: z.number({ required_error: 'User id is required' })
      .int().refine((v) => v > 0),
    quantity: z.number({ required_error: 'User id is required' })
      .int().refine((v) => v > 0),
  }),
});

export default BuySellDTO;
