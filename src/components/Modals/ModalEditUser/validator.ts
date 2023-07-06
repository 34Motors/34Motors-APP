import { z } from "zod";

export const editUserSchema = z.object({
  name: z.string().nullish(),
  email: z.string().nullish(),
  cpf: z.string().nullish(),
  phone: z.string().nullish(),
  birthDate: z.string().nullish(),
  description: z.string().nullish(),
});

export type EditUserData = z.infer<typeof editUserSchema>;
