import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./config/env";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

// EXPRESS APPLICATION
const app = express();

// CORS CONFIGURATION
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);

// REQUEST PARSERS
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// STATIC FILES
app.use(express.static("public"));

// COOKIE PARSER
app.use(cookieParser());

// HEALTH CHECK
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Voltly API is running",
  });
});

// ============================================
// API ROUTES
// ============================================
app.use("/api/v1", routes);

// Error middleware must be registered last
app.use(errorMiddleware);

export default app;
