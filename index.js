import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/router.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins for development purposes
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello Backend working properly!!!");
});

app.use("/api/portfolio", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
