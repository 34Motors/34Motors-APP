export interface iUserBody {
  name: string;
  email: string;
  complement?: string;
  description?: string;
  password: string;
  userColor: number;
  confirmPassword: string;
  cpf: string;
  birthDate: string;
  phone: string;
  isSeller: boolean;
  id: number;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  userId: number;
}

export interface iUserComplete {
  id: number;
  name: string;
  email: string;
  description?: string;
  password: string;
  confirmPassword: string;
  userColor: string;
  cpf: string;
  birthDate: string;
  phone: string;
  isSeller: boolean;
  address: iAddressBody;
}

export interface iAddressBody {
  id: number;
  cep: string;
  state: string;
  complement?: string;
  city: string;
  street: string;
  number: number;
  userId: number;
}
