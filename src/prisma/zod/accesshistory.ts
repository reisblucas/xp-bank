import * as z from "zod"
import { CompleteUsers, RelatedUsersModel, CompletePlatform, RelatedPlatformModel } from "./index"

export const AccessHistoryModel = z.object({
  id: z.number().int(),
  Users_id: z.number().int(),
  Platform_id: z.number().int(),
  last_access: z.date(),
})

export interface CompleteAccessHistory extends z.infer<typeof AccessHistoryModel> {
  Users: CompleteUsers
  Platform: CompletePlatform
}

/**
 * RelatedAccessHistoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccessHistoryModel: z.ZodSchema<CompleteAccessHistory> = z.lazy(() => AccessHistoryModel.extend({
  Users: RelatedUsersModel,
  Platform: RelatedPlatformModel,
}))
