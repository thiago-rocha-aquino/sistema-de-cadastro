import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, CreateUserDTO, UpdateUserDTO } from '../../domain/entities/User';
import { ValidationError, NotFoundError, ConflictError } from '../errors/AppError';
import { createUserSchema, updateUserSchema } from '../validators/userValidator';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: any): Promise<User> {
    // Validação
    const validatedData = createUserSchema.parse(data);

    // Verificar se email já existe
    const existingEmail = await this.userRepository.findByEmail(validatedData.email);
    if (existingEmail) {
      throw new ConflictError('Email já cadastrado');
    }

    // Verificar se CPF já existe
    const existingCpf = await this.userRepository.findByCpf(validatedData.cpf);
    if (existingCpf) {
      throw new ConflictError('CPF já cadastrado');
    }

    const createUserDTO: CreateUserDTO = {
      name: validatedData.name,
      email: validatedData.email,
      cpf: validatedData.cpf,
      birthDate: validatedData.birthDate,
      phone: validatedData.phone,
    };

    return this.userRepository.create(createUserDTO);
  }

  async getUserById(id: string): Promise<User> {
    if (!id) {
      throw new ValidationError('ID é obrigatório');
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, data: any): Promise<User> {
    if (!id) {
      throw new ValidationError('ID é obrigatório');
    }

    const validatedData = updateUserSchema.parse(data);

    // Verificar se usuário existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundError('Usuário não encontrado');
    }

    // Se está atualizando email, verificar se já existe
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailExists = await this.userRepository.findByEmail(validatedData.email);
      if (emailExists) {
        throw new ConflictError('Email já cadastrado');
      }
    }

    const updateUserDTO: UpdateUserDTO = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
    };

    const updatedUser = await this.userRepository.update(id, updateUserDTO);
    if (!updatedUser) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new ValidationError('ID é obrigatório');
    }

    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError('Usuário não encontrado');
    }
  }
}
