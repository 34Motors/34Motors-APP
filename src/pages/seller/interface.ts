export interface iUser{
        id: number,
        name: string,
        email: string,
        password: string,
        cpf: string,
        birthDate: string,
        description: null,
        phone: string,
        isSeller: false,
        address: {
            id: number,
            cep: string,
            state: string,
            city: string,
            street: string,
            number: number,
            complement: null,
            userId: number
        }

}