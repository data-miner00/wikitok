FROM node:23-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.4-alpine-slim
COPY --from=build /app/dist /usr/share/nginx/html
