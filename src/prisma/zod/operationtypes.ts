import * as z from "zod"
import { CompleteAccountsStatement, RelatedAccountsStatementModel, CompleteTransactions, RelatedTransactionsModel } from "./index"

export const OperationTypesModel = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface CompleteOperationTypes extends z.infer<typeof OperationTypesModel> {
  AccountsStatement: CompleteAccountsStatement[]
  Transactions: CompleteTransactions[]
}

/**
 * RelatedOperationTypesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOperationTypesModel: z.ZodSchema<CompleteOperationTypes> = z.lazy(() => OperationTypesModel.extend({
  AccountsStatement: RelatedAccountsStatementModel.array(),
  Transactions: RelatedTransactionsModel.array(),
}))
