import express from "express";
import { register, login, logout } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/new", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;
