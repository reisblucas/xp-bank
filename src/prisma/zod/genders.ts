import * as z from "zod"
import { CompletePersonalDatas, RelatedPersonalDatasModel } from "./index"

export const GendersModel = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface CompleteGenders extends z.infer<typeof GendersModel> {
  PersonalDatas: CompletePersonalDatas[]
}

/**
 * RelatedGendersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGendersModel: z.ZodSchema<CompleteGenders> = z.lazy(() => GendersModel.extend({
  PersonalDatas: RelatedPersonalDatasModel.array(),
}))
