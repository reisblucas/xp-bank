# FROM node:16.3.0-alpine
# WORKDIR /app
# COPY . .
# RUN npm install
# CMD ["npm", "start"]

FROM node:16.3.0-alpine
WORKDIR /app
RUN npm install -g pnpm
RUN pnpm install
CMD ["pnpm", "dev"];