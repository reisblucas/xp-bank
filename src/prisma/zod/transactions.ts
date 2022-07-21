import { Decimal } from "@prisma/client/runtime"
import * as z from "zod"
import { CompleteOperationTypes, RelatedOperationTypesModel, CompleteWallets, RelatedWalletsModel, CompleteTickers, RelatedTickersModel, CompleteOrders, RelatedOrdersModel } from "./index"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const TransactionsModel = z.object({
  id: z.number().int(),
  Wallets_id: z.number().int(),
  Tickers_id: z.number().int(),
  quantity: z.number().int(),
  price: z.number(),
  OperationTypes_id: z.number().int(),
  created_at: z.date(),
})

export interface CompleteTransactions extends z.infer<typeof TransactionsModel> {
  OperationTypes: CompleteOperationTypes
  Wallets: CompleteWallets
  Tickers: CompleteTickers
  Orders: CompleteOrders[]
}

/**
 * RelatedTransactionsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTransactionsModel: z.ZodSchema<CompleteTransactions> = z.lazy(() => TransactionsModel.extend({
  OperationTypes: RelatedOperationTypesModel,
  Wallets: RelatedWalletsModel,
  Tickers: RelatedTickersModel,
  Orders: RelatedOrdersModel.array(),
}))
