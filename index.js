import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/router.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/portfolio", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
