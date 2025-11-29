export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
}
