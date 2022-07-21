import * as z from "zod"
import { CompleteAccountsBalance, RelatedAccountsBalanceModel, CompleteAccessHistory, RelatedAccessHistoryModel, CompleteAccountsStatement, RelatedAccountsStatementModel, CompleteOrders, RelatedOrdersModel, CompletePersonalDatas, RelatedPersonalDatasModel, CompleteWallets, RelatedWalletsModel } from "./index"

export const UsersModel = z.object({
  id: z.number().int(),
  email: z.string(),
  password: z.string(),
  salt: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteUsers extends z.infer<typeof UsersModel> {
  AccountsBalance: CompleteAccountsBalance[]
  AccessHistory: CompleteAccessHistory[]
  AccountsStatement: CompleteAccountsStatement[]
  Orders: CompleteOrders[]
  PersonalDatas: CompletePersonalDatas[]
  Wallets: CompleteWallets[]
}

/**
 * RelatedUsersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUsersModel: z.ZodSchema<CompleteUsers> = z.lazy(() => UsersModel.extend({
  AccountsBalance: RelatedAccountsBalanceModel.array(),
  AccessHistory: RelatedAccessHistoryModel.array(),
  AccountsStatement: RelatedAccountsStatementModel.array(),
  Orders: RelatedOrdersModel.array(),
  PersonalDatas: RelatedPersonalDatasModel.array(),
  Wallets: RelatedWalletsModel.array(),
}))
