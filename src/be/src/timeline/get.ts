import { checkAuth, prisma } from "@/lib/init";
import express from "express";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = checkAuth(req);
    const id = JSON.parse(token.token).id;
    const posts = await prisma.post.findMany({
      where: {
        account_id: id,
      },
      include: {
        account: {
          select: {
            unique_name: true,
            screen_name: true,
          },
        },
      },
      take: 20,
      orderBy: { created_at: "desc" },
    });

    res.send(posts);
  } catch (e) {
    console.error(e);
    res.status(401).send({ msg: "failed" });
  }
});
