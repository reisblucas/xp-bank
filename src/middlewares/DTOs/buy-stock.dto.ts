import { z } from 'zod';

const BulkBuySellStocksDTO = z.object({
  body: z.object({
    userId: z.number({ required_error: 'User Id is required' })
      .int(),
    tickerId: z.number({ required_error: 'User Id is required' })
      .int(),
    quantity: z.number({ required_error: 'User Id is required' })
      .int(),
  }),
});

export default BulkBuySellStocksDTO;
