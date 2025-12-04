import { checkAuth, prisma } from "@/lib/init";
import express from "express";

export const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const token = checkAuth(req);
    const account = JSON.parse(token.token);
    let tag = req.body.tag;

    const data = {
      body: req.body.body,
      tag: req.body.tag.split(","),
      account_id: account.id,
    };
    if (tag === undefined || tag === null || tag === "") {
      delete data.tag;
    }

    const post = await prisma.post.create({
      data: data,
    });
    if (post) {
      res.send({ msg: "ok" });
    } else {
      res.status(401).send({ msg: "failed" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).send({ msg: "failed" });
  }
});
