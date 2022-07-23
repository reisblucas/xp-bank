FROM node:16
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm i
CMD ["pnpm", "dev"]