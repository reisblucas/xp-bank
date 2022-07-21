import * as z from "zod"
import { CompleteUsers, RelatedUsersModel, CompleteTransactions, RelatedTransactionsModel } from "./index"

export const WalletsModel = z.object({
  id: z.number().int(),
  name: z.string(),
  Users_id: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteWallets extends z.infer<typeof WalletsModel> {
  Users: CompleteUsers
  Transactions: CompleteTransactions[]
}

/**
 * RelatedWalletsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWalletsModel: z.ZodSchema<CompleteWallets> = z.lazy(() => WalletsModel.extend({
  Users: RelatedUsersModel,
  Transactions: RelatedTransactionsModel.array(),
}))
