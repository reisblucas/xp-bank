import { z } from 'zod';

const BulkBuySellStocksDTO = z.object({
  body: z.object({
    userId: z.number({ required_error: 'User Id is required' })
      .int(),
    tickerId: z.number({ required_error: 'User Id is required' })
      .int(),
    quantity: z.number({ required_error: 'User Id is required' })
      .int().refine((v) => v > 0, 'You need provide a quantity greater than 0'),
  }),
});

export default BulkBuySellStocksDTO;
