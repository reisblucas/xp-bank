FROM node:16.3.0-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]