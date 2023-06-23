export interface iUserBody{
    name: string,
    email: string,
    complement?: string ,
    description?: string ,
    password: string,
    confirmPassword: string
    cpf: string,
    birthDate: string,
    phone: string,
    isSeller: boolean,
    id: number,
    cep: string,
    state: string,
    city: string,
    street: string,
    number: number,
    userId: number
}

export interface iUserComplete {
    name: string,
    email: string,
    description?: string ,
    password: string,
    confirmPassword: string
    cpf: string,
    birthDate: string,
    phone: string,
    isSeller: boolean,
    id: number,
    address: iAddressBody
  }

export interface iAddressBody {
    id: number,
    cep: string,
    state: string,
    complement?: string ,
    city: string,
    street: string,
    number: number,
    userId: number
}