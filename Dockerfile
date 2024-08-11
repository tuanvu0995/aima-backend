# syntax = docker/dockerfile:1

ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine3.18 as base
# NestJS app lives here
WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base as build
COPY --link package.json package-lock.json ./
RUN npm ci
COPY --link . .
RUN npm run build

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/dist /app/dist
COPY --link package.json package-lock.json ./
RUN npm ci --omit=dev

EXPOSE 3000
CMD [ "node", "./dist/src/main.js" ]
