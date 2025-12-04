import express from "express";
import helmet from "helmet";
import cors from "cors";
import { router as timelineRouter } from "./timeline/route";
import { router as postRouter } from "./post/route";
import { router as authRouter } from "./auth/route";
import { router as accountRouter } from "./account/route";
import { prisma } from "./lib/init";

const corsOptions = {
  origin: process.env.ALLOW_CORS_ORIGIN,
  optionsSuccessStatus: 204,
};

const main = () => {
  const app = express();
  const port = 8080;

  app.use(helmet());
  app.use(express.json());
  app.use(cors(corsOptions));

  app.use("/timeline", timelineRouter);
  app.use("/post", postRouter);
  app.use("/auth", authRouter);
  app.use("/account", accountRouter);

  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
};

try {
  main();
} catch (e) {
  console.error(e);
} finally {
  await prisma.$disconnect();
}
