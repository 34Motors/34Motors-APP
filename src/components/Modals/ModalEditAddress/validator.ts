import { z } from "zod";

export const addressSchema = z.object({
  cep: z.string().length(8, "Deve conter 8 caracteres"),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  addressNumber: z.string(),
  complement: z.string(),
});

export type EditAddressData = z.infer<typeof addressSchema>;
