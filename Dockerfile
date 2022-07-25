FROM node:16.3.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY ./src/prisma ./prisma/
RUN npm install
COPY . .
CMD ["npm", "start"]

# FROM node:16.3.0-alpine
# WORKDIR /app
# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
# RUN pnpm install --frozen-lockfile --prod
# CMD ["pnpm", "dev"];