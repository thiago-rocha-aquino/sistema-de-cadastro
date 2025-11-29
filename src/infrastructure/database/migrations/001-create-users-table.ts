import { database } from '../connection';

export async function up(): Promise<void> {
  await database.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      birth_date TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  console.log('✓ Migration: users table created');
}

export async function down(): Promise<void> {
  await database.run('DROP TABLE IF EXISTS users');
  console.log('✓ Migration: users table dropped');
}
