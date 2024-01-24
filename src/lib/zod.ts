import { z } from "zod";

export const zInt = z
  .number()
  .int()
  .min(0)
  .or(z.string())
  .pipe(z.coerce.number().int().min(0));
