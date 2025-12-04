import { checkAuth, prisma } from "@/lib/init";
import express from "express";

export const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const token = checkAuth(req);
    const account = JSON.parse(token.token);
    const post = await prisma.post.delete({
      where: {
        id: req.params.id,
        account_id: account.id,
      },
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
