export interface iUser{
        id: number,
        name: string,
        email: string,
        password: string,
        cpf: string,
        birthDate: string,
        description: string | null,
        phone: string,
        isSeller: boolean,
        address: {
            id: number,
            cep: string,
            state: string,
            city: string,
            street: string,
            number: number,
            complement: string | null,
            userId: number
        }

}