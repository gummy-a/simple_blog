FROM oven/bun:latest

WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]