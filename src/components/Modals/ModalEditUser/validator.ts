import { z } from "zod";

export const editUserSchema = z.object({
  name: z.string().min(2, "Nome deve conter, pelo menos, 2 caracteres").max(127, "Máximo de 127 caracteres alcançado"),
  email: z.string().email("Deve ser um e-mail válido.").max(127, "Limite de 127 caracteres alcançado."),
  cpf: z.string().length(11, "O campo CPF deve ter 11 dígitos"),
  phone: z.string().length(11, "O telefone deve ter 11 caracteres"),
  birthDate: z.string().min(6, "Digite uma data válida, no formato DD/MM/AAAA"),
  description: z.string().nullish(),
});

export type EditUserData = z.infer<typeof editUserSchema>;
