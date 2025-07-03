import express from "express";

import authenticate from "../middlewares/auth.middleware.js";
import baseRouter from "./AllRoutes/Entry.routes.js";
import authRouter from "./auth.routes.js";
const RootRouter = express.Router();

RootRouter.use("/auth", authRouter);
RootRouter.use("/",authenticate(), baseRouter);

export default RootRouter;
