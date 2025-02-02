import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import noteRouter from "./routes/noteRoutes.js";
import grammarRouter from "./routes/grammarRoutes.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: [
      "https://inquisitive-kangaroo-5884ee.netlify.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.get("/api", (req, res) => {
  res.send({ message: "Note Grammar Checker api" });
});
app.use("/api/notes", noteRouter);
app.use("/api/grammar", grammarRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
