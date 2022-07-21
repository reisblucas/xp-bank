import * as z from "zod"
import { CompleteGenders, RelatedGendersModel, CompleteUsers, RelatedUsersModel, CompleteAddresses, RelatedAddressesModel } from "./index"

export const PersonalDatasModel = z.object({
  id: z.number().int(),
  first_name: z.string(),
  last_name: z.string(),
  cpf: z.string(),
  rg: z.string(),
  birth_date: z.string(),
  Genders_id: z.number().int(),
  Users_id: z.number().int(),
  updated_at: z.date(),
})

export interface CompletePersonalDatas extends z.infer<typeof PersonalDatasModel> {
  Genders: CompleteGenders
  Users: CompleteUsers
  Addresses: CompleteAddresses[]
}

/**
 * RelatedPersonalDatasModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPersonalDatasModel: z.ZodSchema<CompletePersonalDatas> = z.lazy(() => PersonalDatasModel.extend({
  Genders: RelatedGendersModel,
  Users: RelatedUsersModel,
  Addresses: RelatedAddressesModel.array(),
}))
