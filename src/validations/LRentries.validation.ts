import { z } from "zod";

export const LREntrySchema = {
    body: z.object({
  date: z
    .date()
    .optional()
    .default(() => new Date()),
  partyName: z
    .string({
      required_error: "partyName is required",
    }),
  truckNo: z
    .string({
      required_error: "truckNo is required",
    }),
  ownerName: z
    .string({
      required_error: "ownerName is required",
    }),
  fromLocation: z
    .string({
      required_error: "fromLocation is required",
    }),
  toLocation: z
    .string({
      required_error: "toLocation is required",
    }),
  weightMT: z
    .number({
      required_error: "weightMT is required",
    })
    .nonnegative(),
  billingRatePerMT: z
    .number({
      required_error: "billingRatePerMT is required",
    })
    .nonnegative(),
  totalBillingAmount: z
    .number({
      required_error: "totalBillingAmount is required",
    })
    .nonnegative(),
  lorryHireRatePerMT: z
    .number({
      required_error: "lorryHireRatePerMT is required",
    })
    .nonnegative(),
  totalLorryHire: z
    .number({
      required_error: "totalLorryHire is required",
    })
    .nonnegative(),
  isBilled: z
    .boolean()
    .optional()
    .default(false),
})
}
