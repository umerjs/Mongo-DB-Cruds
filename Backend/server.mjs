import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect_db } from "./libs/mongodb.mjs";
import { postRoutes } from "./routes/index.mjs";

const app = express();
const port = Number(process.env.PORT) || 2002;

const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    process.env.VITE_FRONTEND_URL,
    "http://localhost:3003",
    "http://127.0.0.1:3003",
  ].filter(Boolean),
);

app.use(express.json());

const isAllowedOrigin = (origin) => {
  if (!origin || allowedOrigins.has(origin)) return true;

  try {
    const hostname = new URL(origin).hostname;
    return hostname.endsWith(".vercel.app") ||
      hostname.endsWith(".vercel.run") ||
      hostname.endsWith(".vusercontent.net") ||
      hostname.endsWith(".v0.build");
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      // Non-browser requests do not send an Origin header.
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS origin not allowed: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req, res) => {
  res.send("MongoDB is Running");
});

app.use("/api/v1", postRoutes);

const startServer = async () => {
  try {
    await connect_db();

    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
