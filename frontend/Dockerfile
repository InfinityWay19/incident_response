FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm install
COPY . .
RUN pnpm run build
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]