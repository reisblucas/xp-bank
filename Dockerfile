FROM node:16
WORKDIR /app
COPY . .
RUN npm ci
RUN npm i