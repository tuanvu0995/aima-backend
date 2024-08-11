# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-alpine3.18 as base
LABEL fly_launch_runtime="NestJS"
# NestJS app lives here
WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base as build
# Install node modules
COPY --link package.json package-lock.json ./
RUN npm ci
# Copy application code
COPY --link . .
# Build application
RUN npm run build

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/dist /app/dist
COPY --link package.json package-lock.json ./
RUN npm ci --omit=dev

# Install curl
RUN apk add --no-cache curl

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "./dist/main.js" ]
