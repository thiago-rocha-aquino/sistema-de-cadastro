import { z } from 'zod';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(100),
  email: z.string().email('Email inválido'),
  cpf: z.string().regex(cpfRegex, 'CPF deve estar no formato 000.000.000-00'),
  birthDate: z.string().transform((val) => {
    const date = new Date(val);
    if (isNaN(date.getTime())) {
      throw new Error('Data de nascimento inválida');
    }
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    if (age < 0 || age > 150) {
      throw new Error('Data de nascimento inválida');
    }
    return date;
  }),
  phone: z.string().regex(phoneRegex, 'Telefone deve estar no formato (00) 00000-0000'),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.string().email('Email inválido').optional(),
  phone: z.string().regex(phoneRegex, 'Telefone deve estar no formato (00) 00000-0000').optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
