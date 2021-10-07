import express from "express";

const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);
