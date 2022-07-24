import { z } from 'zod';

const DepositWithdrawDTO = z.object({
  body: z.object({
    quantity: z.number({ required_error: 'User id is required' })
      .int().refine((v) => v > 0),
  }),
});

export default DepositWithdrawDTO;
