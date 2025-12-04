import { PrismaClient } from "../generated/prisma/client";
import { hash } from "node:crypto";

const prisma = new PrismaClient();

const password = "password";

const account = await prisma.account.create({
  data: {
    screen_name: "test_user",
    unique_name: "unique_test_user",
    email: "fake@mail.com",
    password: {
      hash: hash("sha512", password),
      hash_algo: "sha512",
    },
  },
});

await prisma.post.create({
  data: {
    body: "hoge",
    account_id: account.id,
  },
});
await prisma.post.create({
  data: {
    body: "foo",
    account_id: account.id,
    tag: ["tag1", "tag2", "tag3"],
  },
});
await prisma.post.create({
  data: {
    body: "baz",
    account_id: account.id,
  },
});

await prisma.$disconnect();
