import express from "express";
import cors from "cors";
import auth from "routes/user";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();
require("dotenv").config();

// use cookie parser and pass secret key
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);

export default app;
