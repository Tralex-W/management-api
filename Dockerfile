FROM node:22.21-alpine AS base
WORKDIR /app

#Install dependencies
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev \
    && npm cache clean --force

#Non root user
USER node

#Application Code
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./drizzle ./drizzle
COPY --chown=node:node drizzle.config.js .

#Runtimes
EXPOSE 3000

CMD ["node", "./src/index.js"]
