import sqlite3 from 'sqlite3';
import { promisify } from 'util';

class Database {
  private db: sqlite3.Database | null = null;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✓ Database connected successfully');
          resolve();
        }
      });
    });
  }

  getConnection(): sqlite3.Database {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  async run(sql: string, params: any[] = []): Promise<void> {
    const connection = this.getConnection();
    const runAsync = promisify(connection.run.bind(connection));
    await runAsync(sql, params);
  }

  async get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    const connection = this.getConnection();
    const getAsync = promisify(connection.get.bind(connection));
    return getAsync(sql, params) as Promise<T | undefined>;
  }

  async all<T>(sql: string, params: any[] = []): Promise<T[]> {
    const connection = this.getConnection();
    const allAsync = promisify(connection.all.bind(connection));
    return allAsync(sql, params) as Promise<T[]>;
  }

  async close(): Promise<void> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db!.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
  }
}

export const database = new Database();
