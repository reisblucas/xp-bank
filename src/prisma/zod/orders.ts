import * as z from "zod"
import { CompleteTransactions, RelatedTransactionsModel, CompleteUsers, RelatedUsersModel } from "./index"

export const OrdersModel = z.object({
  id: z.number().int(),
  Users_id: z.number().int(),
  Transactions_id: z.number().int(),
  order_executed: z.number().int().nullish(),
  created_at: z.date(),
  sale_at: z.string(),
})

export interface CompleteOrders extends z.infer<typeof OrdersModel> {
  Transactions: CompleteTransactions
  Users: CompleteUsers
}

/**
 * RelatedOrdersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrdersModel: z.ZodSchema<CompleteOrders> = z.lazy(() => OrdersModel.extend({
  Transactions: RelatedTransactionsModel,
  Users: RelatedUsersModel,
}))
