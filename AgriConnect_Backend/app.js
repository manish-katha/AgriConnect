import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";

export const app = express();

config({ path: "./data/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(errorMiddleware);
