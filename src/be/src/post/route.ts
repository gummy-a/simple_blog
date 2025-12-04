import { router as deleteRouter } from "./delete";
import { router as postRouter } from "./post";
import express from "express";

export const router = express.Router();

router.use("/", postRouter);
router.use("/", deleteRouter);
