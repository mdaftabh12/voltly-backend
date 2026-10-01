import app from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(env.port, "0.0.0.0", () => {
    console.log(`Voltly server running on port ${env.port}`);
  });
};

startServer();
