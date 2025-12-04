import express from "express";
import { PrismaClient } from "@/../generated/prisma/client";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const checkAuth = (req: express.Request) => {
  const appCheckToken = req.header("Authorization");
  if (appCheckToken === undefined) {
    throw new Error("authorization header not found");
  }

  const token = appCheckToken.split(" ")[1];
  if (token === undefined) {
    throw new Error("authorization token");
  }

  const payload = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
  ) as JwtPayload;
  return payload;
};

export const prisma = new PrismaClient();
