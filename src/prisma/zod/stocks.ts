import * as z from "zod"
import { CompleteTickers, RelatedTickersModel } from "./index"

export const StocksModel = z.object({
  id: z.number().int(),
  symbol: z.string(),
  name: z.string(),
  economic_sector: z.string(),
  sub_sector: z.string(),
  segment: z.string(),
  segment_b3: z.string(),
  cnpj: z.string().nullish(),
  dash_cnpj: z.string().nullish(),
})

export interface CompleteStocks extends z.infer<typeof StocksModel> {
  Tickers: CompleteTickers[]
}

/**
 * RelatedStocksModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStocksModel: z.ZodSchema<CompleteStocks> = z.lazy(() => StocksModel.extend({
  Tickers: RelatedTickersModel.array(),
}))
