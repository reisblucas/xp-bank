import { Decimal } from "@prisma/client/runtime"
import * as z from "zod"
import { CompleteOperationTypes, RelatedOperationTypesModel, CompleteUsers, RelatedUsersModel } from "./index"

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

export const AccountsStatementModel = z.object({
  id: z.number().int(),
  value: z.number(),
  Users_id: z.number().int(),
  OperationTypes_id: z.number().int(),
  created_at: z.string(),
})

export interface CompleteAccountsStatement extends z.infer<typeof AccountsStatementModel> {
  OperationTypes: CompleteOperationTypes
  Users: CompleteUsers
}

/**
 * RelatedAccountsStatementModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountsStatementModel: z.ZodSchema<CompleteAccountsStatement> = z.lazy(() => AccountsStatementModel.extend({
  OperationTypes: RelatedOperationTypesModel,
  Users: RelatedUsersModel,
}))
