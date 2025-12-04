import { checkAuth } from "@/lib/init";
import express from "express";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    checkAuth(req);
    res.status(204).send();
  } catch (e) {
    res.status(401).send({ msg: "failed" });
  }
});
