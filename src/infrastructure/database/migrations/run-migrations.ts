import { database } from '../connection';
import * as createUsersTable from './001-create-users-table';

async function runMigrations() {
  try {
    await database.connect();
    console.log('Running migrations...');

    await createUsersTable.up();

    console.log('✓ All migrations completed successfully');
    await database.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
