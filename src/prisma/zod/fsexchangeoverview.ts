import { Decimal } from "@prisma/client/runtime"
import * as z from "zod"
import { CompleteTickers, RelatedTickersModel } from "./index"

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

export const FSExchangeOverviewModel = z.object({
  id: z.number().int(),
  Tickers_id: z.number().int(),
  date: z.string(),
  lastSell: z.number(),
  varDay: z.number(),
  varSem: z.number(),
  varMon: z.number(),
  varYear: z.number(),
  var12m: z.number(),
  max: z.number(),
  min: z.number(),
  vol: z.number().int(),
  lot_min: z.number().int(),
})

export interface CompleteFSExchangeOverview extends z.infer<typeof FSExchangeOverviewModel> {
  Tickers: CompleteTickers
}

/**
 * RelatedFSExchangeOverviewModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFSExchangeOverviewModel: z.ZodSchema<CompleteFSExchangeOverview> = z.lazy(() => FSExchangeOverviewModel.extend({
  Tickers: RelatedTickersModel,
}))
