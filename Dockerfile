FROM node:16
WORKDIR /app
COPY . .
RUN pnpm i
CMD ["pnpm", "dev"]