FROM node:20.17.0-alpine AS base

RUN npm i -g pnpm

ARG DATABASE_URL
ARG PORT
ARG CORS_ORIGINS

ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}
ENV CORS_ORIGINS=${CORS_ORIGINS}

COPY . /app
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 4000

CMD ["pnpm", "start"]