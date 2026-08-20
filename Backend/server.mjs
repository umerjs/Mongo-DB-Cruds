import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect_db } from "./libs/mongodb.mjs";
import { postRoutes } from "./routes/index.mjs";

const app = express();
const port = process.env.PORT;

app.use(express.json());

const allowedOrigins = [
  process.env.VITE_FRONTEND_URL,
  "http://localhost:5173",
  "https://mongo-db-cruds-frn.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: "*",
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
