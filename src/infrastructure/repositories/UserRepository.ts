import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, CreateUserDTO, UpdateUserDTO } from '../../domain/entities/User';
import { database } from '../database/connection';
import { randomUUID } from 'crypto';

interface UserRow {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export class UserRepository implements IUserRepository {
  private mapRowToUser(row: UserRow): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      cpf: row.cpf,
      birthDate: new Date(row.birth_date),
      phone: row.phone,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  async create(data: CreateUserDTO): Promise<User> {
    const id = randomUUID();
    const now = new Date().toISOString();

    await database.run(
      `INSERT INTO users (id, name, email, cpf, birth_date, phone, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, data.name, data.email, data.cpf, data.birthDate.toISOString(), data.phone, now, now]
    );

    return {
      id,
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      birthDate: data.birthDate,
      phone: data.phone,
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };
  }

  async findById(id: string): Promise<User | null> {
    const row = await database.get<UserRow>('SELECT * FROM users WHERE id = ?', [id]);
    return row ? this.mapRowToUser(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await database.get<UserRow>('SELECT * FROM users WHERE email = ?', [email]);
    return row ? this.mapRowToUser(row) : null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const row = await database.get<UserRow>('SELECT * FROM users WHERE cpf = ?', [cpf]);
    return row ? this.mapRowToUser(row) : null;
  }

  async findAll(): Promise<User[]> {
    const rows = await database.all<UserRow>('SELECT * FROM users ORDER BY created_at DESC');
    return rows.map((row) => this.mapRowToUser(row));
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    const updatedAt = new Date().toISOString();
    const updates: string[] = [];
    const params: any[] = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      params.push(data.name);
    }
    if (data.email !== undefined) {
      updates.push('email = ?');
      params.push(data.email);
    }
    if (data.phone !== undefined) {
      updates.push('phone = ?');
      params.push(data.phone);
    }

    if (updates.length === 0) return user;

    updates.push('updated_at = ?');
    params.push(updatedAt, id);

    await database.run(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) return false;

    await database.run('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }
}
