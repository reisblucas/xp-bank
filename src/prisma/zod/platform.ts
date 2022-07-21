import * as z from "zod"
import { CompleteAccessHistory, RelatedAccessHistoryModel } from "./index"

export const PlatformModel = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface CompletePlatform extends z.infer<typeof PlatformModel> {
  AccessHistory: CompleteAccessHistory[]
}

/**
 * RelatedPlatformModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlatformModel: z.ZodSchema<CompletePlatform> = z.lazy(() => PlatformModel.extend({
  AccessHistory: RelatedAccessHistoryModel.array(),
}))
