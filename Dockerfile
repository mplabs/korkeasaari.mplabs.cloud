FROM node:22-alpine AS build

ARG VITE_LAST_VISIT=2025-07-12
ARG VITE_NEXT_VISIT=2026-07-11
ARG VITE_DESTINATION=Korkeasaari

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
