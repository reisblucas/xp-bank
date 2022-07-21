import * as z from "zod"
import { CompleteStocks, RelatedStocksModel, CompleteTransactions, RelatedTransactionsModel, CompleteFSExchangeOverview, RelatedFSExchangeOverviewModel } from "./index"

export const TickersModel = z.object({
  id: z.number().int(),
  ticker: z.string(),
  Stocks_id: z.number().int(),
})

export interface CompleteTickers extends z.infer<typeof TickersModel> {
  Stocks: CompleteStocks
  Transactions: CompleteTransactions[]
  FSExchangeOverview: CompleteFSExchangeOverview[]
}

/**
 * RelatedTickersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTickersModel: z.ZodSchema<CompleteTickers> = z.lazy(() => TickersModel.extend({
  Stocks: RelatedStocksModel,
  Transactions: RelatedTransactionsModel.array(),
  FSExchangeOverview: RelatedFSExchangeOverviewModel.array(),
}))
