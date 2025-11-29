export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: Date;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  birthDate: Date;
  phone: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string;
}
