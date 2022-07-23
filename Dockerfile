# FROM node:16.3.0-alpine
# WORKDIR /app
# COPY . .
# RUN npm install
# CMD ["npm", "start"]

FROM node:16.3.0-alpine
WORKDIR /app
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN pnpm install
CMD ["pnpm", "dev"];