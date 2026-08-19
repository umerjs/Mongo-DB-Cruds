import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect_db } from "./libs/mongodb.mjs";
import { postRoutes } from "./routes/index.mjs";

const app = express();
const port = process.env.PORT ||;

// Read allowed origin from env (dotenv already loaded above)
const allowedOrigin = process.env.VITE_FRONTEND_URL || "http://localhost:3003" || "https://mongo-db-cruds-frn.vercel.app/" ;

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigin,
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
