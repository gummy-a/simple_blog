import { router as getRouter } from "./get";
import { router as postRouter } from "./post";
import express from "express";

export const router = express.Router();

router.use("/", getRouter);
router.use("/", postRouter);
