import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import API_ROUTING from "./api";

dotenv.config();

const PORT = 8000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.use("/api", API_ROUTING);

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);
