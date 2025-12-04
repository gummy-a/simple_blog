import { checkAuth, prisma } from "@/lib/init";
import express from "express";

export const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    checkAuth(req);
    const account = await prisma.account.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (account) {
      res.send(account);
    } else {
      res.status(403).send({ msg: "failed" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).send({ msg: "failed" });
  }
});
