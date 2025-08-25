import express from "express";
import databaseConnect from "./config/database";
import webhookRouter from './routes'

const app = express()
app.use(express.json())
app.use('/api/v1', webhookRouter)

const port = process.env.PORT;

const startServer = async (): Promise<void> => {
  await databaseConnect();
  // schedularKora.start();

    app.listen(port, () => {
    console.log(`Server started listening on ${port}`);
  });
};

const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  try {
    // schedularKora.stop();
    console.log('Server closed gracefully');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();