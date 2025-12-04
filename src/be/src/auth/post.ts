import express from "express";
import { hash } from "node:crypto";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/init";

export const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const algo = "sha512";
    const email = req.body.email;
    const password = hash(algo, req.body.password);
    const account = await prisma.account.findUnique({
      where: { email: email, password: { path: ["hash"], equals: password } },
      select: {
        id: true,
        unique_name: true,
      },
    });

    if (account) {
      const payload = {
        token: JSON.stringify(account),
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1h",
      });
      res.send({ token: token, account: account });
    } else {
      res.status(401).send({ msg: "failed" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).send({ msg: "failed" });
  }
});
