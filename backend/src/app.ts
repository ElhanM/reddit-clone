import express from "express";
import cors from "cors";
import { auth, posts, user } from "./routes";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { errorHandler } from "middlewares";

const app = express();
require("dotenv").config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/user", user);

app.use(errorHandler);

export default app;
