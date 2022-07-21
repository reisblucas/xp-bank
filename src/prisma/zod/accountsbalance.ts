import { Decimal } from "@prisma/client/runtime"
import * as z from "zod"
import { CompleteUsers, RelatedUsersModel } from "./index"

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

export const AccountsBalanceModel = z.object({
  id: z.number().int(),
  Users_id: z.number().int(),
  balance: z.number(),
  updated_at: z.date(),
})

export interface CompleteAccountsBalance extends z.infer<typeof AccountsBalanceModel> {
  Users: CompleteUsers
}

/**
 * RelatedAccountsBalanceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountsBalanceModel: z.ZodSchema<CompleteAccountsBalance> = z.lazy(() => AccountsBalanceModel.extend({
  Users: RelatedUsersModel,
}))
