import axios from 'axios';
import { User, CreateUserData, UpdateUserData } from '../types/User';

const api = axios.create({
  baseURL: '/api',
});

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await api.get<{ success: boolean; data: User[] }>('/users');
    return response.data.data;
  },

  async getById(id: string): Promise<User> {
    const response = await api.get<{ success: boolean; data: User }>(`/users/${id}`);
    return response.data.data;
  },

  async create(data: CreateUserData): Promise<User> {
    const response = await api.post<{ success: boolean; data: User }>('/users', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateUserData): Promise<User> {
    const response = await api.put<{ success: boolean; data: User }>(`/users/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
