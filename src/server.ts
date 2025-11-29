import { createApp } from './app';
import { database } from './infrastructure/database/connection';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to database
    await database.connect();

    // Create and start Express app
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`\n Server running on http://localhost:${PORT}`);
      console.log(` Health check: http://localhost:${PORT}/health`);
      console.log(` API Base URL: http://localhost:${PORT}/api\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\nShutting down gracefully...');
  await database.close();
  process.exit(0);
});
