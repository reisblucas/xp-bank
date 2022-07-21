import * as z from "zod"
import { CompletePersonalDatas, RelatedPersonalDatasModel } from "./index"

export const AddressesModel = z.object({
  id: z.number().int(),
  PersonalDatas_id: z.number().int(),
  postal_code: z.string(),
  logradouro: z.string(),
  complement: z.string(),
  number: z.number().int(),
  city: z.string(),
  district: z.string(),
  state: z.string(),
  state_code: z.string(),
  country: z.string(),
  updated_at: z.date(),
})

export interface CompleteAddresses extends z.infer<typeof AddressesModel> {
  PersonalDatas: CompletePersonalDatas
}

/**
 * RelatedAddressesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAddressesModel: z.ZodSchema<CompleteAddresses> = z.lazy(() => AddressesModel.extend({
  PersonalDatas: RelatedPersonalDatasModel,
}))
