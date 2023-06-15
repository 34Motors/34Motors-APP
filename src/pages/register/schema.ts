import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty('adicionar um nome é obrigatório'),
    email: z.string().nonempty('adicionar e-mail é obrigatório').email('é necessário um e-mail válido'),
    password: z
        .string()
        .nonempty('adicionar uma senha é obrigatório')
        .min(8),
    confirmPassword: z.string().nonempty('As senhas não coincidem'),
    cpf: z.string().nonempty('adicionar um cpf é obrigatório'),
    birthDate: z.string().nonempty('adicionar uma data de nascimento é obrigatório'),
    description: z.string().optional(),
    phone: z.string().nonempty('Adicionar um telefone é obrigatório'),
    cep: z.string().nonempty('adicionar um cep é obrigatório'),
    state: z.string().nonempty('adicionar um estado é obrigatório'),
    city: z.string().nonempty("adicionar uma cidade é obrigatório"),
    street: z.string().nonempty('adicionar uma rua é obrigatório'),
    number: z.string().nonempty('o contato é obrigatório'),
    complement: z.string().optional(),

})

