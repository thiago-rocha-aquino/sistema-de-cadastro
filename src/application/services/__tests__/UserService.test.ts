import { UserService } from '../UserService';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { ConflictError, NotFoundError, ValidationError } from '../../errors/AppError';

class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: any): Promise<User> {
    const user: User = {
      id: 'test-id',
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.users.find((u) => u.cpf === cpf) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(id: string, data: any): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;
    Object.assign(user, data, { updatedAt: new Date() });
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userService = new UserService(userRepository);
  });

  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 98765-4321',
      };

      const user = await userService.createUser(userData);

      expect(user).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
    });

    it('should throw ConflictError if email already exists', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 98765-4321',
      };

      await userService.createUser(userData);

      const duplicateData = { ...userData, cpf: '987.654.321-00' };

      await expect(userService.createUser(duplicateData)).rejects.toThrow(ConflictError);
    });

    it('should throw ConflictError if CPF already exists', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 98765-4321',
      };

      await userService.createUser(userData);

      const duplicateData = { ...userData, email: 'outro@example.com' };

      await expect(userService.createUser(duplicateData)).rejects.toThrow(ConflictError);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 98765-4321',
      };

      const createdUser = await userService.createUser(userData);
      const user = await userService.getUserById(createdUser.id);

      expect(user).toBeDefined();
      expect(user.id).toBe(createdUser.id);
    });

    it('should throw NotFoundError if user does not exist', async () => {
      await expect(userService.getUserById('non-existent-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 98765-4321',
      };

      const createdUser = await userService.createUser(userData);

      const updatedUser = await userService.updateUser(createdUser.id, {
        name: 'João Santos',
      });

      expect(updatedUser.name).toBe('João Santos');
    });

    it('should throw NotFoundError if user does not exist', async () => {
      await expect(userService.updateUser('non-existent-id', { name: 'Test' })).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cpf: '123.456.789-00',
        birthDate: '1990-01-01',
        phone: '(11) 98765-4321',
      };

      const createdUser = await userService.createUser(userData);
      await userService.deleteUser(createdUser.id);

      await expect(userService.getUserById(createdUser.id)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError if user does not exist', async () => {
      await expect(userService.deleteUser('non-existent-id')).rejects.toThrow(NotFoundError);
    });
  });
});
