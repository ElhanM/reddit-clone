import express from "express";

const app = express();

app.use(express.json());

app.use("/api/", (req, res) => {
  res.send("Hello World!");
});

export default app;
