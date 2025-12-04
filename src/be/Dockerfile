FROM oven/bun:latest

WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bunx prisma generate

EXPOSE 8080

CMD ["bun", "run", "start"]