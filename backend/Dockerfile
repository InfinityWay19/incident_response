FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare --activate
RUN pnpm install --frozen-lockfile
COPY . .
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"
RUN pnpm exec prisma generate
RUN pnpm run build
FROM node:22-alpine AS runner
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare --activate
RUN pnpm install --frozen-lockfile -P
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"
RUN pnpm exec prisma generate
RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD [ "node", "dist/main.js" ]